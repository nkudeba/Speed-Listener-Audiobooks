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
  const newtime = useSelector(state => state.counterA);
  const duration = useSelector(state => state.duration);
  const loaded = useSelector(state => state.loaded);
  const currentUrl = useSelector(state => state.currentUrl);
  const currentTrack = useSelector(state => state.currentTrack);
  const rate = useSelector(state => state.rate);
  const albumHistory = useSelector(state => state.albumHistory);
  const albumArtist = useSelector(state => state.albumArtist);
  const queue = useSelector(state => state.queue);
  const artist = useSelector(state => state.artist);
  const album = useSelector(state => state.album);
  // console.log('Album history')
  // console.log(albumHistory);
  // console.log('theme: ');
  // console.log(theme);
  // console.log('pretheme');
  // console.log(pretheme);
  // console.log('newtime');
  // console.log(newtime);
  // console.log('duration');
  // console.log(duration);
  // console.log('Album Artist (Profile)');
  // console.log(albumArtist);
  // console.log('Artist (Profile)');
  // console.log(artist);
  // console.log('album');
  // console.log(album);
  // console.log('Queue (Profile)');
  // console.log(queue);
  const testduration = 27;
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
        {duration} {pretheme} {newtime}
        Current Track: {currentTrack} {'\n'}
        Speed: {rate}
        {'\n'}
        Loaded: {loaded}
        {'\n'}
        Current Url: {currentUrl} {'\n'}
      </Text>
      <Button
        title="Increment"
        onPress={() => dispatch({type: 'INCREMENT', payload: testduration})}
      />
      <Button
        title="Increments"
        onPress={() => dispatch({type: 'INCREMENTS', payload: testduration})}
      />
      <Button
        title="newtime"
        onPress={() => dispatch({type: 'A', payload: testduration})}
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
