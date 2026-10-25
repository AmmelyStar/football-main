import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function escapeHtml(value: string): string {
  const characters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (character) => characters[character]);
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;

  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { ok: false, message: "Ungültige Formulardaten." },
        { status: 400 },
      );
    }

    data = body;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültige Formulardaten." },
      { status: 400 },
    );
  }

  const getText = (key: string): string => {
    const value = data[key];
    return typeof value === "string" ? value.trim() : "";
  };

  const name = getText("name");
  const company = getText("company");
  const email = getText("email");
  const phone = getText("phone");
  const message = getText("message");

  if (
    name.length < 2 ||
    name.length > 200 ||
    company.length > 200 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(email) ||
    (phone && !/^[0-9+\s()-]{6,100}$/.test(phone)) ||
    message.length < 10 ||
    message.length > 10000 ||
    data.privacy !== true
  ) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Bitte überprüfen Sie Ihre Eingaben und akzeptieren Sie die Datenschutzerklärung.",
      },
      { status: 400 },
    );
  }

  try {
    const { EMAIL_USER, EMAIL_PASS, MAIL_TO } = process.env;

    if (!EMAIL_USER || !EMAIL_PASS || !MAIL_TO) {
      throw new Error("Missing email configuration");
    }

    const port = Number(process.env.SMTP_PORT) || 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Tormannschule Weinviertel – Kontakt" <${EMAIL_USER}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: "Neue Kontaktanfrage – Tormannschule Weinviertel",

      text: [
        "Neue Nachricht über das Kontaktformular",
        "",
        `Name: ${name}`,
        `Unternehmen: ${company || "Nicht angegeben"}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone || "Nicht angegeben"}`,
        "",
        "Nachricht:",
        message,
        "",
        "Datenschutzerklärung akzeptiert: Ja",
      ].join("\n"),

      html: `
        <h2>Neue Nachricht über das Kontaktformular</h2>

        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Unternehmen:</strong> ${escapeHtml(
          company || "Nicht angegeben",
        )}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(
          phone || "Nicht angegeben",
        )}</p>

        <h3>Nachricht</h3>
        <p>${escapeHtml(message).replace(/\r?\n/g, "<br />")}</p>

        <hr />
        <p>Datenschutzerklärung akzeptiert: Ja</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "Contact email error:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return NextResponse.json(
      {
        ok: false,
        message: "Fehler beim Senden. Bitte versuchen Sie es später erneut.",
      },
      { status: 500 },
    );
  }
}