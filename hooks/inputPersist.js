import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export function inputPersist(key) {
  const [value, setValue] = useState();

  function readItem() {
    AsyncStorage.getItem(key).then(itemValue => setValue(itemValue));
  }

  useEffect(readItem, []);

  function handleChangeText(input) {
    AsyncStorage.setItem(key, input);
    setValue(input);
  }

  return {
    value,
    onChangeText: handleChangeText,
  };
}
