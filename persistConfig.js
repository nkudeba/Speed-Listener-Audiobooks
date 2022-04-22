import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import themeReducer from './src/components/actions/themeReducer';
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {counter} from './src/components/actions/counter';
import {dispatchTime} from './src/components/actions/dispatchTime';

// import {store, persistor} from './store'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  themeReducer,
  counterA: dispatchTime('A'),
  duration: dispatchTime('FULL_DURATION'),
  trackDuration: dispatchTime('TRACK_DURATION'),
  currentUrl: dispatchTime('CURRENT_URL'),
  startTime: dispatchTime('TIME'),
  settingsBar: dispatchTime('SETTINGS', false),
  albumHistory: dispatchTime('ALBUM_HISTORY'),
  loaded: dispatchTime('LOADED', false),
  queue: dispatchTime('QUEUE'),
  position: dispatchTime('POSITION'),
  dropdownQueue: dispatchTime('DROPDOWN_QUEUE'),
  currentTrack: dispatchTime('CURRENT_TRACK', 'a'),
  rate: dispatchTime('RATE', 1),
  target: dispatchTime('TARGET', 5),
  growth: dispatchTime('GROWTH', 1 / 2000),
  title: dispatchTime('TITLE', 'Untitled'),
  artist: dispatchTime('ARTIST', 'Unknown'),
  album: dispatchTime('ALBUM', 'Unknown'),
  speedRamp: dispatchTime('SPEED_RAMP', true),
  speedFactor: dispatchTime('SPEED_FACTOR', true),
  universalSpeed: dispatchTime('UNIVERSAL_SPEED', true),
  playback: dispatchTime('PLAYBACK', 'paused'),
  lastPlayback: dispatchTime('LAST_PLAYBACK', 'paused'),
  albumArtist: dispatchTime('ALBUM_ARTIST', 'Unknown'),
  count: counter,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
