import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";

const contactItems = [
  {
    title: "Telefon",
    text: "+43 664 391 93 74",
    href: "tel:+436643919374",
    icon: PhoneIcon,
  },
  {
    title: "E-Mail",
    text: "tormannschuleweinviertel@hotmail.com",
    href: "mailto:tormannschuleweinviertel@hotmail.com",
    icon: EnvelopeIcon,
  },
  {
    title: "Adresse",
    text: "Adresse folgt, Österreich",
    subtext: "",
    href: null,
    icon: MapPinIcon,
  },
];

export default function ContactInfo() {
  return (
    <section
      id="contact"
      className="relative bg-[#165201] pb-24 pt-12"
    >
      {/* Дополнительный якорь для ссылок href="#kontakt" */}
      <span
        id="kontakt"
        className="pointer-events-none absolute -top-24 left-0"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:items-start">
          {/* Контактная информация */}
          <div className="mx-auto md:max-w-xl lg:w-full">
            <p
              className="text-center text-4xl font-medium text-white/70 lg:text-left"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              Kontakt
            </p>

            <h2 className="mt-6 text-balance text-center font-display text-3xl/12 font-semibold tracking-tight text-white md:text-5xl/20 lg:max-w-md lg:text-left">
              Sie erreichen uns auch direkt
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-base/8 font-light text-white/85 lg:text-left">
              Haben Sie Fragen zum Tormanntraining, zu Camps oder individuellen
              Trainingspaketen? Kontaktieren Sie uns gerne telefonisch oder per
              E-Mail.
            </p>

            <div className="mx-auto mt-12 space-y-10 border-b border-black/60 pb-12 lg:max-w-xl lg:border-0 lg:pb-0">
              {contactItems.map((item) => (
                <div key={item.title} className="flex gap-x-6">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-black">
                    <item.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="block wrap-break-word text-base text-white/75 transition hover:text-white"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="wrap-break-word text-base/7 text-white/75">
                        {item.text}

                        {item.subtext && (
                          <>
                            <br />
                            {item.subtext}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Форма */}
          <div className="relative">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}