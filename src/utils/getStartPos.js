import AsyncStorage from '@react-native-community/async-storage';

export async function getStartPos(trackurl) {
  return await AsyncStorage.getItem(trackurl).then(value => {
    if (value != null) {
      let newp = JSON.parse(value);
      // console.log('real starting pos: ');
      // console.log(newp.position);
      return newp.position;
    } else {
      return 0;
    }
  });
}
