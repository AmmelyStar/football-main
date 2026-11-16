"use client";

import Link from "next/link";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  getBirthDateError,
  getOpenCamps,
} from "../data/camps";

type FormData = {
  campId: string;
  parentLastName: string;
  parentFirstName: string;
  parentEmail: string;
  parentPhone: string;
  childLastName: string;
  childFirstName: string;
  birthDate: string;
  emergencyPhone: string;
  notes: string;
  agb: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type FieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

type SelectOption = {
  value: string;
  label: string;
  description?: string;
};

type SubmissionResult = {
  camp: string;
  email: string;
  confirmationSent: boolean;
};

const availableCamps = getOpenCamps();

const initialFormData: FormData = {
  campId: "",
  parentLastName: "",
  parentFirstName: "",
  parentEmail: "",
  parentPhone: "",
  childLastName: "",
  childFirstName: "",
  birthDate: "",
  emergencyPhone: "",
  notes: "",
  agb: false,
};

const germanMonths = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const inputStyle =
  "block w-full min-w-0 rounded-md border border-white/20 bg-[#171717] px-3.5 py-3 text-base text-white outline-none transition-colors placeholder:text-white/45 focus:border-[#afd63f] focus:ring-1 focus:ring-[#afd63f]";

const primaryButton =
  "w-full rounded-md bg-[#afd63f] px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#afd63f] disabled:cursor-not-allowed disabled:opacity-60";

const secondaryButton =
  "w-full rounded-md border border-white/25 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60";

function getStepErrors(
  data: FormData,
  step: number,
): FormErrors {
  const errors: FormErrors = {};

  if (step === 1) {
    if (!availableCamps.some((camp) => camp.id === data.campId)) {
      errors.campId = "Bitte wählen Sie ein Camp aus.";
    }

    if (data.parentLastName.trim().length < 2) {
      errors.parentLastName =
        "Bitte geben Sie den Nachnamen ein.";
    }

    if (data.parentFirstName.trim().length < 2) {
      errors.parentFirstName =
        "Bitte geben Sie den Vornamen ein.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        data.parentEmail.trim(),
      )
    ) {
      errors.parentEmail =
        "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    if (!/^[0-9+\s()-]{6,}$/.test(data.parentPhone.trim())) {
      errors.parentPhone =
        "Bitte geben Sie eine gültige Telefonnummer ein.";
    }
  }

  if (step === 2) {
    if (data.childLastName.trim().length < 2) {
      errors.childLastName =
        "Bitte geben Sie den Nachnamen des Kindes ein.";
    }

    if (data.childFirstName.trim().length < 2) {
      errors.childFirstName =
        "Bitte geben Sie den Vornamen des Kindes ein.";
    }

    const camp = availableCamps.find(
      (item) => item.id === data.campId,
    );

    const birthDateError = getBirthDateError(
      data.birthDate,
      camp?.startDate ?? "",
    );

    if (birthDateError) {
      errors.birthDate = birthDateError;
    }

    if (
      !/^[0-9+\s()-]{6,}$/.test(
        data.emergencyPhone.trim(),
      )
    ) {
      errors.emergencyPhone =
        "Bitte geben Sie eine gültige Notfallnummer ein.";
    }
  }

  if (step === 3 && !data.agb) {
    errors.agb = "Bitte akzeptieren Sie die AGB.";
  }

  return errors;
}

