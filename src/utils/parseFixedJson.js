import {tryparse} from './tryparse';
import {replacecharacters} from './replacecharacters';

export function parseFixedJson(data) {
  var fixedtrack = data ? replacecharacters(data) : null;
  return data ? tryparse(fixedtrack) : null;
}
