import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {ButtonAction} from './ButtonAction';
import {useSelector, useDispatch, connect} from 'react-redux';
import {mapDispatchToProps} from './mapDispatchToProps';

export function RenderItem(props) {
  // console.log('render item Props');
  // console.log(props);
  // console.log('props items:');
  // console.log(props.item);
  // const dispatchs = useDispatch();
  // this.props.theme.BACKGROUND_COLOR
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.theme.BACKGROUND_COLOR,
        elevation: 8,
      }}
      onPress={() => {
        ButtonAction(props.navigation, props.item, props);
      }}>
      <Text
        style={{
          fontSize: 16,
          color: props.theme.TEXT_COLOR,
          // position: 'absolute',
          // left: '5%',
          alignSelf: 'center',
        }}>
        {props.item.album}
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: props.theme.TEXT_COLOR,
          borderColor: 'black',
          borderRadius: 30,
          // position: 'absolute',
          // left: '5%',
          alignSelf: 'center',
          paddingBottom: 10,
        }}>
        {props.item.author}
        <View
          style={{
            width: '100%',
            backgroundColor: 'black',
            height: 0.5,
            position: 'absolute',
            borderRadius: 30,
          }}></View>
      </Text>
    </TouchableOpacity>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    theme: state.themeReducer.theme,
    position: state.position,
    duration: state.duration,
    universalSpeed: state.universalSpeed,
    trackDuration: state.trackDuration,
    startTime: state.startTime,
    queue: state.queue,
    currentTrack: state.currentTrack,
    currentUrl: state.currentUrl,
    albumHistory: state.albumHistory,
    rate: state.rate,
    growth: state.growth,
    target: state.target,
    loaded: state.loaded,
    dropdownQueue: state.dropdownQueue,
    settingsBar: state.settingsBar,
    title: state.title,
    artist: state.artist,
    album: state.album,
    speedRamp: state.speedRamp,
    playback: state.playback,
    albumArtist: state.albumArtist,
  };
}

export const ConnectedRender = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenderItem);
