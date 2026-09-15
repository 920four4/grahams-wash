import { site } from "@/lib/site";

export const SERVICE_LABELS: Record<string, string> = {
  "pressure-washing": "Hot Pressure Washing",
  "solar-panel-cleaning": "Solar Panel Cleaning",
  "trash-bin-cleaning": "Garbage Bin Cleaning",
  "permanent-christmas-lights": "Permanent Christmas Lights",
  birdproofing: "Birdproofing roof / solar panels",
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
  if (SERVICE_LABELS[slug]) return SERVICE_LABELS[slug];
  const match = Object.values(SERVICE_LABELS).find(
    (label) => label.toLowerCase() === slug.toLowerCase(),
  );
  return match || slug;
}

function contactMethodLabel(method: string) {
  return CONTACT_METHOD_LABELS[method] || method;
}

const logoUrl = `${site.url}/apple-touch-icon.png`;

function wrapHtml(inner: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:32px 24px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
            <tr>
              <td style="padding:0 0 28px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;padding:0 10px 0 0;">
                      <a href="${site.url}" style="text-decoration:none;">
                        <img src="${logoUrl}" width="40" height="40" alt="Graham's Wash" border="0" style="display:block;width:40px;height:40px;border:0;border-radius:8px;" />
                      </a>
                    </td>
                    <td style="vertical-align:middle;">
                      <a href="${site.url}" style="font-size:16px;font-weight:700;color:#0177ff;text-decoration:none;">Graham's Wash</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>${inner}</td>
            </tr>
            <tr>
              <td style="padding:36px 0 0 0;border-top:1px solid #eeeeee;font-size:13px;line-height:1.6;color:#666666;">
                Graham's Wash · Rocklin, CA<br/>
                <a href="${site.url}/contact" style="color:#111111;text-decoration:none;">${site.url.replace("https://", "")}/contact</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
    `<p style="margin:0 0 8px;font-size:20px;line-height:1.3;font-weight:600;">New quote request: ${escapeHtml(service)}</p>
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
  const subject = `We received your quote request for ${service}`;
  const text = [
    `Hi ${lead.name},`,
    "",
    `Thanks for reaching out to Graham's Wash.`,
    "",
    `Service: ${service}`,
    `City: ${lead.city}`,
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

  const noteHtml = lead.message
    ? `<p style="margin:0 0 4px;font-size:13px;color:#666666;">Your note</p><p style="margin:0 0 16px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>`
    : "";

  const html = wrapHtml(
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${escapeHtml(lead.name)},</p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thanks for reaching out. We received your quote request.</p>
     <p style="margin:0 0 4px;font-size:13px;color:#666666;">Service</p>
     <p style="margin:0 0 16px;font-size:18px;line-height:1.4;font-weight:600;">${escapeHtml(service)}</p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">City: ${escapeHtml(lead.city)}</p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Graham will get back to you by ${escapeHtml(method.toLowerCase())}.</p>
     ${noteHtml}
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
