const formatDateToLong = (d: Date): string => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d.getDate()}, ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatDateTime = (date: string | number | Date): string => {
  const d = new Date(date);
  return formatDateToLong(d) + ' ' + d.toLocaleTimeString('en-US', { hour12: false });
};

interface DateTimeObject {
  date: string;
  time: string;
}

export const getDateTimeObject = (date: string | number | Date): DateTimeObject => {
  const d = new Date(date);
  return {
    date: formatDateToLong(d),
    time: d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  };
};
