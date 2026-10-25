import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";

const email = "tormannschuleweinviertel@hotmail.com";

const contactItems = [
  {
    title: "Telefon",
    text: "+43 664 391 93 74",
    href: "tel:+436643919374",
    icon: PhoneIcon,
  },
  {
    title: "E-Mail",
    text: email,
    href: `mailto:${email}`,
    icon: EnvelopeIcon,
  },
  {
    title: "Adresse",
    text: "Adresse folgt, Österreich",
    href: null,
    icon: MapPinIcon,
  },
];

export default function ContactInfo() {
  return (
    <section
      id="contact"
      className="relative w-full min-w-0 bg-[#165201] pb-24 pt-12"
    >
      <span
        id="kontakt"
        className="pointer-events-none absolute -top-24 left-0"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full min-w-0 max-w-xl">
            <p
              className="text-center text-4xl font-medium text-white lg:text-left"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              Kontakt
            </p>

            <h2 className="mt-6 text-balance text-center font-display text-3xl/12 font-semibold tracking-tight text-white md:text-5xl/20 lg:max-w-md lg:text-left">
              Sie erreichen uns auch direkt
            </h2>

            <p className="mt-6 text-balance text-center text-base/8 font-light text-white lg:text-left">
              Haben Sie Fragen zum Tormanntraining, zu Camps oder individuellen
              Trainingspaketen? Kontaktieren Sie uns gerne telefonisch oder per
              E-Mail.
            </p>

            <div className="mt-12 space-y-8 border-b border-black/60 pb-12 lg:border-0 lg:pb-0">
              {contactItems.map((item) => (
                <div
                  key={item.title}
                  className="flex min-w-0 items-start gap-3 sm:gap-6"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-black sm:size-11">
                    <item.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>

                    {item.href ? (
                      <a
                        href={item.href}
                        className={`mt-1 inline-block rounded-sm text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                          item.title === "E-Mail"
                            ? "whitespace-nowrap text-[10px]/7 min-[375px]:text-[11px] min-[414px]:text-xs sm:text-base"
                            : "text-base/7"
                        }`}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="mt-1 text-base/7 text-white">
                        {item.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}