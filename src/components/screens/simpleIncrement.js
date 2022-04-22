import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {sendDurationPayload} from '../actions/sendDurationPayload';

export function ProfileScreen() {
  // sendDurationPayload(212833222);
  const duration = useSelector(state => state.duration);
  const mydispatch = useDispatch();
  return (
    <View>
      <Text> {duration} </Text>
      <Button
        title="Increment"
        onPress={() => mydispatch({type: 'INCREMENT', payload: 12})}
      />
    </View>
  );
}
