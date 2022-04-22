"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps = void 0;

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // dispatching plain actions
    setFullDuration: function setFullDuration(payload) {
      return dispatch({
        type: 'FULL_DURATION',
        payload: payload
      });
    },
    setTrackDuration: function setTrackDuration(payload) {
      return dispatch({
        type: 'TRACK_DURATION',
        payload: payload
      });
    },
    // time: payload => dispatch({type: 'TIME', payload: payload}),
    setStartTime: function setStartTime(payload) {
      return dispatch({
        type: 'TIME',
        payload: payload
      });
    },
    setPosition: function setPosition(payload) {
      return dispatch({
        type: 'POSITION',
        payload: payload
      });
    },
    setRate: function setRate(payload) {
      return dispatch({
        type: 'RATE',
        payload: payload
      });
    },
    setGrowth: function setGrowth(payload) {
      return dispatch({
        type: 'GROWTH',
        payload: payload
      });
    },
    setLoaded: function setLoaded(payload) {
      return dispatch({
        type: 'LOADED',
        payload: payload
      });
    },
    setTarget: function setTarget(payload) {
      return dispatch({
        type: 'TARGET',
        payload: payload
      });
    },
    setCounterA: function setCounterA(payload) {
      return dispatch({
        type: 'A',
        payload: payload
      });
    },
    setCounterB: function setCounterB(payload) {
      return dispatch({
        type: 'A',
        payload: payload
      });
    },
    setUrl: function setUrl(payload) {
      return dispatch({
        type: 'CURRENT_URL',
        payload: payload
      });
    },
    setDropdownQueue: function setDropdownQueue(payload) {
      return dispatch({
        type: 'DROPDOWN_QUEUE',
        payload: payload
      });
    },
    openSettings: function openSettings(payload) {
      return dispatch({
        type: 'SETTINGS',
        payload: payload
      });
    },
    setAlbumHistory: function setAlbumHistory(payload) {
      return dispatch({
        type: 'ALBUM_HISTORY',
        payload: payload
      });
    },
    setQueue: function setQueue(payload) {
      return dispatch({
        type: 'QUEUE',
        payload: payload
      });
    },
    setCurrentTrack: function setCurrentTrack(payload) {
      return dispatch({
        type: 'CURRENT_TRACK',
        payload: payload
      });
    },
    setTitle: function setTitle(payload) {
      return dispatch({
        type: 'TITLE',
        payload: payload
      });
    },
    setArtist: function setArtist(payload) {
      return dispatch({
        type: 'ARTIST',
        payload: payload
      });
    },
    setAlbum: function setAlbum(payload) {
      return dispatch({
        type: 'ALBUM',
        payload: payload
      });
    },
    setPlayback: function setPlayback(payload) {
      return dispatch({
        type: 'PLAYBACK',
        payload: payload
      });
    },
    setSpeedRamp: function setSpeedRamp(payload) {
      return dispatch({
        type: 'SPEED_RAMP',
        payload: payload
      });
    },
    setSpeedFactor: function setSpeedFactor(payload) {
      return dispatch({
        type: 'SPEED_FACTOR',
        payload: payload
      });
    },
    setUniversalSpeed: function setUniversalSpeed(payload) {
      return dispatch({
        type: 'UNIVERSAL_SPEED',
        payload: payload
      });
    },
    setAlbumArtist: function setAlbumArtist(payload) {
      return dispatch({
        type: 'ALBUM_ARTIST',
        payload: payload
      });
    },
    setLastPlaybackTime: function setLastPlaybackTime(payload) {
      return dispatch({
        type: 'LAST_PLAYBACK',
        payload: payload
      });
    }
  };
};

exports.mapDispatchToProps = mapDispatchToProps;