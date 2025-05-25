import { URLS } from "../constants/urls";

export const getImageSource = (imagePath: string): string => {
  if(imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath; // Return the full URL if it starts with http or https
  }
  else {
    return `${URLS.PUBLIC_IMAGES_HOST}/${URLS.PUBLIC_IMAGES_STORE_ACCOUNT}/${imagePath}`; // Construct the full URL using the base URL
  }
}