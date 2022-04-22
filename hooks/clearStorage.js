import AsyncStorage from '@react-native-community/async-storage';

export async function clearStorage() {
  try {
    await AsyncStorage.clear();
    alert('Storage successfully cleared!');
  } catch (e) {
    alert('Failed to clear the async storage.');
  }
}
