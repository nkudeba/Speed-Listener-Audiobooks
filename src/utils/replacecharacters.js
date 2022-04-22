export function replacecharacters(baddata) {
  return baddata
    .replace(/\//g, '')
    .replace('-', '')
    .replace(/\\n/g, '\\n')
    .replace(/\\&/g, '\\&')
    .replace(/\\r/g, '\\r')
    .replace(/\\t/g, '\\t')
    .replace(/\\b/g, '\\b')
    .replace(/\\f/g, '\\f');
}
