export const AUTHENTICATION = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token"
} as const;

export type AuthenticationKeys = keyof typeof AUTHENTICATION;
