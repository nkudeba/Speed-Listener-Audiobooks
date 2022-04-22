import * as React from 'react';
import {StatusBar, View, ScrollView} from 'react-native';
import TrackPlayer, {Event} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, connect} from 'react-redux';

function Test() {
  console.log('HI FROM TEST');
  return console.log('Hey yoooo');
}

function HomeScreen() {
  console.log('HI FROM TESTCONNECT');
  //   Test();
  connect(mapStateToProps)(Test);
  return <Test />;
}

function mapStateToProps(state, ownProps) {
  console.log('de theme: ');
  console.log(state);
  console.log(state.themeReducer.theme);
  return {
    theme: state.themeReducer.theme,
    duration: state.duration,
  };
}

export default connect(mapStateToProps)(Test);
