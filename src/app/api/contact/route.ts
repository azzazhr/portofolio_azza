import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "azzahraattaqina59@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured (missing RESEND_API_KEY)." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const emailSubject = subject
      ? `[Portfolio] ${subject}`
      : `[Portfolio] New message from ${name}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin: 0 0 16px;">New message from portfolio contact form</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; background: #f1f5f9; border: 1px solid #e2e8f0;">Name</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; background: #f1f5f9; border: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; background: #f1f5f9; border: 1px solid #e2e8f0;">Subject</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(subject || "-")}</td>
            </tr>
          </table>
          <h3 style="margin: 24px 0 8px;">Message</h3>
          <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
