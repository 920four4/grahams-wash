import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";
import {
  customerConfirmationEmail,
  grahamLeadEmail,
  opsInbox,
  parseRecipients,
  resolveOpsRecipients,
  sendResendEmail,
} from "@/lib/email";
import { site } from "@/lib/site";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  service?: string;
  preferredContact?: string;
  message?: string;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json(
      { error: "Could not send message. Please try again in a moment." },
      { status: 403 },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const city = (body.city || "").trim();
  const service = (body.service || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const preferredContact = (body.preferredContact || "text").trim();
  const message = (body.message || "").trim();

  if (!name || !phone || !city || !service) {
    return NextResponse.json(
      { error: "Please fill in name, phone, city, and service." },
      { status: 400 },
    );
  }

  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (preferredContact === "email" && !email) {
    return NextResponse.json(
      { error: "Please add an email address so Graham can reply by email." },
      { status: 400 },
    );
  }

  const lead = {
    name,
    phone,
    email,
    city,
    service,
    preferredContact,
    message,
  };

  console.info("[contact-lead]", JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }));

  const requireResend = process.env.RESEND_REQUIRED === "true";
  const grahamTo = resolveOpsRecipients();
  const bcc = parseRecipients(process.env.CONTACT_BCC, site.opsBcc);
  const grahamMail = grahamLeadEmail(lead);
  const grahamResult = await sendResendEmail({
    to: grahamTo,
    bcc,
    subject: grahamMail.subject,
    text: grahamMail.text,
    html: grahamMail.html,
    replyTo: email || undefined,
  });

  if (!grahamResult.ok) {
    console.error("[contact-resend-graham]", grahamResult.error);
    if (requireResend) {
      return NextResponse.json(
        { error: "Could not send message. Please try again in a moment." },
        { status: 502 },
      );
    }
  }

  if (email) {
    const customerMail = customerConfirmationEmail(lead);
    const customerResult = await sendResendEmail({
      to: [email],
      bcc,
      subject: customerMail.subject,
      text: customerMail.text,
      html: customerMail.html,
      replyTo: opsInbox(),
    });
    if (!customerResult.ok) {
      console.error("[contact-resend-customer]", customerResult.error);
    }
  }

  return NextResponse.json({ ok: true });
}
