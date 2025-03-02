export const ROLES = {
  ADMIN: 'Admin'
} as const;

export type RoleKeys = keyof typeof ROLES;