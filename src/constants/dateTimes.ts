export const DATE_TIMES = {
  TODAY: 'Today',
  TOMORROW: 'Tomorrow',
} as const;

export type DateTimesKEys = keyof typeof DATE_TIMES;