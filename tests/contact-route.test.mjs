import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";

// Never calls the real Resend API. fetch is stubbed, or the key is absent
// so sendResendEmail returns before fetch.
mock.module("botid/server", {
  namedExports: {
    checkBotId: async () => ({ isBot: false, isHuman: true, isVerifiedBot: false, bypassed: true }),
  },
});

const { POST } = await import("../src/app/api/contact/route.ts");

const ENV_KEYS = ["RESEND_API_KEY", "RESEND_REQUIRED", "RESEND_FROM", "CONTACT_TO", "CONTACT_BCC", "RESEND_TIMEOUT_MS"];
const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

afterEach(() => {
  mock.restoreAll();
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

function leadRequest(overrides = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      phone: "9165550100",
      email: "test@example.com",
      city: "Rocklin",
      service: "pressure-washing",
      preferredContact: "text",
      message: "Driveway stains",
      ...overrides,
    }),
  });
}

function stubFetch(impl) {
  return mock.method(globalThis, "fetch", async (url, init) => {
    assert.match(String(url), /^https:\/\/api\.resend\.com\/emails$/);
    return impl(url, init);
  });
}

test("failed send is an error and not ok", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  delete process.env.RESEND_REQUIRED;
  const fetchMock = stubFetch(async () => new Response("upstream down", { status: 500 }));

  const res = await POST(leadRequest());
  const body = await res.json();

  assert.equal(res.ok, false);
  assert.equal(res.status, 502);
  assert.notEqual(body.ok, true);
  assert.equal(body.error, "Could not send message. Please try again in a moment.");
  assert.equal(fetchMock.mock.calls.length, 1);
});

test("failed send is an error when RESEND_REQUIRED is false", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.RESEND_REQUIRED = "false";
  stubFetch(async () => new Response("nope", { status: 422 }));

  const res = await POST(leadRequest());
  const body = await res.json();

  assert.equal(res.ok, false);
  assert.equal(res.status, 502);
  assert.notEqual(body.ok, true);
  assert.equal(typeof body.error, "string");
});

test("missing API key is an error and not ok", async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_REQUIRED;
  const fetchMock = stubFetch(async () => {
    throw new Error("fetch must not run when RESEND_API_KEY is missing");
  });

  const res = await POST(leadRequest());
  const body = await res.json();

  assert.equal(res.ok, false);
  assert.equal(res.status, 502);
  assert.notEqual(body.ok, true);
  assert.equal(body.error, "Could not send message. Please try again in a moment.");
  assert.equal(fetchMock.mock.calls.length, 0);
});

test("network error is an error and not ok", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  delete process.env.RESEND_REQUIRED;
  stubFetch(async () => {
    throw new Error("network down");
  });

  const res = await POST(leadRequest());
  const body = await res.json();

  assert.equal(res.ok, false);
  assert.equal(res.status, 502);
  assert.notEqual(body.ok, true);
  assert.equal(body.error, "Could not send message. Please try again in a moment.");
});

test("successful send is ok", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  delete process.env.RESEND_REQUIRED;
  const fetchMock = stubFetch(async () => new Response(JSON.stringify({ id: "email_test" }), { status: 200 }));

  const res = await POST(leadRequest());
  const body = await res.json();

  assert.equal(res.ok, true);
  assert.equal(res.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.error, undefined);
  assert.equal(fetchMock.mock.calls.length, 2);
});

test("confirmation failure is still ok with a soft note", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  delete process.env.RESEND_REQUIRED;
  let calls = 0;
  stubFetch(async () => {
    calls += 1;
    if (calls === 1) return new Response(JSON.stringify({ id: "email_lead" }), { status: 200 });
    return new Response("confirmation failed", { status: 500 });
  });

  const res = await POST(leadRequest());
  const body = await res.json();

  assert.equal(calls, 2);
  assert.equal(res.ok, true);
  assert.equal(res.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.error, undefined);
  assert.match(body.notice, /confirmation email could not be sent/);
  assert.match(body.notice, /do not need to submit again/);
});

test("honeypot is a quiet success with no mail and no form-field log", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  const secrets = ["Secret Name", "secret@example.com", "9165550199", "secret message body", "https://spam.example"];
  const logs = [];
  mock.method(console, "info", (...args) => {
    logs.push(args.map((part) => String(part)).join(" "));
  });
  const fetchMock = stubFetch(async () => {
    throw new Error("fetch must not run for a honeypot");
  });

  const res = await POST(
    leadRequest({
      website: "https://spam.example",
      name: "Secret Name",
      email: "secret@example.com",
      phone: "9165550199",
      message: "secret message body",
    }),
  );
  const body = await res.json();
  const logged = logs.join("\n");

  assert.equal(res.status, 200);
  assert.equal(body.ok, true);
  assert.equal(fetchMock.mock.calls.length, 0);
  assert.match(logged, /\[contact-honeypot\]/);
  for (const secret of secrets) {
    assert.equal(logged.includes(secret), false);
  }
});

test("a hung Resend call fails as a send failure without hanging", { timeout: 2000 }, async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.RESEND_TIMEOUT_MS = "40";
  stubFetch((_url, init) => {
    const signal = init?.signal;
    return new Promise((_resolve, reject) => {
      if (!signal) {
        reject(new Error("expected an abort signal"));
        return;
      }
      const fail = () => reject(signal.reason ?? new Error("aborted"));
      if (signal.aborted) {
        fail();
        return;
      }
      signal.addEventListener("abort", fail, { once: true });
    });
  });

  const started = Date.now();
  const res = await POST(leadRequest());
  const body = await res.json();

  assert.ok(Date.now() - started < 1500);
  assert.equal(res.ok, false);
  assert.equal(res.status, 502);
  assert.notEqual(body.ok, true);
  assert.equal(body.error, "Could not send message. Please try again in a moment.");
});

test("successful send without a visitor email is ok", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  const fetchMock = stubFetch(async () => new Response(JSON.stringify({ id: "email_lead" }), { status: 200 }));

  const res = await POST(leadRequest({ email: "" }));
  const body = await res.json();

  assert.equal(res.ok, true);
  assert.equal(body.ok, true);
  assert.equal(fetchMock.mock.calls.length, 1);
});
