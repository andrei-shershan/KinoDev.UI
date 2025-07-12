import { ROUTES } from "../constants/routes";
import { MainMenuType } from "../models/menu";

export const clientMenuItems: MainMenuType[] = [
  {
    key: '/',
    label: 'KinoDev',
    path: '/',
  },
  {
    key: `/${ROUTES.SHOWING}`,
    label: 'Now in Cinema',
    path: `/${ROUTES.SHOWING}`,
  },
  {
    key: `/${ROUTES.ABOUT}`,
    label: 'About',
    path: `/${ROUTES.ABOUT}`,
  },
  {
    key: `/${ROUTES.TICKETS}`,
    label: 'Tickets',
    path: `/${ROUTES.TICKETS}`,
  },
];