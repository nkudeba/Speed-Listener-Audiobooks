import {replacecharacters} from './replacecharacters';

function fixJson(data) {
  return data ? replacecharacters(data) : null;
}
