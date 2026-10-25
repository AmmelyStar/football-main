"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type ContactData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
};

type FormErrors = Partial<Record<keyof ContactData, string>>;

const initialData: ContactData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  privacy: false,
};

const fieldClassName =
  "mt-1 block box-border w-full min-w-0 max-w-full rounded-md border border-white/30 bg-black/25 px-3.5 py-2.5 text-base text-white placeholder:text-white/75 focus:border-white focus:outline-2 focus:outline-offset-2 focus:outline-white";

const fields = [
  {
    name: "name",
    label: "Name *",
    type: "text",
    autoComplete: "name",
    required: true,
    maxLength: 200,
  },
  {
    name: "company",
    label: "Unternehmen",
    type: "text",
    autoComplete: "organization",
    required: false,
    maxLength: 200,
  },
  {
    name: "email",
    label: "E-Mail *",
    type: "email",
    autoComplete: "email",
    required: true,
    maxLength: 254,
  },
  {
    name: "phone",
    label: "Telefon",
    type: "tel",
    autoComplete: "tel",
    required: false,
    maxLength: 100,
  },
] as const;

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const [isSending, setIsSending] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = event.target;
    const name = target.name as keyof ContactData;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));

    setSuccess(false);
    setSendError("");
  }

  function validate() {
    const nextErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = "Bitte geben Sie Ihren Namen ein.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    if (
      formData.phone.trim() &&
      !/^[0-9+\s()-]{6,100}$/.test(formData.phone.trim())
    ) {
      nextErrors.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message =
        "Die Nachricht sollte mindestens 10 Zeichen haben.";
    }

    if (!formData.privacy) {
      nextErrors.privacy = "Bitte akzeptieren Sie die Datenschutzerklärung.";
    }

    setErrors(nextErrors);

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) return;

    setSuccess(false);
    setSendError("");

    const validationErrors = validate();
    const firstError = Object.keys(validationErrors)[0];

    if (firstError) {
      const element = event.currentTarget.elements.namedItem(firstError);

      if (element instanceof HTMLElement) {
        element.focus();
      }

      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || result.ok !== true) {
        throw new Error(
          result.message || "Fehler beim Senden. Bitte versuchen Sie es später erneut.",
        );
      }

      setFormData(initialData);
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setSendError(
        error instanceof Error
          ? error.message
          : "Fehler beim Senden. Bitte versuchen Sie es später erneut.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="relative isolate w-full min-w-0 max-w-full">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSending}
        className="mx-auto mt-12 w-full min-w-0 max-w-xl lg:mt-0"
      >
        <fieldset
          disabled={isSending}
          className="m-0 min-w-0 border-0 p-0"
        >
          <legend className="sr-only">Kontaktformular</legend>

          <div className="grid min-w-0 grid-cols-1 gap-6">
            {fields.map((field) => (
              <div key={field.name} className="min-w-0">
                <label
                  htmlFor={`contact-${field.name}`}
                  className="block text-sm font-medium text-white"
                >
                  {field.label}
                </label>

                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  maxLength={field.maxLength}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={
                    field.name === "phone" ? "+43 664 391 93 74" : undefined
                  }
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name]
                      ? `contact-${field.name}-error`
                      : undefined
                  }
                  className={fieldClassName}
                />

                {errors[field.name] && (
                  <p
                    id={`contact-${field.name}-error`}
                    className="mt-2 break-words text-sm text-red-200"
                  >
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <div className="min-w-0">
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-white"
              >
                Nachricht *
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                maxLength={10000}
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={`${fieldClassName} resize-y`}
              />

              {errors.message && (
                <p
                  id="contact-message-error"
                  className="mt-2 break-words text-sm text-red-200"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-start gap-3">
                <input
                  id="contact-privacy"
                  name="privacy"
                  type="checkbox"
                  required
                  checked={formData.privacy}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.privacy)}
                  aria-describedby={
                    errors.privacy ? "contact-privacy-error" : undefined
                  }
                  className="mt-1 size-4 shrink-0 accent-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                />

                <label
                  htmlFor="contact-privacy"
                  className="min-w-0 flex-1 text-sm/6 text-white [overflow-wrap:anywhere]"
                >
                  Ich willige in die Verarbeitung meiner Daten gemäß der{" "}
                  <a
                    href="/datenschutz"
                    className="rounded-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Datenschutzerklärung
                  </a>{" "}
                  ein.
                </label>
              </div>

              {errors.privacy && (
                <p
                  id="contact-privacy-error"
                  className="mt-2 break-words text-sm text-red-200"
                >
                  {errors.privacy}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="mt-10 w-full rounded-md bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-white hover:text-[#165201] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Wird gesendet..." : "Absenden"}
          </button>
        </fieldset>

        <div role="status" aria-live="polite">
          {success && (
            <p className="mt-6 break-words text-center text-sm/6 font-medium text-white">
              Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
            </p>
          )}
        </div>

        {sendError && (
          <p
            role="alert"
            className="mt-6 break-words text-center text-sm/6 text-red-200"
          >
            {sendError}
          </p>
        )}
      </form>
    </div>
  );
}