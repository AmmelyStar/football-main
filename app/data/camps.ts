export type Camp = {
  id: string;
  label: string;
  title: string;
  date: string;
  startDate: string;
  location: string;
  earlyPrice: string;
  earlyDeadline: string;
  regularPrice: string;
  limited: boolean;
  registrationOpen: boolean;
};

export const camps: Camp[] = [
  {
    id: "poysbrunn-2026-12",
    label: "Wintercamp",
    title: "Hallen-Trainingscamp",
    date: "28. – 30. Dezember 2026",
    startDate: "2026-12-28",
    location: "Poysbrunn",
    earlyPrice: "149",
    earlyDeadline: "15. November 2026",
    regularPrice: "179",
    limited: true,
    registrationOpen: true,
  },
  {
    id: "asparn-2027-03",
    label: "Frühjahrscamp",
    title: "Tormann-Trainingscamp",
    date: "20. & 21. März 2027",
    startDate: "2027-03-20",
    location: "Asparn",
    earlyPrice: "125",
    earlyDeadline: "15. Februar 2027",
    regularPrice: "149",
    limited: false,
    registrationOpen: true,
  },
  {
    id: "hohenau-2027-07",
    label: "Sommercamp",
    title: "Tormann-Trainingscamp",
    date: "3. & 4. Juli 2027",
    startDate: "2027-07-03",
    location: "Hohenau",
    earlyPrice: "125",
    earlyDeadline: "1. Juni 2027",
    regularPrice: "149",
    limited: false,
    registrationOpen: true,
  },
];

export function getOpenCamps(): Camp[] {
  return camps.filter((camp) => camp.registrationOpen);
}

export function getCampById(id: string): Camp | undefined {
  return camps.find((camp) => camp.id === id);
}

/**
 * Общая проверка для формы и сервера.
 * Возраст рассчитывается на первый день выбранного лагеря.
 */
export function getBirthDateError(
  birthDate: string,
  campStartDate: string,
): string | null {
  const birth = parseCalendarDate(birthDate);
  const start = parseCalendarDate(campStartDate);

  if (!birth) {
    return "Bitte wählen Sie ein vollständiges, gültiges Geburtsdatum aus.";
  }

  if (!start) {
    return "Bitte wählen Sie zuerst ein gültiges Camp aus.";
  }

  let age = start.year - birth.year;

  if (
    start.month < birth.month ||
    (start.month === birth.month && start.day < birth.day)
  ) {
    age -= 1;
  }

  if (age < 8 || age >= 18) {
    return "Am ersten Camptag muss das Kind mindestens 8 und noch unter 18 Jahre alt sein.";
  }

  return null;
}

function parseCalendarDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (
    year < 1900 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
}