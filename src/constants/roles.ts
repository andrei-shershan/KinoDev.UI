export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
} as const;

export type RoleKeys = keyof typeof ROLES;