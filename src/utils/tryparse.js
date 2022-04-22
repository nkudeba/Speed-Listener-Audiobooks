export function tryparse(mydata) {
  try {
    return JSON.parse(mydata);
  } catch (e) {
    console.log('Parse failed for the following data: ');
    console.log(mydata);
    console.log('With Error: ');
    console.log(e);
    return null;
  }
}
