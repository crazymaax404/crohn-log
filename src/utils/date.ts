const MONTH_NAMES_PT_BR = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

function pad2(value: number): string {
  return value.toString().padStart(2, '0');
}

export function dateToISODate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function isoDateToDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function todayISODate(): string {
  return dateToISODate(new Date());
}

export function formatBRDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

export function formatFullDate(isoDate: string): string {
  const date = isoDateToDate(isoDate);
  return `${date.getDate()} de ${MONTH_NAMES_PT_BR[date.getMonth()]} de ${date.getFullYear()}`;
}

export function formatShortDate(isoDate: string): string {
  const date = isoDateToDate(isoDate);
  return `${date.getDate()} de ${MONTH_NAMES_PT_BR[date.getMonth()]}`;
}

export function formatGroupHeader(isoDate: string): string {
  const today = todayISODate();
  if (isoDate === today) {
    return `Hoje — ${formatShortDate(isoDate)}`;
  }

  const yesterday = dateToISODate(new Date(Date.now() - 24 * 60 * 60 * 1000));
  if (isoDate === yesterday) {
    return `Ontem — ${formatShortDate(isoDate)}`;
  }

  return formatShortDate(isoDate);
}

export function formatTime(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}
