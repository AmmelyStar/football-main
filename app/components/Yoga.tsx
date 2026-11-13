import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const yogaClasses = [
  {
    day: "Montag",
    title: "Stretch & Mobility",
    points: [
      "Fokus auf Dehnung und Beweglichkeit",
      "Verbesserung der Regeneration",
      "Für jedes Fitnesslevel geeignet",
    ],
    time: "18:45 Uhr",
    location: "Veranstaltungssaal Drösing",
    price: "€ 16 pro Einheit",
    blockPrice: "5er Block € 75",
  },
  {
    day: "Mittwoch",
    title: "Strength & Stability",
    points: [
      "Kräftigung des gesamten Körpers",
      "Verbesserung von Balance und Stabilität",
      "Ideale Ergänzung zum Sporttraining",
    ],
    time: "18:45 Uhr",
    location: "Turnsaal der VS Hauskirchen",
    price: "€ 16 pro Einheit",
    blockPrice: "5er Block € 75",
  },
];

const yogaInfo = [
  {
    title: "Für jedes Fitnesslevel",
    text: "Die Einheiten eignen sich für Anfänger, Sportler und alle, die mehr Beweglichkeit, Stabilität und Körpergefühl entwickeln möchten.",
  },
  {
    title: "Ideal als Ergänzung zum Sport",
    text: "Mobilität, Dehnung und Stabilität unterstützen Regeneration, Prävention und eine nachhaltige sportliche Entwicklung.",
  },
];

export default function Yoga() {
  return (
    <section id="yoga" className="bg-[#165201]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p
          className="text-center text-4xl font-medium text-white/70"
          style={{ fontFamily: "'Indie Flower', cursive" }}
        >
          Yoga & Bewegung
        </p>

        <h2 className="mx-auto mt-6 max-w-2xl text-balance text-center font-display text-2xl font-semibold leading-relaxed tracking-wide text-white [overflow-wrap:anywhere] sm:text-3xl md:text-5xl md:leading-relaxed">
          Bewegungsschule Weinviertel
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-base/8 font-light text-white/85">
          Yoga für mehr Beweglichkeit & Stärke – ideal zur Verbesserung von
          Mobilität, Stabilität, Regeneration und Körpergefühl.
        </p>

        <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Левая колонка */}
          <div className="flex min-w-0 flex-col gap-6 lg:gap-8">
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              {yogaClasses.map((item) => (
                <article
                  key={item.title}
                  className="min-w-0 rounded-lg border border-white/10 bg-black p-5 transition-colors duration-300 hover:border-white/30 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <p
                      className="shrink-0 text-2xl font-medium text-white/75"
                      style={{ fontFamily: "'Indie Flower', cursive" }}
                    >
                      {item.day}
                    </p>

                    <div className="min-w-0 space-y-2 text-sm text-white/75 sm:max-w-52 sm:text-right">
                      <p>{item.location}</p>

                      <p className="flex items-center gap-2 sm:justify-end">
                        <ClockIcon
                          aria-hidden="true"
                          className="size-5 shrink-0"
                        />
                        <span>{item.time}</span>
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-semibold uppercase leading-relaxed tracking-wide text-white [overflow-wrap:anywhere] sm:text-2xl">
                    {item.title}
                  </h3>

                  <ul className="mt-3 space-y-2 text-sm/6 font-light text-white/80">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden="true">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 grid grid-cols-1 gap-3 text-sm font-medium sm:grid-cols-2">
                    <p className="bg-white px-4 py-3 text-center text-black">
                      {item.price}
                    </p>

                    <p className="border border-white/25 px-4 py-3 text-center text-white">
                      {item.blockPrice}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Дополнительная информация */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {yogaInfo.map((item) => (
                <div
                  key={item.title}
                  className="min-w-0 rounded-lg border border-white/10 bg-black p-5 transition-colors duration-300 hover:border-white/30 sm:p-6"
                >
                  <h3 className="font-display text-lg font-semibold uppercase leading-relaxed tracking-wide text-white [overflow-wrap:anywhere]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm/6 font-light text-white/75">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Фотография и информация об Iris */}
          <div className="min-w-0 overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
            <div className="relative aspect-[3/4]">
              <Image
                src="/yoga-iris.png"
                alt="Iris Schneider bei einer Yogaübung am Strand"
                fill
                sizes="(max-width: 1023px) 100vw, 600px"
                className="object-contain"
              />
            </div>

            <div className="p-5 text-white sm:p-8">
              <p
                className="text-2xl font-medium text-white/70"
                style={{ fontFamily: "'Indie Flower', cursive" }}
              >
                Mehr Informationen
              </p>

              <h3 className="mt-4 font-display text-2xl font-semibold uppercase leading-relaxed tracking-wide text-white [overflow-wrap:anywhere] sm:text-3xl">
                Iris Schneider
              </h3>

              <p className="mt-3 max-w-md text-base/7 font-light text-white/75">
                Weitere Details zu den Yoga- und Bewegungseinheiten finden
                Sie direkt auf der Website.
              </p>

              <Link
                href="https://www.iris-schneider.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center border border-white bg-white px-6 py-4 text-base font-semibold text-[#165201] transition-colors duration-300 hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Website öffnen
                <span className="sr-only"> (öffnet in einem neuen Tab)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}