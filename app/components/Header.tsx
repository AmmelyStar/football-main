"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Über mich", href: "#about" },
  { name: "Warum Wir", href: "#why-us" },
  { name: "Tormanntraining für alle Altersklassen", href: "#training" },
  { name: "Kontakt", href: "#contact" },
  { name: "Unsere Sponsoren und Partner", href: "#sponsors" },
  { name: "Tormanntrainingscamp", href: "#camp" },
  { name: "Bewegungsschule Weinviertel", href: "#yoga" },
];

const focusClassName =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex max-w-7xl items-start justify-between gap-6 p-6 lg:px-8"
      >
        <a
          href="#home"
          aria-label="Tormannschule Weinviertel – Startseite"
          className={`inline-flex shrink-0 rounded-sm transition-opacity hover:opacity-80 ${focusClassName}`}
        >
          <Image
            src="/logo.png"
            alt="Tormannschule Weinviertel"
            width={120}
            height={140}
            sizes="(max-width: 639px) 80px, 112px"
            className="h-24 w-20 object-contain brightness-0 invert sm:h-32 sm:w-28"
          />
        </a>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={mobileMenuOpen}
          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden ${focusClassName}`}
        >
          <span className="sr-only">Menü öffnen</span>
          <Bars3Icon aria-hidden="true" className="size-7" />
        </button>

        <div className="hidden max-w-60 flex-col gap-y-3 text-right lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-sm text-sm/6 text-white transition-colors hover:text-[#afd63f] ${focusClassName}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-[60] lg:hidden"
      >
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-black/60"
        />

        <DialogPanel className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-black p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <DialogTitle className="sr-only">
            Hauptnavigation
          </DialogTitle>

          <div className="flex items-start justify-between gap-6">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tormannschule Weinviertel – Startseite"
              className={`inline-flex shrink-0 rounded-sm ${focusClassName}`}
            >
              <Image
                src="/logo.png"
                alt="Tormannschule Weinviertel"
                width={120}
                height={140}
                sizes="80px"
                className="h-24 w-20 object-contain brightness-0 invert"
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 ${focusClassName}`}
            >
              <span className="sr-only">Menü schließen</span>
              <XMarkIcon aria-hidden="true" className="size-7" />
            </button>
          </div>

          <nav
            aria-label="Mobile Hauptnavigation"
            className="mt-8 space-y-2 border-t border-white/15 pt-6"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-3 text-base/7 text-white transition-colors hover:bg-white/10 hover:text-[#afd63f] ${focusClassName}`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </DialogPanel>
      </Dialog>
    </header>
  );
}