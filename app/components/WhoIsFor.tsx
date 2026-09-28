"use client";

import Categories from "./Categories";

export default function WhoIsFor() {
  return (
    <section
      id="training"
      className="bg-[#165201] py-20 sm:py-24"
    >
      <div
        id="whoisfor"
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl items-center justify-center gap-x-16 md:flex">
          <h2 className="text-balance font-display text-3xl/12 font-semibold tracking-tight text-white md:text-5xl/20">
            Tormanntraining für alle Altersklassen
          </h2>

          <div className="max-w-3xl text-base/8 font-light text-white">
            <p className="mt-6">
              Eine fundierte Ausbildung in den Bereichen direkte
              Torverteidigung, Raumsicherung und mannschaftstaktisches Verhalten
              bildet die Grundlage unseres Trainings. Ergänzt wird das Programm
              durch gezielte Einheiten in Fitness, Koordination und Athletik.
            </p>

            <p className="mt-6">
              Das Training wird alters- und leistungsgerecht durchgeführt.{" "}

              <span className="mx-1 bg-black px-1 font-semibold text-white">
                In den Gruppen achten wir darauf, dass die
                Leistungsunterschiede der Tormänner möglichst gering bleiben,
                um optimale Trainingsbedingungen zu schaffen.
              </span>
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3
            className="text-4xl font-medium text-white"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
            Wir bieten:
          </h3>

          <div className="categories-scroll-area mt-8 pb-2">
            <Categories />
          </div>
        </div>

        <p className="mt-12 max-w-2xl text-base/8 font-light text-white">
          Für Kinder gibt es keine Altersgrenze. Wichtig ist jedoch die eigene
          Motivation und der Wunsch, im Tor zu stehen – denn Begeisterung und
          Freude am Tormannspiel sind die Grundlage für nachhaltigen
          Trainingserfolg.
        </p>
      </div>

      <style jsx global>{`
        /* Firefox */
        #training .categories-scroll-area * {
          scrollbar-width: thin;
          scrollbar-color: #afd63f #000000;
        }

        /* Chrome, Edge und Safari */
        #training .categories-scroll-area *::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }

        #training .categories-scroll-area *::-webkit-scrollbar-track {
          background: #000000;
          border-radius: 999px;
        }

        #training .categories-scroll-area *::-webkit-scrollbar-thumb {
          min-width: 80px;
          background: #afd63f;
          border: 3px solid #000000;
          border-radius: 999px;
          transition: background-color 200ms ease;
        }

        #training .categories-scroll-area *::-webkit-scrollbar-thumb:hover {
          background: #ffffff;
        }

        #training .categories-scroll-area *::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }

        #training .categories-scroll-area *::-webkit-scrollbar-corner {
          background: #000000;
        }
      `}</style>
    </section>
  );
}