import { URLS } from "../constants/urls";

export const getFileUrl = (fileUrl: string): string => {
  if(fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    return fileUrl; // Return the full URL if it starts with http or https
  }
  else {
    return `${URLS.PUBLIC_IMAGES_HOST}/${URLS.PUBLIC_IMAGES_STORE_ACCOUNT}/${fileUrl}`; // Construct the full URL using the base URL
  }
}