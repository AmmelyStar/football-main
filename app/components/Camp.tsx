import {
  CalendarDaysIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { getOpenCamps } from "../data/camps";

export default function Camp() {
  const camps = getOpenCamps();

  return (
    <section id="camp" className="bg-[#165201]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Заголовок и фотография */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p
              className="text-4xl font-medium text-white"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              Unsere aktuellen Camps
            </p>

            <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl">
              Dein Training.
              <br />
              Dein nächster Schritt.
            </h2>

            <p className="mt-6 max-w-lg text-base/8 font-light text-white">
              Trainiere mit der{" "}
              <span className="bg-black px-1 font-semibold text-white">
                UNION Tormannschule Weinviertel
              </span>
              . Entdecke unsere aktuellen Trainingscamps und finde den
              passenden Termin für deinen nächsten Schritt im Tor.
            </p>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src="/с.png"
              alt="Fußball im Tornetz auf einem beleuchteten Fußballplatz"
              fill
              sizes="(max-width: 1023px) 100vw, 600px"
              className="object-cover"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            />
          </div>
        </div>

        {/* Актуальные лагеря из общего списка */}
        {camps.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:mt-16 xl:grid-cols-3">
            {camps.map((camp) => (
              <article
                key={camp.id}
                className="flex min-w-0 flex-col rounded-xl bg-black p-5 sm:p-6"
              >
                <div className="flex min-h-8 flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                    {camp.label}
                  </p>

                  {camp.limited && (
                    <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white">
                      Limitierte Plätze
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold leading-relaxed text-white [overflow-wrap:anywhere] sm:text-2xl">
                  {camp.title}
                </h3>

                <dl className="mt-7 space-y-4">
                  <div className="relative pl-8">
                    <dt className="sr-only">Termin</dt>

                    <dd className="text-sm font-medium leading-6 text-white">
                      <CalendarDaysIcon
                        aria-hidden="true"
                        className="absolute left-0 top-0.5 size-5 text-white/80"
                      />
                      {camp.date}
                    </dd>
                  </div>

                  <div className="relative pl-8">
                    <dt className="sr-only">Ort</dt>

                    <dd className="text-sm leading-6 text-white/90">
                      <MapPinIcon
                        aria-hidden="true"
                        className="absolute left-0 top-0.5 size-5 text-white/80"
                      />
                      {camp.location}
                    </dd>
                  </div>
                </dl>

                {/* Цены и кнопки выровнены по низу */}
                <div className="mt-auto pt-8">
                  <div className="grid grid-cols-2 gap-3 border-t border-white/15 pt-6">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white/80">
                        Frühbucherpreis
                      </p>

                      <p className="mt-3 whitespace-nowrap font-display text-3xl font-semibold text-white">
                        € {camp.earlyPrice}
                      </p>

                      <p className="mt-3 text-xs/5 text-white/80">
                        Bei Anmeldung bis {camp.earlyDeadline}
                      </p>
                    </div>

                    <div className="min-w-0 border-l border-white/15 pl-3">
                      <p className="text-xs font-medium text-white/80">
                        Normalpreis
                      </p>

                      <p className="mt-3 whitespace-nowrap font-display text-3xl font-semibold text-white">
                        € {camp.regularPrice}
                      </p>

                      <p className="mt-3 text-xs/5 text-white/80">
                        Bei Anmeldung danach
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/camp-anmeldung?camp=${encodeURIComponent(camp.id)}`}
                    className="mt-8 block rounded-md bg-white px-5 py-3.5 text-center text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#165201] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Jetzt anmelden
                    <span className="sr-only">
                      {" "}
                      – {camp.title} in {camp.location}, {camp.date}
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-xl bg-black p-6 text-center text-base/8 text-white">
            Derzeit sind keine Camps zur Anmeldung verfügbar. Neue Termine
            werden hier bekannt gegeben.
          </p>
        )}

        {/* Контакты */}
        <div className="mt-10 flex flex-col gap-5 border-b border-t border-black/60 py-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Anmeldung & Kontakt
            </h3>

            <p className="mt-1 text-sm text-white">
              Fragen zu den Camps? Melde dich bei uns.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <a
              href="mailto:tormannschuleweinviertel@hotmail.com"
              className="whitespace-nowrap rounded-sm text-[10px] font-medium text-white underline decoration-white/60 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[375px]:text-xs sm:text-sm"
            >
              tormannschuleweinviertel@hotmail.com
            </a>

            <a
              href="tel:+436643919374"
              className="whitespace-nowrap rounded-sm text-sm font-medium text-white underline decoration-white/60 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              0664 391 93 74
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}