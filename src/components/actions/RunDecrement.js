import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {mapDispatchToProps} from './mapDispatchToProps';
import {decrement} from './decrement';
import TrackPlayer from 'react-native-track-player';
export function RenderItem(props) {
  console.log('Decrement Props');
  console.log(props);
  console.log(props.theme);
  console.log(props.rate);
  const dispatch = useDispatch();
  // this.props.theme.BACKGROUND_COLOR
  return (
    <>
      <TouchableOpacity onPress={() => incrementSpeed(props.rate, dispatch)}>
        <Text style={{color: props.theme.ICO_COLORS}}> ▲ </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => decrementSpeed(props.rate, dispatch)}>
        <Text style={{color: props.theme.ICO_COLORS}}> ▼ </Text>
      </TouchableOpacity>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    theme: state.themeReducer.theme,
    rate: state.rate,
  };
}

function decrementSpeed(rate, dispatch) {
  if (rate <= 0.4) {
    dispatch(decrement(0.1));
    TrackPlayer.setRate(0.1);
  }
  if (rate > 0.4) {
    dispatch(decrement(rate - 0.3));
    TrackPlayer.setRate(rate - 0.3);
  }
}

function incrementSpeed(rate, dispatch) {
  if (rate > 7.7) {
    alert(
      'Due to playback limitations, max playback speed is 8x. Setting speed to 8x.',
    );
    dispatch(decrement(8));
    TrackPlayer.setRate(8);
  }
  if (rate <= 7.7) {
    dispatch(decrement(rate + 0.3));
    TrackPlayer.setRate(rate + 0.3);
  }
}

export const RunDecrement = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenderItem);
