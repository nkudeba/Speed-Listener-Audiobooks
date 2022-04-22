export function numbersonly(mystring) {
  return Number(mystring.replace(/[^0-9]/g, ''));
}
