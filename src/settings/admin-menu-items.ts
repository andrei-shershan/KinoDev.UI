import { ROUTES } from "../constants/routes";
import { MainMenuType } from "../models/menu";

export const adminMenuItems: MainMenuType[] = [
  {
    key: '/admin-portal',
    label: 'KinoDev Admin',
    path: '/admin-portal',
  },
  {
    key: `/${ROUTES.ADMIN_PORTAL.MOVIES}`,
    label: 'Movies',
    path: `/${ROUTES.ADMIN_PORTAL.MOVIES}`,
  },
  {
    key: `/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`,
    label: 'Showtimes',
    path: `/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`,
  },
  {
    key: `/${ROUTES.ADMIN_PORTAL.HALLS}`,
    label: 'Halls',
    path: `/${ROUTES.ADMIN_PORTAL.HALLS}`,
  },
];