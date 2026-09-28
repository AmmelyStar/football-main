import {
  CalendarDaysIcon,
  MapPinIcon,
  SparklesIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const campDetails = [
  {
    icon: CalendarDaysIcon,
    title: "13. – 14. Juni 2026",
    text: "Jeweils 9:00 – 12:30 Uhr",
  },
  {
    icon: MapPinIcon,
    title: "Sportplatz USV Bullendorf",
    text: "Training auf dem Sportplatz",
  },
  {
    icon: TrophyIcon,
    title: "3 Trainingseinheiten täglich",
    text: "Intensives Tormanntraining",
  },
  {
    icon: UserGroupIcon,
    title: "Für Kinder & Jugendliche",
    text: "Von 8 bis 17 Jahren",
  },
  {
    icon: SparklesIcon,
    title: "Inklusive Campshirt 2026",
    text: "Im Preis enthalten",
  },
];

export default function Camp() {
  return (
    <section id="camp" className="bg-[#165201]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 md:pt-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 border-b border-black/60 pb-16 lg:grid-cols-2">
          {/* Информация */}
          <div>
            <div className="border-b border-black/60 pb-10">
              <p
                className="text-4xl font-medium text-white/70"
                style={{ fontFamily: "'Indie Flower', cursive" }}
              >
                Vor den Sommerferien
              </p>

              <h2 className="mt-6 text-balance font-display text-3xl/12 font-semibold uppercase tracking-wider text-white md:max-w-md md:text-5xl/20">
                Tormann-Trainingscamp
              </h2>

              <p className="mt-6 text-balance text-base/8 font-light text-white">
                <span className="mx-1 bg-black px-1 font-semibold text-white">
                  2 Tage voller Training, Spaß und Entwicklung.
                </span>{" "}
                Das Camp richtet sich an motivierte Kinder und Jugendliche, die
                ihre Fähigkeiten im Tor gezielt verbessern möchten.
              </p>
            </div>

            <dl className="mt-10 space-y-10">
              {campDetails.map((detail) => (
                <div key={detail.title} className="relative">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-black ring-1 ring-white/20">
                      <detail.icon
                        aria-hidden="true"
                        className="size-6 text-white"
                      />
                    </div>

                    <div>
                      <dt className="text-base font-bold text-white">
                        {detail.title}
                      </dt>

                      <dd className="mt-1 text-base text-white/75">
                        {detail.text}
                      </dd>
                    </div>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Изображение и цены */}
          <div>
            <Image
              alt="Tormann-Trainingscamp"
              src="/с.png"
              width={500}
              height={500}
              className="aspect-square w-full rounded-lg object-cover"
            />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:mt-8 lg:gap-8">
              <div className="rounded-lg bg-black p-5 text-center ring-1 ring-white/10">
                <div className="flex items-center text-center">
                  <span className="mx-auto mt-4 font-display text-6xl/24 font-semibold uppercase tracking-wider text-white">
                    € 99
                  </span>
                </div>

                <p className="mt-5 text-2xl font-bold text-white">
                  Frühbucherpreis
                </p>

                <p className="mt-1 text-base text-white/70">
                  Gültig bei Anmeldung bis 15. Mai 2026.
                </p>
              </div>

              <div className="rounded-lg bg-black p-5 text-center ring-1 ring-white/10">
                <div className="flex items-center text-center">
                  <span className="mx-auto mt-4 font-display text-6xl/24 font-semibold uppercase tracking-wider text-white">
                    € 119
                  </span>
                </div>

                <p className="mt-5 text-2xl font-bold text-white">
                  Normalpreis
                </p>

                <p className="mt-1 text-base text-white/70">
                  Gültig ab 16. Mai 2026.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/camp-anmeldung"
                className="w-full rounded-md bg-black py-3.5 text-center text-base font-semibold text-white shadow-lg transition-colors duration-300 ease-out hover:bg-white hover:text-[#165201]"
              >
                Jetzt anmelden
              </Link>
            </div>

            <p className="mt-6 text-balance text-center text-base/8 text-white/75">
              Fragen? Schreiben Sie uns an{" "}
              <a
                href="mailto:tormannschuleweinviertel@hotmail.com"
                className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-white/70"
              >
                tormannschuleweinviertel@hotmail.com
              </a>{" "}
              oder rufen Sie an unter{" "}
              <a
                href="tel:+436643919374"
                className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-white/70"
              >
                +43 664 391 93 74
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}