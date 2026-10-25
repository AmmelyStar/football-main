import Link from "next/link";

const email = "tormannschuleweinviertel@hotmail.com";

const navigation = [
  { name: "Camp Anmeldung", href: "/camp-anmeldung" },
  { name: "Datenschutz", href: "/datenschutz" },
  { name: "Impressum", href: "/impressum" },
  { name: "AGB", href: "/agb" },
];

const linkClassName =
  "rounded-sm text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Footer() {
  return (
    <footer className="bg-[#165201] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-10 border-t border-black/60 pt-10 md:flex-row md:items-start md:justify-between">
          {/* Информация */}
          <div className="min-w-0">
            <Link
              href="/"
              className={`${linkClassName} text-lg font-semibold`}
            >
              Tormann & Bewegungsschule Weinviertel
            </Link>

            <p className="mt-4 max-w-md text-sm/6">
              Professionelles Tormanntraining, Bewegung und individuelle
              Förderung im Weinviertel.
            </p>

            <Link
              href="/camp-anmeldung"
              className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors duration-300 hover:bg-white hover:text-[#165201] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Jetzt zum Camp anmelden
            </Link>
          </div>

          {/* Контакты */}
          <div className="min-w-0 space-y-3 text-sm/6">
            <p className="font-semibold">Kontakt</p>

            <p>
              Union Tormann- und Bewegungsschule Weinviertel
              <br />
              Österreich
            </p>

            <div className="min-w-0">
              <p className="font-medium">E-Mail:</p>

              <a
                href={`mailto:${email}`}
                className={`${linkClassName} mt-1 inline-block whitespace-nowrap text-[11px]/6 min-[375px]:text-xs sm:text-sm`}
              >
                {email}
              </a>
            </div>

            <p>
              <span className="font-medium">Telefon:</span>{" "}
              <a
                href="tel:+436643919374"
                className={`${linkClassName} inline-block`}
              >
                +43 664 391 93 74
              </a>
            </p>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="mt-10 flex flex-col gap-4 border-t border-black/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm/6">
            © 2026 Tormann & Bewegungsschule Weinviertel
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <nav
              aria-label="Weitere Links"
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${linkClassName} py-2 text-sm/6 ${
                    item.href === "/camp-anmeldung"
                      ? "font-semibold"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <a
              href="https://coming-soon-beige-beta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClassName} py-2 text-sm/6`}
            >
              Erstellt von <span className="font-bold">DVI</span>
              <span className="sr-only">
                {" "}
                (öffnet in einem neuen Tab)
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}