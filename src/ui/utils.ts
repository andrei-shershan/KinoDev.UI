import { SizeType, StyleType } from "./types";

export const getStyleClass = (
  initClass: string,
  styleType?: StyleType,
  sizeType?: SizeType) => {
  return `${initClass} ${getClassNameByStyleType(styleType)} ${getClassNameBySizeStyle(sizeType)}`;
}

export const getClassNameBySizeStyle = (size?: SizeType) => {
  switch (size) {
    case SizeType.Small:
      return "kd-small";
    case SizeType.Large:
      return "kd-large";
    case SizeType.Medium:
    default:
      return "kd-medium";
  }
}

export const getClassNameByStyleType = (type?: StyleType) => {
  switch (type) {
    case StyleType.Primary:
      return "kd-primary";
    case StyleType.Danger:
      return "kd-danger";
    case StyleType.None:
      return 'kd-none';
    default:
      return '';
  }
}