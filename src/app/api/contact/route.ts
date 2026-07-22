import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const city = (body.city || "").trim();
  const service = (body.service || "").trim();
  const email = (body.email || "").trim();
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

  // Resend wiring comes later — log lead payload for now and succeed.
  // When RESEND_API_KEY is present, send email to service@grahamswash.com.
  const lead = {
    name,
    phone,
    email,
    city,
    service,
    preferredContact,
    message,
    receivedAt: new Date().toISOString(),
  };

  console.info("[contact-lead]", JSON.stringify(lead));

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Graham's Wash Website <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO || "service@grahamswash.com"],
          reply_to: email || undefined,
          subject: `New quote request: ${service} — ${name} (${city})`,
          text: [
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Email: ${email || "—"}`,
            `City: ${city}`,
            `Service: ${service}`,
            `Preferred contact: ${preferredContact}`,
            "",
            "Message:",
            message || "—",
          ].join("\n"),
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error("[contact-resend-error]", errText);
        // Still return success to user if we captured the lead server-side;
        // fail hard only when Resend is required via env flag.
        if (process.env.RESEND_REQUIRED === "true") {
          return NextResponse.json(
            { error: "Could not send message. Please call or text instead." },
            { status: 502 },
          );
        }
      }
    } catch (err) {
      console.error("[contact-resend-exception]", err);
      if (process.env.RESEND_REQUIRED === "true") {
        return NextResponse.json(
          { error: "Could not send message. Please call or text instead." },
          { status: 502 },
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}
