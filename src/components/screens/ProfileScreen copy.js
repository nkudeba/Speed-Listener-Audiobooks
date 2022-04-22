import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {clearStorage} from '../../../hooks/clearStorage';
import {inputPersist} from '../../../hooks/inputPersist';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles/styles';
import {useSelector, useDispatch, connect} from 'react-redux';
import {switchTheme} from '../actions/themeActions';
import {lightTheme, darkTheme} from '../styles/themes';

export function ProfileScreen() {
  const {colors} = useTheme();
  // in class component, useSelector() is mapStateToProps and useDispatch() is mapDispatchToProps()
  const theme = useSelector(state => state.themeReducer.theme);
  const pretheme = useSelector(state => state.count);
  const duration = useSelector(state => state.duration);
  // console.log('theme: ');
  // console.log(theme);
  // console.log('pretheme');
  // console.log(pretheme);
  // console.log('duration');
  // console.log(duration);
  const testduration = 12;
  const styles2 = StyleSheet.create({
    mainStyle: {
      color: theme.HIGHLIGHT_COLOR,
    },
  });
  const dispatch = useDispatch();
  // console.log('my theme: ');
  // console.log(theme);
  const name = inputPersist('@name');
  let value = 1;
  // console.log(name.value);
  // console.log('COLORS');
  // console.log(colors);

  return (
    <View>
      <TouchableOpacity>
        <Text style={styles2.mainStyle}>Hi</Text>
      </TouchableOpacity>
      <Text>
        {' '}
        {duration} {pretheme}{' '}
      </Text>
      <Button
        title="Increment"
        onPress={() => dispatch({type: 'INCREMENT', payload: testduration})}
      />
      <View style={styles.panel}>
        {theme.mode === 'light' ? (
          <TouchableOpacity onPress={() => dispatch(switchTheme(darkTheme))}>
            <Text>Switch to Dark Theme</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => dispatch(switchTheme(lightTheme))}>
            <Text>Switch to Light Theme</Text>
          </TouchableOpacity>
        )}
        <Text>Enter your name here:</Text>

        <TextInput
          {...name}
          style={styles.input}
          placeholder="What is your name?"
        />
        <Text style={styles.text}>Your name is now {name.value}</Text>
        <Text style={styles.text}>Your value is {value}</Text>

        <TouchableOpacity onPress={clearStorage} style={styles.button}>
          <Text style={styles.buttonText}>Clear Storage</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getKeys} style={styles.button}>
          <Text style={styles.buttonText}>Get All Storage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

async function getKeys() {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({[store[i][0]]: store[i][1]});
        return true;
      });
    });
  });
}
