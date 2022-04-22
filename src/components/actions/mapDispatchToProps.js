export const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    setFullDuration: payload =>
      dispatch({type: 'FULL_DURATION', payload: payload}),
    setTrackDuration: payload =>
      dispatch({type: 'TRACK_DURATION', payload: payload}),
    // time: payload => dispatch({type: 'TIME', payload: payload}),
    setStartTime: payload => dispatch({type: 'TIME', payload: payload}),
    setPosition: payload => dispatch({type: 'POSITION', payload: payload}),
    setRate: payload => dispatch({type: 'RATE', payload: payload}),
    setGrowth: payload => dispatch({type: 'GROWTH', payload: payload}),
    setLoaded: payload => dispatch({type: 'LOADED', payload: payload}),
    setTarget: payload => dispatch({type: 'TARGET', payload: payload}),
    setCounterA: payload => dispatch({type: 'A', payload: payload}),
    setCounterB: payload => dispatch({type: 'A', payload: payload}),
    setUrl: payload => dispatch({type: 'CURRENT_URL', payload: payload}),
    setDropdownQueue: payload =>
      dispatch({type: 'DROPDOWN_QUEUE', payload: payload}),
    openSettings: payload => dispatch({type: 'SETTINGS', payload: payload}),
    setAlbumHistory: payload =>
      dispatch({type: 'ALBUM_HISTORY', payload: payload}),
    setQueue: payload => dispatch({type: 'QUEUE', payload: payload}),
    setCurrentTrack: payload =>
      dispatch({type: 'CURRENT_TRACK', payload: payload}),
    setTitle: payload => dispatch({type: 'TITLE', payload: payload}),
    setArtist: payload => dispatch({type: 'ARTIST', payload: payload}),
    setAlbum: payload => dispatch({type: 'ALBUM', payload: payload}),
    setPlayback: payload => dispatch({type: 'PLAYBACK', payload: payload}),
    setSpeedRamp: payload => dispatch({type: 'SPEED_RAMP', payload: payload}),
    setSpeedFactor: payload =>
      dispatch({type: 'SPEED_FACTOR', payload: payload}),
    setUniversalSpeed: payload =>
      dispatch({type: 'UNIVERSAL_SPEED', payload: payload}),
    setAlbumArtist: payload =>
      dispatch({type: 'ALBUM_ARTIST', payload: payload}),
    setLastPlaybackTime: payload =>
      dispatch({type: 'LAST_PLAYBACK', payload: payload}),
  };
};
