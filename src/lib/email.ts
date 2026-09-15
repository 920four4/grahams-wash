import { site } from "@/lib/site";

export const SERVICE_LABELS: Record<string, string> = {
  "pressure-washing": "Hot Pressure Washing",
  "solar-panel-cleaning": "Solar Panel Cleaning",
  "trash-bin-cleaning": "Garbage Bin Cleaning",
  "permanent-christmas-lights": "Permanent Christmas Lights",
  multiple: "Multiple services / not sure",
};

export const CONTACT_METHOD_LABELS: Record<string, string> = {
  text: "Text",
  call: "Call",
  email: "Email",
};

export type Lead = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  preferredContact: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function serviceLabel(slug: string) {
  return SERVICE_LABELS[slug] || slug;
}

function contactMethodLabel(method: string) {
  return CONTACT_METHOD_LABELS[method] || method;
}

function wrapHtml(inner: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111111;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <p style="margin:0 0 28px;font-size:15px;font-weight:600;color:#0177ff;">Graham's Wash</p>
      ${inner}
      <p style="margin:36px 0 0;padding-top:20px;border-top:1px solid #eeeeee;font-size:13px;line-height:1.6;color:#666666;">
        Graham's Wash · Rocklin, CA<br/>
        <a href="${site.phoneHref}" style="color:#111111;text-decoration:none;">${site.phone}</a>
        ·
        <a href="mailto:${site.adminEmail}" style="color:#111111;text-decoration:none;">${site.adminEmail}</a>
      </p>
    </div>
  </body>
</html>`;
}

export function grahamLeadEmail(lead: Lead) {
  const service = serviceLabel(lead.service);
  const method = contactMethodLabel(lead.preferredContact);
  const subject = `New quote request: ${service} — ${lead.name} (${lead.city})`;
  const rows = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "—"],
    ["City", lead.city],
    ["Service", service],
    ["Preferred contact", method],
  ];

  const text = [
    "New quote request from the website.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    lead.message || "—",
  ].join("\n");

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;width:150px;font-size:14px;color:#666666;">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:14px;color:#111111;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const html = wrapHtml(
    `<p style="margin:0 0 8px;font-size:20px;line-height:1.3;font-weight:600;">New quote request</p>
     <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#444444;">Reply by ${escapeHtml(method.toLowerCase())}.</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${htmlRows}</table>
     <p style="margin:20px 0 4px;font-size:13px;color:#666666;">Message</p>
     <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.message || "—")}</p>`,
  );

  return { subject, text, html };
}

export function customerConfirmationEmail(lead: Lead) {
  const service = serviceLabel(lead.service);
  const method = contactMethodLabel(lead.preferredContact);
  const subject = `We received your quote request`;
  const text = [
    `Hi ${lead.name},`,
    "",
    `Thanks for reaching out to Graham's Wash. We received your request for ${service} in ${lead.city}.`,
    "",
    `Graham will get back to you by ${method.toLowerCase()}.`,
    lead.message ? `\nYour note:\n${lead.message}\n` : "",
    "If you need to add anything, just reply to this email.",
    "",
    "Graham's Wash",
    "Rocklin, CA",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const html = wrapHtml(
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${escapeHtml(lead.name)},</p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thanks for reaching out. We received your request for ${escapeHtml(service)} in ${escapeHtml(lead.city)}.</p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Graham will get back to you by ${escapeHtml(method.toLowerCase())}.</p>
     ${
       lead.message
         ? `<p style="margin:0 0 4px;font-size:13px;color:#666666;">Your note</p><p style="margin:0 0 16px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>`
         : ""
     }
     <p style="margin:0;font-size:15px;line-height:1.6;">If you need to add anything, just reply to this email.</p>`,
  );

  return { subject, text, html };
}

/** Graham's inboxes — do not deliver here until he confirms. */
const HELD_INBOXES = new Set(
  [site.email, site.adminEmail].map((addr) => addr.toLowerCase()),
);

function isHeldInbox(address: string) {
  return HELD_INBOXES.has(address.trim().toLowerCase());
}

export function opsInbox() {
  return site.opsBcc;
}

export function resolveOpsRecipients() {
  const requested = parseRecipients(process.env.CONTACT_TO, site.opsBcc).filter(
    (addr) => !isHeldInbox(addr),
  );
  return requested.length ? requested : [site.opsBcc];
}

export async function sendResendEmail(payload: {
  to: string[];
  bcc?: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false as const, skipped: true as const, error: "RESEND_API_KEY is not set" };
  }

  const from = process.env.RESEND_FROM || `Graham's Wash <${site.adminEmail}>`;
  const to = payload.to.filter((addr) => !isHeldInbox(addr));
  if (!to.length) {
    to.push(site.opsBcc);
  }
  const toSet = new Set(to.map((addr) => addr.toLowerCase()));
  const bcc = (payload.bcc || []).filter(
    (addr) => !isHeldInbox(addr) && !toSet.has(addr.toLowerCase()),
  );
  const replyTo =
    payload.replyTo && !isHeldInbox(payload.replyTo) ? payload.replyTo : site.opsBcc;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      bcc: bcc.length ? bcc : undefined,
      reply_to: replyTo,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return { ok: false as const, skipped: false as const, error };
  }

  return { ok: true as const, skipped: false as const };
}

export function parseRecipients(value: string | undefined, fallback: string) {
  return (value || fallback)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
