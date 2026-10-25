import Image from "next/image";

const sponsors = [
  {
    name: "Raiffeisenbank",
    logo: "/sponsor/s1.png",
  },
  {
    name: "Erste Bank",
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

        <div className="relative mx-auto mt-12 h-72 max-w-5xl overflow-hidden sm:aspect-[4/1] sm:h-auto">
          <Image
            src="/hero/ballbg.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />

          {/* Растушёвка по краям */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-6 bg-gradient-to-r from-[#165201] to-transparent sm:w-8" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-6 bg-gradient-to-l from-[#165201] to-transparent sm:w-8" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-6 bg-gradient-to-b from-[#165201] to-transparent sm:h-8" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-6 bg-gradient-to-t from-[#165201] to-transparent sm:h-8" />

          <div className="relative z-10 grid h-full grid-cols-1 items-center gap-6 px-8 py-8 sm:grid-cols-[1fr_0.65fr_1fr] sm:gap-4 sm:px-12 sm:py-6">
            {/* Партнёры слева */}
            <div className="grid grid-cols-2 items-center gap-5">
              <div className="relative h-24 min-w-0 opacity-90 transition duration-300 ease-out hover:scale-105 hover:opacity-100">
                <Image
                  src="/sponsor/p1.png"
                  alt="Sport Union — Partner"
                  fill
                  sizes="(max-width: 639px) 35vw, 160px"
                  className="object-contain"
                />
              </div>

              <div className="relative h-24 min-w-0 opacity-90 transition duration-300 ease-out hover:scale-105 hover:opacity-100">
                {/* Знак на одной высоте со Sport Union */}
                <div className="absolute inset-x-0 top-[10px] flex justify-center">
                  <Image
                    src="/sponsor/ks.png"
                    alt="KS"
                    width={140}
                    height={32}
                    sizes="140px"
                    className="h-8 w-[140px] max-w-full object-contain"
                  />
                </div>

                {/* Подпись поднята к логотипу */}
                <span className="absolute inset-x-0 top-[41px] text-center font-sans text-[8px] font-normal leading-none text-white/80">
                  Partner
                </span>

                {/* Более широкая и заметная тень */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[14px] left-1/2 h-[10px] w-[90%] -translate-x-1/2 rounded-[100%]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.25) 60%, transparent 80%)",
                    filter: "blur(2px)",
                  }}
                />
              </div>
            </div>

            {/* Свободный центр над мячом */}
            <div aria-hidden="true" className="hidden sm:block" />

            {/* Спонсоры справа */}
            <div className="grid grid-cols-2 items-center gap-5">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.logo}
                  className="relative h-24 min-w-0 opacity-90 transition duration-300 ease-out hover:scale-105 hover:opacity-100"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    sizes="(max-width: 639px) 35vw, 160px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}