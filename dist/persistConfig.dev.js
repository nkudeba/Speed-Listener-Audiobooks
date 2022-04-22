"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxPersist = require("redux-persist");

var _themeReducer = _interopRequireDefault(require("./src/components/actions/themeReducer"));

var _react = require("redux-persist/integration/react");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _counter = require("./src/components/actions/counter");

var _dispatchTime = require("./src/components/actions/dispatchTime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import {store, persistor} from './store'
var persistConfig = {
  key: 'root',
  storage: _asyncStorage["default"]
};
var rootReducer = (0, _redux.combineReducers)({
  themeReducer: _themeReducer["default"],
  counterA: (0, _dispatchTime.dispatchTime)('A'),
  duration: (0, _dispatchTime.dispatchTime)('FULL_DURATION'),
  trackDuration: (0, _dispatchTime.dispatchTime)('TRACK_DURATION'),
  currentUrl: (0, _dispatchTime.dispatchTime)('CURRENT_URL'),
  startTime: (0, _dispatchTime.dispatchTime)('TIME'),
  settingsBar: (0, _dispatchTime.dispatchTime)('SETTINGS', false),
  albumHistory: (0, _dispatchTime.dispatchTime)('ALBUM_HISTORY'),
  loaded: (0, _dispatchTime.dispatchTime)('LOADED', false),
  queue: (0, _dispatchTime.dispatchTime)('QUEUE'),
  position: (0, _dispatchTime.dispatchTime)('POSITION'),
  dropdownQueue: (0, _dispatchTime.dispatchTime)('DROPDOWN_QUEUE'),
  currentTrack: (0, _dispatchTime.dispatchTime)('CURRENT_TRACK', 'a'),
  rate: (0, _dispatchTime.dispatchTime)('RATE', 1),
  target: (0, _dispatchTime.dispatchTime)('TARGET', 5),
  growth: (0, _dispatchTime.dispatchTime)('GROWTH', 1 / 2000),
  title: (0, _dispatchTime.dispatchTime)('TITLE', 'Untitled'),
  artist: (0, _dispatchTime.dispatchTime)('ARTIST', 'Unknown'),
  album: (0, _dispatchTime.dispatchTime)('ALBUM', 'Unknown'),
  speedRamp: (0, _dispatchTime.dispatchTime)('SPEED_RAMP', true),
  speedFactor: (0, _dispatchTime.dispatchTime)('SPEED_FACTOR', true),
  universalSpeed: (0, _dispatchTime.dispatchTime)('UNIVERSAL_SPEED', true),
  playback: (0, _dispatchTime.dispatchTime)('PLAYBACK', 'paused'),
  lastPlayback: (0, _dispatchTime.dispatchTime)('LAST_PLAYBACK', 'paused'),
  albumArtist: (0, _dispatchTime.dispatchTime)('ALBUM_ARTIST', 'Unknown'),
  count: _counter.counter
});
var persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, rootReducer);

var _default = function _default() {
  var store = (0, _redux.createStore)(persistedReducer, (0, _redux.applyMiddleware)(_reduxThunk["default"]));
  var persistor = (0, _reduxPersist.persistStore)(store);
  return {
    store: store,
    persistor: persistor
  };
};

exports["default"] = _default;