import { DATE_TIMES } from "../constants/dateTimes";

export const getDateWithTime = (date: Date, hour: number, minute: number): Date => {
  const newDate = new Date(date);
  newDate.setHours(hour, minute, 0, 0);
  return newDate;
}

const formatDateToLong = (d: Date): string => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d.getDate()}, ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatDateTime = (date: string | number | Date): string => {
  const d = new Date(date);
  return formatDateToLong(d) + ' ' + d.toLocaleTimeString('en-US', { hour12: false });
};

export const getDateTimeObject = (date: string | number | Date) => {
  const d = new Date(date);
  return {
    date: formatDateToLong(d),
    time: d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  };
};

export const overrideTodayDateName = (date: string) => {
  const today = new Date().toISOString().split('T')[0];

  if (date === today) {
    return DATE_TIMES.TODAY;
  }

  return date;
}