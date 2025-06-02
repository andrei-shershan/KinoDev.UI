import { PORTALS_TYPES } from "../constants/portalTypes";
import { adminMenuItems } from "../settings/admin-menu-items";
import { clientMenuItems } from "../settings/client-menu-items";

export const getMenuItems = (portalType: PORTALS_TYPES) => {
  switch (portalType) {
    case PORTALS_TYPES.CLIENT:
      return clientMenuItems;
    case PORTALS_TYPES.ADMIN:
      return adminMenuItems;
    default:
      return [];
  }
}