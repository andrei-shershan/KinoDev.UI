export const PORTALS = {
  ADMIN: 'admin'

} as const;

export type PortalKeys = keyof typeof PORTALS;