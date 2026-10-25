import Link from "next/link";

const email = "tormannschuleweinviertel@hotmail.com";

const linkClassName =
  "font-bold text-[#afd63f] underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const sectionClassName =
  "min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-8";

const headingClassName =
  "mb-4 text-xl font-black leading-snug text-white sm:text-2xl";

export default function ImpressumPage() {
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
            Impressum
          </h1>
        </header>

        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-8">
          <aside className="min-w-0">
            <h2 className="font-display text-2xl uppercase leading-tight text-[#afd63f] [overflow-wrap:anywhere] sm:text-4xl">
              Rechtliches
            </h2>
          </aside>

          <div className="min-w-0 space-y-6 text-sm leading-7 text-white/90 [overflow-wrap:anywhere] sm:text-base sm:leading-8">
            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                Angaben gemäß § 5 ECG
              </h2>

              <p>
                <strong className="text-white">
                  Union Tormann- und Bewegungsschule Weinviertel
                </strong>
                <br />
                ZVR-Zahl:{" "}
                <span className="text-[#afd63f]">1542945537</span>
              </p>

              <p className="mt-4">
                Mitglied der Sportunion Niederösterreich.
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                Verantwortlich für den Inhalt
              </h2>

              <p>
                Union Tormann- und Bewegungsschule Weinviertel
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>Kontakt</h2>

              <div>
                <p className="font-medium text-white">Telefon:</p>

                <a
                  href="tel:+436643919374"
                  className={`${linkClassName} mt-1 inline-block`}
                >
                  +43 664 391 93 74
                </a>
              </div>

              <div className="mt-4 min-w-0">
                <p className="font-medium text-white">E-Mail:</p>

                <a
                  href={`mailto:${email}`}
                  className={`${linkClassName} mt-1 inline-block whitespace-nowrap text-[10px] min-[375px]:text-xs sm:text-sm`}
                >
                  {email}
                </a>
              </div>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                Haftung für Inhalte
              </h2>

              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
                erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
                Inhalte wird jedoch keine Gewähr übernommen.
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                Haftung für Links
              </h2>

              <p>
                Diese Website kann Links zu externen Websites Dritter enthalten.
                Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                verantwortlich.
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>Urheberrecht</h2>

              <p>
                Die auf dieser Website veröffentlichten Inhalte, Bilder und Texte
                unterliegen dem Urheberrecht. Eine Verwendung oder
                Vervielfältigung ist nur mit ausdrücklicher Zustimmung des
                jeweiligen Rechteinhabers gestattet.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}