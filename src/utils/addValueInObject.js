import {tryparse} from './tryparse';

export async function addValueInObject(object, key, value) {
  var res = {};
  var textObject = JSON.stringify(object);
  if (textObject === '{}') {
    // console.log('PARSING 2 - TEXT OBJECT');
    res = tryparse('{"' + key + '":"' + value + '"}');
  } else {
    // console.log('PARSING 3 - RES');
    res = tryparse(
      '{' +
        textObject.substring(1, textObject.length - 1) +
        ',"' +
        key +
        '":"' +
        value +
        '"}',
    );
    // console.log(res);
  }
  return res;
}
