import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

export function SimpleDispatch() {
  const duration = useSelector(state => state.duration);
  const testduration = 1222;
  const dispatch = useDispatch();
  dispatch({type: 'INCREMENT', payload: testduration});

  return 'hi';
}