export default function RegistrationForm({
  initialCampId = "",
}: {
  initialCampId?: string;
}) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormData>(() => ({
    ...initialFormData,
    campId: availableCamps.some(
      (camp) => camp.id === initialCampId,
    )
      ? initialCampId
      : "",
  }));

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  const selectedCamp = availableCamps.find(
    (camp) => camp.id === formData.campId,
  );

  const campOptions: SelectOption[] = availableCamps.map(
    (camp) => ({
      value: camp.id,
      label: `${camp.location} – ${camp.date}`,
      description: camp.title,
    }),
  );

  function handleChange(event: FieldChangeEvent) {
    const target = event.target;
    const { name, value } = target;

    const nextValue =
      target instanceof HTMLInputElement &&
      target.type === "checkbox"
        ? target.checked
        : value;

    setFormData((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));

    setSubmitError("");
  }

  function changeCamp(campId: string) {
    setFormData((previous) => ({
      ...previous,
      campId,
    }));

    setErrors((previous) => ({
      ...previous,
      campId: undefined,
      birthDate: undefined,
    }));

    setSubmitError("");
  }

  function changeBirthDate(birthDate: string) {
    setFormData((previous) => ({
      ...previous,
      birthDate,
    }));

    setErrors((previous) => ({
      ...previous,
      birthDate: undefined,
    }));

    setSubmitError("");
  }

  function nextStep() {
    const stepErrors = getStepErrors(formData, step);

    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) return;

    setSubmitError("");
    setStep((previous) => Math.min(previous + 1, 3));
  }

  function prevStep() {
    setErrors({});
    setSubmitError("");
    setStep((previous) => Math.max(previous - 1, 1));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSending || submissionResult) return;

    if (step < 3) {
      nextStep();
      return;
    }

    setSubmitError("");

    for (const currentStep of [1, 2, 3]) {
      const stepErrors = getStepErrors(
        formData,
        currentStep,
      );

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        setStep(currentStep);
        return;
      }
    }

    setErrors({});
    setIsSending(true);

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          parentEmail: formData.parentEmail.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Ihre Anmeldung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter tormannschuleweinviertel@hotmail.com oder +43 664 391 93 74.",
        );
      }

      setSubmissionResult({
        camp: selectedCamp
          ? `${selectedCamp.title} – ${selectedCamp.location}, ${selectedCamp.date}`
          : "",
        email: formData.parentEmail.trim(),
        confirmationSent:
          result.confirmationSent === true,
      });

      setFormData(initialFormData);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ihre Anmeldung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter tormannschuleweinviertel@hotmail.com oder +43 664 391 93 74.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section
      id="anmeldung"
      lang="de"
      className="relative bg-black px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Camp-Anmeldung"
        aria-busy={isSending}
        className="mx-auto min-w-0 max-w-4xl rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 text-white shadow-2xl sm:p-6 md:p-10"
      >
        <h1 className="mb-8 text-center font-display text-2xl leading-relaxed sm:text-3xl">
          Camp-Anmeldung
        </h1>

        {submissionResult ? (
          <div
            role="status"
            className="rounded-xl border border-[#afd63f] bg-[#afd63f]/10 p-5 text-center sm:p-8"
          >
            <CheckIcon
              aria-hidden="true"
              className="mx-auto mb-4 size-10 text-[#afd63f]"
            />

            <h2 className="text-xl font-semibold text-[#afd63f]">
              Anmeldung erfolgreich gesendet!
            </h2>

            <p className="mt-4 text-sm leading-7">
              {submissionResult.camp}
            </p>

            {submissionResult.confirmationSent ? (
              <>
                <p className="mt-5 text-sm leading-7 text-white/90">
                  Ihre Anmeldung wurde erfolgreich
                  gesendet! Eine Bestätigung wurde an
                  Ihre E-Mail-Adresse geschickt.
                </p>

                <p className="mt-2 break-all text-sm font-semibold text-[#afd63f]">
                  {submissionResult.email}
                </p>

                <p className="mt-3 text-sm leading-7 text-white/75">
                  Bitte prüfen Sie gegebenenfalls auch
                  Ihren Spam-Ordner.
                </p>
              </>
            ) : (
              <p className="mt-5 text-sm leading-7 text-white/90">
                Ihre Anmeldung wurde erfolgreich an uns
                übermittelt. Die Bestätigungs-E-Mail
                konnte jedoch nicht gesendet werden.
                Bitte melden Sie sich nicht erneut an.
                Bei Fragen kontaktieren Sie uns bitte.
              </p>
            )}

            <div className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm">
              <a
                href="mailto:tormannschuleweinviertel@hotmail.com"
                className="block break-all text-[#afd63f] underline underline-offset-4"
              >
                tormannschuleweinviertel@hotmail.com
              </a>

              <a
                href="tel:+436643919374"
                className="block text-white underline underline-offset-4"
              >
                +43 664 391 93 74
              </a>
            </div>

          <Link
  href="/"
  className={`${primaryButton} mt-7 inline-flex items-center justify-center sm:w-auto`}
>
  Zur Startseite
</Link>
          </div>
        ) : availableCamps.length === 0 ? (
          <p
            role="status"
            className="text-center leading-7"
          >
            Derzeit sind keine Camps zur Anmeldung
            verfügbar.
          </p>
        ) : (
          <>
            <StepIndicator step={step} />

            <fieldset
              disabled={isSending}
              className="min-w-0"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="campId"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Camp auswählen *
                    </label>

                    <StyledSelect
                      id="campId"
                      label="Camp auswählen"
                      placeholder="Bitte ein Camp auswählen"
                      value={formData.campId}
                      onChange={changeCamp}
                      options={campOptions}
                      disabled={isSending}
                      error={Boolean(errors.campId)}
                      describedBy={
                        errors.campId
                          ? "campId-error"
                          : undefined
                      }
                    />

                    <ErrorMessage
                      name="campId"
                      error={errors.campId}
                    />
                  </div>

                  <h2 className="text-center text-lg text-white/90">
                    Kontaktdaten der Eltern /
                    Erziehungsberechtigten
                  </h2>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                      label="Nachname Elternteil *"
                      name="parentLastName"
                      autoComplete="family-name"
                      value={formData.parentLastName}
                      onChange={handleChange}
                      error={errors.parentLastName}
                    />

                    <Input
                      label="Vorname Elternteil *"
                      name="parentFirstName"
                      autoComplete="given-name"
                      value={formData.parentFirstName}
                      onChange={handleChange}
                      error={errors.parentFirstName}
                    />

                    <Input
                      label="E-Mail *"
                      name="parentEmail"
                      type="email"
                      autoComplete="email"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      error={errors.parentEmail}
                    />

                    <Input
                      label="Telefon *"
                      name="parentPhone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      error={errors.parentPhone}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      className={`${primaryButton} sm:max-w-64`}
                    >
                      Weiter
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-center text-lg text-white/90">
                      Daten des Kindes / Teilnehmers
                    </h2>

                    {selectedCamp && (
                      <p className="mt-3 text-center text-sm leading-6 text-white/65">
                        {selectedCamp.location} –{" "}
                        {selectedCamp.date}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                      label="Nachname Kind *"
                      name="childLastName"
                      value={formData.childLastName}
                      onChange={handleChange}
                      error={errors.childLastName}
                    />

                    <Input
                      label="Vorname Kind *"
                      name="childFirstName"
                      value={formData.childFirstName}
                      onChange={handleChange}
                      error={errors.childFirstName}
                    />

                    <BirthDateField
                      value={formData.birthDate}
                      startDate={
                        selectedCamp?.startDate ?? ""
                      }
                      onChange={changeBirthDate}
                      error={errors.birthDate}
                      disabled={isSending}
                    />

                    <Input
                      label="Notfall-Nr. *"
                      name="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      error={errors.emergencyPhone}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      className={secondaryButton}
                    >
                      Zurück
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      className={primaryButton}
                    >
                      Weiter
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  {selectedCamp && (
                    <div className="rounded-xl border border-[#afd63f]/30 bg-[#afd63f]/5 p-5">
                      <h2 className="font-semibold text-[#afd63f]">
                        Ihre Anmeldung
                      </h2>

                      <p className="mt-3 font-medium">
                        {selectedCamp.title}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-white/90">
                        {selectedCamp.location} –{" "}
                        {selectedCamp.date}
                      </p>

                      <p className="mt-4 text-sm leading-6">
                        Teilnehmer:{" "}
                        {formData.childFirstName}{" "}
                        {formData.childLastName}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-white/80">
                        Geburtsdatum:{" "}
                        {formData.birthDate
                          .split("-")
                          .reverse()
                          .join(".")}
                      </p>

                      <p className="mt-3 break-all text-sm leading-6 text-white/80">
                        E-Mail: {formData.parentEmail}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setErrors({});
                          setSubmitError("");
                          setStep(1);
                        }}
                        className="mt-3 rounded-sm text-sm text-[#afd63f] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      >
                        Angaben ändern
                      </button>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-sm"
                    >
                      Anmerkungen / Wünsche
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      maxLength={5000}
                      value={formData.notes}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Anmerkungen / Wünsche"
                    />
                  </div>

                  <div>
                    <div className="flex gap-3">
                      <input
                        id="agb"
                        name="agb"
                        type="checkbox"
                        required
                        checked={formData.agb}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.agb)}
                        aria-describedby={
                          errors.agb
                            ? "agb-error"
                            : undefined
                        }
                        className="mt-1 size-4 shrink-0 accent-[#afd63f]"
                      />

                      <label
                        htmlFor="agb"
                        className="text-sm/6 text-white/90"
                      >
                        Ich habe die{" "}
                        <a
                          href="/agb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#afd63f] underline underline-offset-4"
                        >
                          AGB
                          <span className="sr-only">
                            {" "}
                            (öffnet in einem neuen Tab)
                          </span>
                        </a>{" "}
                        gelesen und akzeptiere diese.
                      </label>
                    </div>

                    <ErrorMessage
                      name="agb"
                      error={errors.agb}
                    />
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-400 bg-red-500/10 p-5 text-center"
                    >
                      <p className="font-bold text-red-300">
                        Fehler beim Senden
                      </p>

                      <p className="mt-2 text-sm leading-7">
                        {submitError}
                      </p>
                    </div>
                  )}

                  <div className="grid gap-4 pt-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      className={secondaryButton}
                    >
                      Zurück
                    </button>

                    <button
                      type="submit"
                      disabled={isSending}
                      className={primaryButton}
                    >
                      {isSending
                        ? "Wird gesendet..."
                        : "Anmelden"}
                    </button>
                  </div>
                </div>
              )}
            </fieldset>
          </>
        )}
      </form>
    </section>
  );
}

