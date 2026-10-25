import Link from "next/link";

const linkClassName =
  "font-bold text-[#afd63f] underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const sectionClassName =
  "min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-8";

const headingClassName =
  "mb-4 text-xl font-black leading-snug text-white sm:text-2xl";

const email = "tormannschuleweinviertel@hotmail.com";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-background px-4 py-16 text-foreground sm:px-8 sm:py-24">
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center rounded-full border border-[#afd63f]/40 px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#afd63f] transition hover:bg-[#afd63f] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mb-14 sm:px-6"
        >
          ← Zur Startseite
        </Link>

        <header className="mb-10 min-w-0 sm:mb-16">
          <p className="font-draw text-2xl leading-snug text-[#afd63f] sm:text-4xl">
            Tormann & Bewegungsschule Weinviertel
          </p>

          <h1 className="mt-4 font-display text-[clamp(1.5rem,6vw,3rem)] font-black uppercase leading-tight tracking-tight text-white [overflow-wrap:anywhere] sm:text-6xl lg:text-7xl">
            Datenschutz
          </h1>
        </header>

        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-8">
          <aside className="min-w-0">
            <h2 className="font-display text-2xl uppercase leading-tight text-[#afd63f] sm:text-4xl">
              Deine Daten
            </h2>
          </aside>

          <div className="min-w-0 space-y-6 text-sm leading-7 text-white/90 [overflow-wrap:anywhere] sm:text-base sm:leading-8">
            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                1. Verantwortlicher
              </h2>

              <p>
                Verantwortlich für die Verarbeitung personenbezogener Daten auf
                dieser Website ist:
              </p>

              <p className="mt-4">
                Tormann & Bewegungsschule Weinviertel
              </p>

              <p className="mt-3">E-Mail:</p>

              <a
                href={`mailto:${email}`}
                className={`${linkClassName} mt-1 inline-block whitespace-nowrap text-[10px] min-[375px]:text-xs sm:text-sm`}
              >
                {email}
              </a>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                2. Erhebung und Verarbeitung personenbezogener Daten
              </h2>

              <p>
                Wir verarbeiten personenbezogene Daten nur, soweit dies zur
                Bereitstellung dieser Website sowie zur Bearbeitung von Anfragen
                erforderlich ist.
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                3. Kontaktformular
              </h2>

              <p>
                Wenn Sie uns über das Kontaktformular kontaktieren, werden die
                von Ihnen eingegebenen Daten zur Bearbeitung Ihrer Anfrage
                verarbeitet. Dazu gehören insbesondere Name, E-Mail-Adresse,
                Telefonnummer, Unternehmen und Nachricht.
              </p>

              <p className="mt-4">
                Die Verarbeitung erfolgt gemäß{" "}
                <a
                  href="https://dsgvo-gesetz.de/art-6-dsgvo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Art. 6 Abs. 1 lit. b DSGVO
                </a>{" "}
                zur Durchführung vorvertraglicher Maßnahmen bzw. auf Grundlage
                unseres berechtigten Interesses gemäß{" "}
                <a
                  href="https://dsgvo-gesetz.de/art-6-dsgvo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Art. 6 Abs. 1 lit. f DSGVO
                </a>
                .
              </p>

              <p className="mt-4">
                Die Daten werden nicht an Dritte weitergegeben und nur so lange
                gespeichert, wie dies zur Bearbeitung Ihrer Anfrage erforderlich
                ist.
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                4. Hosting und Server-Logfiles
              </h2>

              <p>
                Beim Besuch dieser Website werden automatisch technische
                Informationen durch den Hosting-Anbieter verarbeitet.
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[#afd63f] sm:pl-6">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Browsertyp und Browserversion</li>
                <li>Betriebssystem</li>
                <li>aufgerufene Seiten</li>
              </ul>

              <p className="mt-4">
                Diese Daten dienen der technischen Bereitstellung, Stabilität und
                Sicherheit der Website. Rechtsgrundlage ist{" "}
                <a
                  href="https://dsgvo-gesetz.de/art-6-dsgvo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Art. 6 Abs. 1 lit. f DSGVO
                </a>
                .
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                5. Ihre Rechte
              </h2>

              <p>
                Sie haben im Rahmen der gesetzlichen Bestimmungen das Recht auf
                Auskunft, Berichtigung, Löschung, Einschränkung der
                Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die
                Verarbeitung Ihrer personenbezogenen Daten.
              </p>

              <p className="mt-4">
                Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten
                gegen das Datenschutzrecht verstößt, können Sie sich bei der{" "}
                <a
                  href="https://www.dsb.gv.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  österreichischen Datenschutzbehörde
                </a>{" "}
                beschweren.
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                6. Kontakt
              </h2>

              <p>
                Bei Fragen zum Datenschutz wenden Sie sich bitte an:
              </p>

              <a
                href={`mailto:${email}`}
                className={`${linkClassName} mt-4 inline-block whitespace-nowrap text-[10px] min-[375px]:text-xs sm:text-sm`}
              >
                {email}
              </a>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}