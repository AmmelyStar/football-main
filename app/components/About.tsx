import Image from "next/image";

const activeCareerLogos = [
  { src: "/aboutStudy/logo1.png", alt: "Club 1" },
  { src: "/aboutStudy/logo2.png", alt: "Club 2" },
  { src: "/aboutStudy/logo3.png", alt: "Club 3" },
  { src: "/aboutStudy/logo4.png", alt: "Club 4" },
  { src: "/aboutStudy/logo5.png", alt: "Club 5" },
  { src: "/aboutStudy/logo6.png", alt: "Club 6" },
  { src: "/aboutStudy/logo7.png", alt: "Club 7" },
  { src: "/aboutStudy/logo8.png", alt: "Club 8" },
  { src: "/aboutStudy/logo9.png", alt: "Club 9" },
];

const trainerLogos = [
  { src: "/aboutWork/logo1.png", alt: "Club 1" },
  { src: "/aboutWork/logo2.png", alt: "Club 2" },
  { src: "/aboutWork/logo3.png", alt: "Club 3" },
  { src: "/aboutWork/logo4.png", alt: "Club 4" },
  { src: "/aboutWork/logo5.png", alt: "Club 5" },
  { src: "/aboutWork/logo6.png", alt: "Club 6" },
  { src: "/aboutWork/logo7.png", alt: "Club 7" },
  { src: "/aboutWork/logo8.png", alt: "Club 8" },
  { src: "/aboutWork/logo9.png", alt: "Club 9" },
  { src: "/aboutWork/logo10.png", alt: "Club 10" },
  { src: "/aboutWork/logo11.png", alt: "Club 11" },
  { src: "/aboutWork/logo12.png", alt: "Club 12" },
  { src: "/aboutWork/logo13.png", alt: "Club 13" },
  { src: "/aboutWork/logo14.png", alt: "SC Poysdorf" },
];

type Logo = {
  src: string;
  alt: string;
};

function LogoBand({ logos }: { logos: Logo[] }) {
  return (
    <div className="mt-16 w-full bg-black py-10 sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-10 px-6 lg:px-8">
        {logos.map((logo) => (
          <div
            key={logo.src}
            className="flex h-24 w-28 items-center justify-center opacity-80 transition-all duration-300 ease-out hover:scale-110 hover:opacity-100 sm:w-36 lg:w-40"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={158}
              height={80}
              className="max-h-24 max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div id="about" className="-mt-px bg-[#165201] pt-20 sm:pt-24">
      {/* Фотография и заголовок */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 md:flex-row md:items-end md:gap-12">
          <div className="w-full max-w-80 shrink-0 overflow-hidden rounded-lg md:w-48">
            <Image
              src="/franz.jpg"
              alt="Franz Machaczek – Tormanntrainer"
              width={960}
              height={1280}
              sizes="(max-width: 767px) 320px, 192px"
              className="h-auto w-full"
            />
          </div>

          <div className="min-w-0 text-center md:pb-2 md:text-left">
            <p
              className="text-3xl font-medium text-white/80 sm:text-4xl"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              Franz Machaczek
            </p>

            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              Über mich
            </h2>
          </div>
        </div>

        {/* Aktive Karriere */}
        <section className="mt-12">
          <div className="mx-auto max-w-7xl items-start justify-center gap-x-16 md:flex">
            <h3 className="mt-1 shrink-0 font-display text-2xl font-bold text-white md:w-40">
              Aktive Karriere
            </h3>

            <p className="mt-8 min-w-0 text-base/8 font-light text-white md:mt-0 md:max-w-2xl">
              Seit über 40 Jahren ist Fußball meine Leidenschaft. Als aktiver
              Tormann und lizenzierter Tormanntrainer durfte ich wertvolle
              Erfahrungen auf und neben dem Platz sammeln. Bereits seit 2009
              arbeite ich mit Nachwuchs- und Erwachsenentorhütern und
              unterstütze sie dabei, ihre Technik, Reaktionsfähigkeit und ihr
              Selbstvertrauen gezielt weiterzuentwickeln.{" "}

              <span className="mx-1 bg-black px-1 font-semibold text-white">
                Mit der UEFA-Torwarttrainer-B-Lizenz und jahrzehntelanger
                Praxiserfahrung weiß ich, worauf es im modernen Tormannspiel
                ankommt.
              </span>{" "}

              Mein Ziel ist es, jeden Torhüter individuell zu fördern und dabei
              zu helfen, das persönliche Potenzial bestmöglich auszuschöpfen.
            </p>
          </div>
        </section>
      </div>

      <LogoBand logos={activeCareerLogos} />

      {/* Trainerstationen */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <section className="mt-16 md:mt-28">
          <div className="mx-auto flex max-w-7xl flex-col-reverse items-start justify-center gap-x-16 gap-y-6 md:flex-row">
            <p className="min-w-0 max-w-2xl text-left text-base/8 font-light text-white md:text-right">
              Als Tormanntrainer arbeite ich in zahlreichen Vereinen und bilde
              dabei Torhüter aller Altersklassen aus.{" "}

              <span className="mx-1 bg-black px-1 font-semibold text-white">
                Seit 2009 begleite ich Torhüter auf ihrem Weg — vom
                Nachwuchsspieler bis zum Profi.
              </span>{" "}

              Mein Ziel ist es, jeden Torhüter individuell zu fördern und dabei
              zu helfen, das persönliche Potenzial bestmöglich auszuschöpfen.
            </p>

            <h3 className="mt-1 shrink-0 font-display text-2xl font-bold text-white md:w-40">
              Trainer&shy;stationen
            </h3>
          </div>
        </section>
      </div>

      <LogoBand logos={trainerLogos} />

      <div className="h-20 bg-[#165201] sm:h-24" />
    </div>
  );
}