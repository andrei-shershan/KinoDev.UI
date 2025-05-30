export const getDateWithTime = (date: Date, hour: number, minute: number): Date => {
  const newDate = new Date(date);
  newDate.setHours(hour, minute, 0, 0);
  return newDate;
}