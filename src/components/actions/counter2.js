import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {styles} from '../../../App';

// A very simple reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
// A very simple store
export let store = createStore(combineReducers({count: counter}));
// A screen!
function Counter({count, dispatch, navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{count}</Text>
      <Button title="Increment" onPress={() => dispatch({type: 'INCREMENT'})} />
      <Button title="Decrement" onPress={() => dispatch({type: 'DECREMENT'})} />

      <Button
        title="Go to static count screen"
        onPress={() => navigation.navigate('StaticCounter')}
      />
    </View>
  );
}
// Another screen!
function StaticCounter({count}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{count}</Text>
    </View>
  );
}
// Connect the screens to Redux
export let CounterContainer = connect(state => ({count: state.count}))(Counter);
export let StaticCounterContainer = connect(state => ({count: state.count}))(
  StaticCounter,
);
