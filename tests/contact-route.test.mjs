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

const ENV_KEYS = ["RESEND_API_KEY", "RESEND_REQUIRED", "RESEND_FROM", "CONTACT_TO", "CONTACT_BCC"];
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

test("confirmation failure is an error and not ok", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.RESEND_REQUIRED = "true";
  let calls = 0;
  stubFetch(async () => {
    calls += 1;
    if (calls === 1) return new Response(JSON.stringify({ id: "email_lead" }), { status: 200 });
    return new Response("confirmation failed", { status: 500 });
  });

  const res = await POST(leadRequest());
  const body = await res.json();

  assert.equal(calls, 2);
  assert.equal(res.ok, false);
  assert.equal(res.status, 502);
  assert.notEqual(body.ok, true);
  assert.match(body.error, /do not need to submit again/);
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
