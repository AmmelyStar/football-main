import {
  BoltIcon,
  ChartBarIcon,
  FaceSmileIcon,
  FireIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  {
    title: "Erfahrene Trainer",
    description:
      "Training mit fachlicher Kompetenz, Praxiserfahrung und Leidenschaft für das Tormannspiel.",
    icon: TrophyIcon,
  },
  {
    title: "Kleine Gruppen",
    description:
      "Mehr Aufmerksamkeit für jeden Teilnehmer und bessere individuelle Betreuung.",
    icon: UserGroupIcon,
  },
  {
    title: "Moderne Trainingsmethoden",
    description:
      "Zeitgemäße Übungen für Technik, Reaktion, Spielverständnis und Entscheidungsverhalten.",
    icon: BoltIcon,
  },
  {
    title: "Individuelle Förderung",
    description:
      "Alters- und leistungsgerechtes Training abgestimmt auf persönliche Ziele.",
    icon: ChartBarIcon,
  },
  {
    title: "Athletik & Koordination",
    description:
      "Gezielte Einheiten zur Verbesserung von Beweglichkeit, Stabilität und Explosivität.",
    icon: FireIcon,
  },
  {
    title: "Spaß am Training",
    description:
      "Motivation, Freude und Begeisterung stehen bei jeder Einheit im Mittelpunkt.",
    icon: FaceSmileIcon,
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="bg-[#165201] py-12 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl gap-16 pb-32 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Заголовок */}
          <div>
            <p
              className="text-4xl font-medium text-white/70"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              Deine Vorteile
            </p>

            <h2 className="mt-6 max-w-md text-balance font-display text-3xl/12 font-semibold tracking-wider text-white md:text-5xl/20">
              WARUM UNS WÄHLEN?
            </h2>

            <p className="mt-6 text-balance text-base/8 font-light text-white/85">
              Professionelles Training. Individuelle Förderung. Nachhaltiger
              Erfolg.
            </p>

            <div className="mt-8">
              <Link
                href="#kontakt"
                className="inline-flex rounded-md bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 ease-out hover:bg-white hover:text-[#165201]"
              >
                Jetzt anfragen
              </Link>
            </div>
          </div>

          {/* Преимущества */}
          <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative pl-16"
              >
                <dt className="text-base font-bold text-white">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg border border-white/15 bg-black transition duration-300 group-hover:border-white/40">
                    <benefit.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>

                  {benefit.title}
                </dt>

                <dd className="mt-3 text-balance text-base/8 font-light text-white/75">
                  {benefit.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Нижняя чёрная полоса */}
      <div className="w-full bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 px-6 py-8 lg:flex-row lg:gap-16 lg:px-8 lg:py-0">
          <Image
            src="/team.webp"
            alt="Tormanntraining"
            width={600}
            height={388}
            className="h-auto w-full max-w-md shrink-0 rounded-lg object-contain lg:-my-10 lg:max-w-lg"
          />

          <p
            className="mx-auto max-w-lg px-6 pb-4 text-balance text-center text-4xl font-medium text-white lg:mx-0 lg:text-left"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
            Werde Teil der Tormannschule Weinviertel und entwickle dein volles
            Potenzial im Tor.
          </p>
        </div>
      </div>
    </section>
  );
}