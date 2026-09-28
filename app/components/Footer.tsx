import Link from "next/link";

const navigation = [
  { name: "Camp Anmeldung", href: "/camp-anmeldung" },
  { name: "Datenschutz", href: "/datenschutz" },
  { name: "Impressum", href: "/impressum" },
  { name: "AGB", href: "/agb" },
];

export default function Footer() {
  return (
    <footer className="bg-[#165201]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-10 border-t border-black/60 pt-10 md:flex-row md:items-start md:justify-between">
          {/* Информация */}
          <div>
            <Link
              href="/"
              className="text-lg font-semibold text-white transition hover:text-white/75"
            >
              Tormann & Bewegungsschule Weinviertel
            </Link>

            <p className="mt-4 max-w-md text-sm/6 text-white/65">
              Professionelles Tormanntraining, Bewegung und individuelle
              Förderung im Weinviertel.
            </p>

            <Link
              href="/camp-anmeldung"
              className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors duration-300 hover:bg-white hover:text-[#165201]"
            >
              Jetzt zum Camp anmelden
            </Link>
          </div>

          {/* Контакты */}
          <div className="space-y-3 text-sm/6 text-white/65">
            <p className="font-semibold text-white">Kontakt</p>

            <p>
              Union Tormann- und Bewegungsschule Weinviertel
              <br />
              Österreich
            </p>

            <p>
              <span className="font-medium text-white">E-Mail:</span>{" "}
              <a
                href="mailto:franz.machaczek@hotmail.com"
                className="transition hover:text-white"
              >
                franz.machaczek@hotmail.com
              </a>
            </p>

            <p>
              <span className="font-medium text-white">Telefon:</span>{" "}
              <a
                href="tel:+436643919374"
                className="transition hover:text-white"
              >
                +43 664 391 93 74
              </a>
            </p>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="mt-10 flex flex-col gap-4 border-t border-black/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm/6 text-white/60">
            © 2026 Tormann & Bewegungsschule Weinviertel
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm/6 transition ${
                  item.name === "Camp Anmeldung"
                    ? "font-semibold text-white hover:text-white/70"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://coming-soon-beige-beta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm/6 text-white/60 transition hover:text-white"
            >
              Erstellt von <span className="font-bold">DVI</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}