function BirthDateField({
  value,
  startDate,
  onChange,
  error,
  disabled,
}: {
  value: string;
  startDate: string;
  onChange: (value: string) => void;
  error?: string;
  disabled: boolean;
}) {
  const [year = "", month = "", day = ""] =
    value.split("-");

  const campYear = Number(startDate.slice(0, 4));

  const years =
    Number.isInteger(campYear) && campYear > 0
      ? Array.from(
          { length: 11 },
          (_, index) => String(campYear - 8 - index),
        )
      : [];

  const daysInMonth = month
    ? new Date(
        Date.UTC(
          Number(year) || 2000,
          Number(month),
          0,
        ),
      ).getUTCDate()
    : 31;

  function changePart(
    part: "day" | "month" | "year",
    nextValue: string,
  ) {
    const parts = {
      year,
      month,
      day,
      [part]: nextValue,
    };

    if (parts.day && parts.month) {
      const maximumDay = new Date(
        Date.UTC(
          Number(parts.year) || 2000,
          Number(parts.month),
          0,
        ),
      ).getUTCDate();

      if (Number(parts.day) > maximumDay) {
        parts.day = "";
      }
    }

    onChange(
      `${parts.year}-${parts.month}-${parts.day}`,
    );
  }

  const describedBy = error
    ? "birthDate-hint birthDate-error"
    : "birthDate-hint";

  return (
    <fieldset
      className="min-w-0"
      aria-describedby={describedBy}
    >
      <legend className="mb-2 text-sm">
        Geburtsdatum *
      </legend>

      <div className="grid grid-cols-[0.8fr_1.4fr_1fr] gap-2">
        <StyledSelect
          id="birth-day"
          label="Geburtstag: Tag"
          placeholder="Tag"
          value={day}
          onChange={(next) => changePart("day", next)}
          options={Array.from(
            { length: daysInMonth },
            (_, index) => ({
              value: String(index + 1).padStart(2, "0"),
              label: String(index + 1),
            }),
          )}
          disabled={disabled}
          error={Boolean(error)}
          describedBy={describedBy}
          compact
        />

        <StyledSelect
          id="birth-month"
          label="Geburtstag: Monat"
          placeholder="Monat"
          value={month}
          onChange={(next) => changePart("month", next)}
          options={germanMonths.map((label, index) => ({
            value: String(index + 1).padStart(2, "0"),
            label,
          }))}
          disabled={disabled}
          error={Boolean(error)}
          describedBy={describedBy}
          compact
        />

        <StyledSelect
          id="birth-year"
          label="Geburtstag: Jahr"
          placeholder="Jahr"
          value={year}
          onChange={(next) => changePart("year", next)}
          options={years.map((item) => ({
            value: item,
            label: item,
          }))}
          disabled={disabled}
          error={Boolean(error)}
          describedBy={describedBy}
          compact
        />
      </div>

      <p
        id="birthDate-hint"
        className="mt-2 text-xs leading-5 text-white/65"
      >
        Am ersten Camptag: 8 bis 17 Jahre.
        Ein 18. Geburtstag während des Camps ist erlaubt.
      </p>

      <ErrorMessage
        name="birthDate"
        error={error}
      />
    </fieldset>
  );
}

