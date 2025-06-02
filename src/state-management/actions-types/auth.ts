import { AUTH_ACTIONS_CONSTS } from "../action-constants/auth";

export type AuthActionTypes =
  | { type: typeof AUTH_ACTIONS_CONSTS.SET_ACCESS_TOKEN; payload: string }
  | { type: typeof AUTH_ACTIONS_CONSTS.CLEAR_AUTH };