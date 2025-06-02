export const classNameAdjusted = (className: string, condition: boolean, adjustment: string) => {
  if (condition) {
    return `${className} ${className}.${adjustment}`;
  }

  return className;
}