function StyledSelect({
  id,
  label,
  placeholder,
  value,
  onChange,
  options,
  disabled = false,
  error = false,
  describedBy,
  compact = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  error?: boolean;
  describedBy?: string;
  compact?: boolean;
}) {
  const selected = options.find(
    (option) => option.value === value,
  );

  return (
    <Listbox
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <div className="relative min-w-0">
        <ListboxButton
          id={id}
          type="button"
          aria-label={`${label}: ${
            selected?.label ?? placeholder
          }`}
          aria-invalid={error}
          aria-describedby={describedBy}
          className={`${inputStyle} relative text-left ${
            compact ? "px-2.5 pr-7" : "pr-12"
          }`}
        >
          <span className="block min-w-0">
            <span
              className={`block ${
                compact
                  ? "truncate text-sm"
                  : "text-sm font-semibold"
              } ${
                selected
                  ? "text-white"
                  : "text-white/65"
              }`}
            >
              {selected?.label ?? placeholder}
            </span>

            {!compact && selected?.description && (
              <span className="mt-1 block text-xs text-white/70">
                {selected.description}
              </span>
            )}
          </span>

          <ChevronDownIcon
            aria-hidden="true"
            className={`absolute top-1/2 -translate-y-1/2 text-[#afd63f] ${
              compact
                ? "right-2 size-4"
                : "right-4 size-5"
            }`}
          />
        </ListboxButton>

        <ListboxOptions
          className={`absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-[#afd63f]/40 bg-[#171717] text-white shadow-2xl outline-none ${
            compact ? "p-1" : "p-2"
          }`}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={`relative cursor-pointer select-none rounded-lg text-white data-[focus]:bg-[#165201] data-[selected]:bg-[#afd63f] data-[selected]:text-black ${
                compact
                  ? "px-2 py-2.5 text-sm"
                  : "px-4 py-3 pr-11"
              }`}
            >
              {({ selected: isSelected }) => (
                <>
                  <span className="block text-sm">
                    {option.label}
                  </span>

                  {option.description && (
                    <span className="mt-1 block text-xs opacity-80">
                      {option.description}
                    </span>
                  )}

                  {!compact && isSelected && (
                    <CheckIcon
                      aria-hidden="true"
                      className="absolute right-3 top-3.5 size-5"
                    />
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

function StepIndicator({ step }: { step: number }) {
  const labels = [
    "Camp & Eltern",
    "Teilnehmer",
    "Abschluss",
  ];

  return (
    <ol
      aria-label="Anmeldeschritte"
      className="mb-10 flex"
    >
      {labels.map((label, index) => {
        const number = index + 1;

        return (
          <li
            key={label}
            aria-current={
              step === number ? "step" : undefined
            }
            className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center"
          >
            <span
              aria-hidden="true"
              className={`flex size-11 items-center justify-center rounded-full font-bold ${
                step >= number
                  ? "bg-[#afd63f] text-black"
                  : "border border-white/20 bg-white/5 text-white/80"
              }`}
            >
              {number}
            </span>

            <span className="text-xs leading-5 text-white/90">
              <span className="sr-only">
                Schritt {number}:{" "}
              </span>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function ErrorMessage({
  name,
  error,
}: {
  name: string;
  error?: string;
}) {
  if (!error) return null;

  return (
    <p
      id={`${name}-error`}
      role="alert"
      className="mt-2 text-sm text-red-300"
    >
      {error}
    </p>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  autoComplete = "off",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: FieldChangeEvent) => void;
  error?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-2 block text-sm"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        maxLength={200}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${name}-error` : undefined
        }
        className={inputStyle}
      />

      <ErrorMessage
        name={name}
        error={error}
      />
    </div>
  );
}