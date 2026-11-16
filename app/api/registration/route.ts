import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getBirthDateError,
  getCampById,
} from "@/app/data/camps";

export const runtime = "nodejs";

const CONTACT_EMAIL = "tormannschuleweinviertel@hotmail.com";
const CONTACT_PHONE = "+43 664 391 93 74";

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(
    /[&<>"']/g,
    (character) => entities[character],
  );
}

function cleanSubject(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

function invalid(error: string) {
  return NextResponse.json(
    { success: false, error },
    { status: 400 },
  );
}

function getEmailAddress(recipient: unknown): string {
  if (typeof recipient === "string") {
    const match = /<([^>]+)>/.exec(recipient);

    return (match?.[1] ?? recipient)
      .trim()
      .toLowerCase();
  }

  if (
    recipient &&
    typeof recipient === "object" &&
    "address" in recipient &&
    typeof recipient.address === "string"
  ) {
    return recipient.address.trim().toLowerCase();
  }

  return "";
}

function emailLayout(title: string, content: string) {
  return `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>${escapeHtml(title)}</title>
      </head>

      <body
        style="
          margin:0;
          padding:24px 12px;
          background-color:#f3f4f1;
          font-family:Arial,Helvetica,sans-serif;
          color:#171717;
          -webkit-text-size-adjust:100%;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="border-collapse:collapse;"
        >
          <tr>
            <td align="center">
              <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    width:100%;
                    max-width:600px;
                    background-color:#ffffff;
                    border:1px solid #e2e5dd;
                    border-radius:12px;
                    overflow:hidden;
                  "
              >
                <tr>
                  <td
                    style="
                      padding:26px 24px;
                      background-color:#165201;
                      color:#ffffff;
                    "
                  >
                    <p
                      style="
                        margin:0 0 12px;
                        font-size:11px;
                        line-height:1.6;
                        letter-spacing:1px;
                        color:#ffffff;
                      "
                    >
                      UNION TORMANNSCHULE WEINVIERTEL
                    </p>

                    <h1
                      style="
                        margin:0;
                        font-size:26px;
                        line-height:1.3;
                        font-weight:700;
                        color:#ffffff;
                      "
                    >
                      ${escapeHtml(title)}
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:26px 24px;
                      font-size:15px;
                      line-height:1.7;
                      color:#171717;
                    "
                  >
                    ${content}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function campBlock(
  title: string,
  location: string,
  date: string,
) {
  return `
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        width:100%;
        background-color:#f2f7ea;
        border-left:4px solid #afd63f;
      "
    >
      <tr>
        <td style="padding:18px;">
          <p
            style="
              margin:0 0 8px;
              font-size:11px;
              line-height:1.5;
              font-weight:700;
              letter-spacing:1px;
              color:#165201;
            "
          >
            GEWÄHLTES CAMP
          </p>

          <h2
            style="
              margin:0 0 14px;
              font-size:21px;
              line-height:1.4;
              color:#171717;
            "
          >
            ${escapeHtml(title)}
          </h2>

          <p style="margin:0 0 6px;">
            <strong>Ort:</strong>
            ${escapeHtml(location)}
          </p>

          <p style="margin:0;">
            <strong>Termin:</strong>
            ${escapeHtml(date)}
          </p>
        </td>
      </tr>
    </table>
  `;
}

function sectionTitle(title: string) {
  return `
    <h2
      style="
        margin:28px 0 12px;
        font-size:18px;
        line-height:1.4;
        color:#165201;
      "
    >
      ${escapeHtml(title)}
    </h2>
  `;
}

function detailRow(
  label: string,
  value: string,
  href?: string,
) {
  const safeValue = escapeHtml(value);

  const displayedValue = href
    ? `
      <a
        href="${escapeHtml(href)}"
        style="
          color:#165201;
          text-decoration:underline;
          overflow-wrap:anywhere;
          word-break:break-word;
        "
      >
        ${safeValue}
      </a>
    `
    : safeValue;

  return `
    <tr>
      <td
        style="
          padding:12px 0;
          border-bottom:1px solid #e7e9e2;
          vertical-align:top;
          overflow-wrap:anywhere;
          word-break:break-word;
        "
      >
        <p
          style="
            margin:0 0 4px;
            font-size:12px;
            line-height:1.5;
            color:#666666;
          "
        >
          ${escapeHtml(label)}
        </p>

        <p
          style="
            margin:0;
            font-size:15px;
            line-height:1.6;
            color:#171717;
          "
        >
          ${displayedValue}
        </p>
      </td>
    </tr>
  `;
}

function detailsTable(rows: string) {
  return `
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        width:100%;
        table-layout:fixed;
        border-collapse:collapse;
      "
    >
      ${rows}
    </table>
  `;
}

function contactBlock() {
  return `
    <p style="margin:24px 0 8px;">
      Bei Fragen können Sie uns gerne kontaktieren:
    </p>

    <p
      style="
        margin:0 0 24px;
        overflow-wrap:anywhere;
        word-break:break-word;
      "
    >
      E-Mail:
      <a
        href="mailto:${CONTACT_EMAIL}"
        style="color:#165201;"
      >
        ${CONTACT_EMAIL}
      </a>
      <br />

      Telefon:
      <a
        href="tel:+436643919374"
        style="color:#165201;"
      >
        ${CONTACT_PHONE}
      </a>
    </p>
  `;
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;

  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return invalid("Ungültige Formulardaten.");
    }

    data = body as Record<string, unknown>;
  } catch {
    return invalid("Ungültige Formulardaten.");
  }

  const readText = (key: string): string => {
    const value = data[key];

    return typeof value === "string"
      ? value.trim()
      : "";
  };

  const camp = getCampById(readText("campId"));

  if (!camp || !camp.registrationOpen) {
    return invalid(
      "Bitte wählen Sie ein aktuell verfügbares Camp aus.",
    );
  }

  const parentFirstName = readText("parentFirstName");
  const parentLastName = readText("parentLastName");
  const parentEmail = readText("parentEmail");
  const parentPhone = readText("parentPhone");
  const childFirstName = readText("childFirstName");
  const childLastName = readText("childLastName");
  const birthDate = readText("birthDate");
  const emergencyPhone = readText("emergencyPhone");
  const notes = readText("notes");

  const requiredValues = [
    parentFirstName,
    parentLastName,
    parentEmail,
    parentPhone,
    childFirstName,
    childLastName,
    birthDate,
    emergencyPhone,
  ];

  if (requiredValues.some((value) => !value)) {
    return invalid(
      "Bitte füllen Sie alle Pflichtfelder aus.",
    );
  }

  if (
    requiredValues.some((value) => value.length > 200) ||
    notes.length > 5000
  ) {
    return invalid(
      "Die eingegebenen Daten sind zu lang.",
    );
  }

  if (
    [
      parentFirstName,
      parentLastName,
      childFirstName,
      childLastName,
    ].some((value) => value.length < 2)
  ) {
    return invalid(
      "Bitte geben Sie vollständige Vor- und Nachnamen ein.",
    );
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail) ||
    /[\r\n]/.test(parentEmail)
  ) {
    return invalid(
      "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    );
  }

  if (
    ![parentPhone, emergencyPhone].every((value) =>
      /^[0-9+\s()-]{6,}$/.test(value),
    )
  ) {
    return invalid(
      "Bitte geben Sie gültige Telefon- und Notfallnummern ein.",
    );
  }

  const birthDateError = getBirthDateError(
    birthDate,
    camp.startDate,
  );

  if (birthDateError) {
    return invalid(birthDateError);
  }

  if (data.agb !== true) {
    return invalid("Bitte akzeptieren Sie die AGB.");
  }

  try {
    const {
      EMAIL_USER,
      EMAIL_PASS,
      MAIL_TO,
    } = process.env;

    if (!EMAIL_USER || !EMAIL_PASS || !MAIL_TO) {
      throw new Error("Missing email configuration");
    }

    const port = Number(process.env.SMTP_PORT) || 465;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const childName =
      `${childFirstName} ${childLastName}`;

    const parentName =
      `${parentFirstName} ${parentLastName}`;

    const formattedBirthDate = birthDate
      .split("-")
      .reverse()
      .join(".");

    const phoneHref = (phone: string) =>
      `tel:${phone.replace(/[^\d+]/g, "")}`;

    const ownerHtml = emailLayout(
      "Neue Camp-Anmeldung",
      `
        ${campBlock(
          camp.title,
          camp.location,
          camp.date,
        )}

        ${sectionTitle(
          "Eltern / Erziehungsberechtigte",
        )}

        ${detailsTable(
          [
            detailRow("Name", parentName),
            detailRow(
              "E-Mail",
              parentEmail,
              `mailto:${parentEmail}`,
            ),
            detailRow(
              "Telefon",
              parentPhone,
              phoneHref(parentPhone),
            ),
          ].join(""),
        )}

        ${sectionTitle("Kind / Teilnehmer")}

        ${detailsTable(
          [
            detailRow("Name", childName),
            detailRow(
              "Geburtsdatum",
              formattedBirthDate,
            ),
            detailRow(
              "Notfallnummer",
              emergencyPhone,
              phoneHref(emergencyPhone),
            ),
          ].join(""),
        )}

        ${sectionTitle("Anmerkungen")}

        <div
          style="
            padding:16px;
            background-color:#f6f7f4;
            border-radius:8px;
            overflow-wrap:anywhere;
            word-break:break-word;
          "
        >
          <p style="margin:0;line-height:1.7;">
            ${escapeHtml(
              notes || "Keine Anmerkungen",
            ).replace(/\r?\n/g, "<br />")}
          </p>
        </div>

        <p
          style="
            margin:24px 0 0;
            font-size:12px;
            line-height:1.6;
            color:#666666;
          "
        >
          AGB akzeptiert: Ja
        </p>
      `,
    );

    // Заявка Францу.
    const ownerResult = await transporter.sendMail({
      from: `"Tormannschule Anmeldung" <${EMAIL_USER}>`,
      to: MAIL_TO,

      // Тестовая скрытая копия для Anna.
      bcc: "ammelymm@gmail.com",

      replyTo: parentEmail,

      subject: cleanSubject(
        `Neue Camp-Anmeldung: ${camp.location} – ${camp.date} – ${childName}`,
      ),

      text: [
        "Neue Camp-Anmeldung",
        "",
        `Camp: ${camp.title}`,
        `Termin: ${camp.date}`,
        `Ort: ${camp.location}`,
        "",
        "Eltern / Erziehungsberechtigte",
        `Name: ${parentName}`,
        `E-Mail: ${parentEmail}`,
        `Telefon: ${parentPhone}`,
        "",
        "Kind / Teilnehmer",
        `Name: ${childName}`,
        `Geburtsdatum: ${formattedBirthDate}`,
        `Notfallnummer: ${emergencyPhone}`,
        "",
        "Anmerkungen",
        notes || "Keine Anmerkungen",
        "",
        "AGB akzeptiert: Ja",
      ].join("\n"),

      html: ownerHtml,
    });

    const ownerAddresses = MAIL_TO
      .split(",")
      .map(getEmailAddress)
      .filter(Boolean);

    const acceptedAddresses = ownerResult.accepted.map(
      getEmailAddress,
    );

    if (
      !ownerAddresses.some((address) =>
        acceptedAddresses.includes(address),
      )
    ) {
      throw new Error(
        "Registration email was not accepted for the owner",
      );
    }

    let confirmationSent = false;

    // Подтверждение родителю.
    try {
      const confirmationHtml = emailLayout(
        "Vielen Dank für Ihre Anmeldung!",
        `
          <p style="margin:0 0 16px;">
            Hallo ${escapeHtml(parentFirstName)}!
          </p>

          <p style="margin:0 0 24px;">
            Vielen Dank für die Anmeldung!
            Wir haben Ihre Anmeldung zum Camp der
            UNION Tormannschule Weinviertel erhalten.
          </p>

          ${campBlock(
            camp.title,
            camp.location,
            camp.date,
          )}

          ${sectionTitle("Teilnehmer")}

          <p style="margin:0;">
            ${escapeHtml(childName)}
          </p>

          <p style="margin:24px 0 16px;">
            Wir freuen uns auf gemeinsame Trainingstage!
          </p>

          ${contactBlock()}

          <p style="margin:0;">
            Mit sportlichen Grüßen<br />
            <strong>Franz Machaczek</strong><br />
            UNION Tormannschule Weinviertel
          </p>
        `,
      );

      const confirmationResult =
        await transporter.sendMail({
          from: `"UNION Tormannschule Weinviertel" <${EMAIL_USER}>`,
          to: parentEmail,
          replyTo: CONTACT_EMAIL,

          subject: cleanSubject(
            `Anmeldebestätigung – ${camp.title}, ${camp.location}`,
          ),

          text: [
            `Hallo ${parentFirstName}!`,
            "",
            "Vielen Dank für die Anmeldung! Wir haben Ihre Anmeldung zum Camp der UNION Tormannschule Weinviertel erhalten.",
            "",
            `Teilnehmer: ${childName}`,
            `Camp: ${camp.title}`,
            `Ort: ${camp.location}`,
            `Termin: ${camp.date}`,
            "",
            "Wir freuen uns auf gemeinsame Trainingstage!",
            "",
            "Bei Fragen können Sie uns gerne kontaktieren:",
            `E-Mail: ${CONTACT_EMAIL}`,
            `Telefon: ${CONTACT_PHONE}`,
            "",
            "Mit sportlichen Grüßen",
            "Franz Machaczek",
            "UNION Tormannschule Weinviertel",
          ].join("\n"),

          html: confirmationHtml,
        });

      confirmationSent =
        confirmationResult.accepted.some(
          (recipient: unknown) =>
            getEmailAddress(recipient) ===
            parentEmail.toLowerCase(),
        );

      if (!confirmationSent) {
        console.error(
          "Camp confirmation email was not accepted",
        );
      }
    } catch (error) {
      // Заявка уже отправлена Францу:
      // не предлагаем повторную регистрацию.
      console.error(
        "Camp confirmation email error:",
        error,
      );
    }

    return NextResponse.json({
      success: true,
      confirmationSent,
    });
  } catch (error) {
    console.error(
      "Camp registration email error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Ihre Anmeldung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter tormannschuleweinviertel@hotmail.com oder +43 664 391 93 74.",
      },
      { status: 500 },
    );
  }
}