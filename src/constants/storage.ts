export const STORAGE = {
    BOOKING: 'booking',
    ORDER: 'order',
  } as const;
  
  export type StorageKeys = keyof typeof STORAGE;