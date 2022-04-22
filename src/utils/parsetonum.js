import {tryparse} from './tryparse';
import {numbersonly} from './numbersonly';

export function parsetonum(mystring) {
  return tryparse(numbersonly(mystring));
}
