import Image from "next/image";

const sponsors = [
  {
    name: "Sponsor 1",
    logo: "/sponsor/p1.png",
  },
  {
    name: "Sponsor 2",
    logo: "/sponsor/s1.png",
  },
  {
    name: "Sponsor 3",
    logo: "/sponsor/s2.png",
  },
];

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="overflow-hidden bg-[#165201] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Текст */}
        <div className="text-center">
          <p
            className="text-4xl font-medium text-white/70"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
            Netzwerk & Unterstützung
          </p>

          <h2 className="mt-6 text-balance font-display text-3xl/12 font-semibold tracking-tight text-white md:text-5xl">
            Unsere Sponsoren und Partner
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-base/8 font-light text-white/85">
            Gemeinsam mit unseren Sponsoren und Partnern schaffen wir
            bestmögliche Bedingungen für professionelles Tormanntraining,
            Bewegung, Entwicklung und Freude am Sport.
          </p>

          <div className="mt-8">
            <a
              href="#kontakt"
              className="inline-flex rounded-md bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 ease-out hover:bg-white hover:text-[#165201]"
            >
              Partner werden
            </a>
          </div>
        </div>

        {/* Фоновая фотография и логотипы */}
        <div className="relative mx-auto mt-12 h-56 max-w-5xl overflow-hidden sm:aspect-[4/1] sm:h-auto">
          <Image
            src="/hero/ballbg.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />

          {/* Лёгкая растушёвка слева */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-6 bg-gradient-to-r from-[#165201] to-transparent sm:w-8" />

          {/* Лёгкая растушёвка справа */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-6 bg-gradient-to-l from-[#165201] to-transparent sm:w-8" />

          {/* Лёгкая растушёвка сверху */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-6 bg-gradient-to-b from-[#165201] to-transparent sm:h-8" />

          {/* Лёгкая растушёвка снизу */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-6 bg-gradient-to-t from-[#165201] to-transparent sm:h-8" />

          {/* Логотипы */}
          <div className="relative z-10 grid h-full grid-cols-3 items-center gap-4 px-6 sm:grid-cols-4 sm:gap-8 sm:px-12">
            <div className="flex items-center justify-center opacity-90 transition-all duration-300 ease-out hover:scale-105 hover:opacity-100 sm:justify-start">
              <Image
                src={sponsors[0].logo}
                alt={sponsors[0].name}
                width={320}
                height={200}
                className="max-h-24 w-full object-contain"
              />
            </div>

            <div className="hidden sm:block" />

            <div className="flex items-center justify-center opacity-90 transition-all duration-300 ease-out hover:scale-105 hover:opacity-100">
              <Image
                src={sponsors[1].logo}
                alt={sponsors[1].name}
                width={320}
                height={200}
                className="max-h-24 w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-center opacity-90 transition-all duration-300 ease-out hover:scale-105 hover:opacity-100 sm:justify-end">
              <Image
                src={sponsors[2].logo}
                alt={sponsors[2].name}
                width={320}
                height={200}
                className="max-h-24 w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}