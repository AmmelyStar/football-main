"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  privacy?: string;
};

const fieldClassName =
  "mt-1 block w-full rounded-md bg-black/25 px-3.5 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-white/20 transition placeholder:text-white/35 focus:bg-black/35 focus:outline-2 focus:-outline-offset-2 focus:outline-white/70";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = event.target;

    const checked =
      event.target instanceof HTMLInputElement
        ? event.target.checked
        : false;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Bitte geben Sie Ihren Namen ein.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    if (formData.phone && !/^[0-9+\s()-]{6,}$/.test(formData.phone)) {
      newErrors.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message =
        "Die Nachricht sollte mindestens 10 Zeichen haben.";
    }

    if (!formData.privacy) {
      newErrors.privacy =
        "Bitte akzeptieren Sie die Datenschutzerklärung.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess(false);

    if (!validate()) return;

    try {
      setIsSending(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Senden");
      }

      setSuccess(true);

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        privacy: false,
      });
    } catch (error) {
      console.error(error);

      alert(
        "Fehler beim Senden. Bitte versuchen Sie es später erneut.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="relative isolate">
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 max-w-xl lg:mt-0"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className={fieldClassName}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-300">
                {errors.name}
              </p>
            )}
          </div>

          {/* Unternehmen */}
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-white"
            >
              Unternehmen
            </label>

            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              className={fieldClassName}
            />
          </div>

          {/* E-Mail */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              E-Mail *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={fieldClassName}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-300">
                {errors.email}
              </p>
            )}
          </div>

          {/* Telefon */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-white"
            >
              Telefon
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+43 664 391 93 74"
              className={fieldClassName}
            />

            {errors.phone && (
              <p className="mt-2 text-sm text-red-300">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Nachricht */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-white"
            >
              Nachricht *
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={fieldClassName}
            />

            {errors.message && (
              <p className="mt-2 text-sm text-red-300">
                {errors.message}
              </p>
            )}
          </div>

          {/* Datenschutz */}
          <div className="sm:col-span-2">
            <div className="flex gap-x-4">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                checked={formData.privacy}
                onChange={handleChange}
                className="mt-1 size-4 shrink-0 accent-black"
              />

              <label
                htmlFor="privacy"
                className="text-sm/6 text-white/75"
              >
                Ich willige in die Verarbeitung meiner Daten gemäß der{" "}
                <a
                  href="/datenschutz"
                  className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:text-white/70"
                >
                  Datenschutzerklärung
                </a>{" "}
                ein.
              </label>
            </div>

            {errors.privacy && (
              <p className="mt-2 text-sm text-red-300">
                {errors.privacy}
              </p>
            )}
          </div>
        </div>

        {/* Кнопка */}
        <div className="mt-10">
          <button
            type="submit"
            disabled={isSending}
            className="w-full rounded-md bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 ease-out hover:bg-white hover:text-[#165201] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Wird gesendet..." : "Absenden"}
          </button>
        </div>

        {success && (
          <p className="mt-6 text-center text-sm/6 font-medium text-white">
            Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
          </p>
        )}
      </form>
    </div>
  );
}