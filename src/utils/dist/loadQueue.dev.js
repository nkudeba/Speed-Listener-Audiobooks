"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadQueue = loadQueue;

var _reactNativeTrackPlayer = _interopRequireWildcard(require("react-native-track-player"));

var _setStartPos = _interopRequireDefault(require("./setStartPos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function loadQueue(queue, currentTrack, rate, position) {
  if (queue != null) {
    _reactNativeTrackPlayer["default"].reset();

    console.log('props queue on loadQueue'); // console.log(queue);

    console.log(queue);

    _reactNativeTrackPlayer["default"].setupPlayer({
      minBuffer: 180,
      maxBuffer: 300,
      backBuffer: 120
    });

    _reactNativeTrackPlayer["default"].updateOptions({
      stopWithApp: true,
      alwaysPauseOnInterruption: true,
      capabilities: [_reactNativeTrackPlayer.Capability.Play, _reactNativeTrackPlayer.Capability.Pause, _reactNativeTrackPlayer.Capability.SeekTo, _reactNativeTrackPlayer.Capability.SkipToNext, _reactNativeTrackPlayer.Capability.SkipToPrevious, _reactNativeTrackPlayer.Capability.PlayFromId, _reactNativeTrackPlayer.Capability.PlayFromSearch, _reactNativeTrackPlayer.Capability.JumpForward, _reactNativeTrackPlayer.Capability.JumpBackward, _reactNativeTrackPlayer.Capability.Stop],
      compactCapabilities: [_reactNativeTrackPlayer.Capability.Play, _reactNativeTrackPlayer.Capability.Pause, _reactNativeTrackPlayer.Capability.JumpBackward, _reactNativeTrackPlayer.Capability.JumpForward],
      notificationCapabilities: [_reactNativeTrackPlayer.Capability.Play, _reactNativeTrackPlayer.Capability.Pause, _reactNativeTrackPlayer.Capability.JumpBackward, _reactNativeTrackPlayer.Capability.JumpForward],
      forwardJumpInterval: 10,
      backwardJumpInterval: 10
    }); // var parsed = JSON.parse(queue);


    var parsed2 = JSON.parse(queue); // console.log('HOME PARSED');
    // console.log(parsed.queue[0]);
    // console.log(parsed2[0])
    // console.log(parsed.queue[0]);
    // console.log('ADDING TRACKS BELOW FROM LOADQUEUE');
    // console.log(parsed2);
    // console.log(parsed2[0].album);

    _reactNativeTrackPlayer["default"].add(parsed2);

    try {
      if (typeof currentTrack == 'number') {
        console.log('MY INDEX AT');
        console.log(currentTrack);

        _reactNativeTrackPlayer["default"].skip(JSON.parse(currentTrack));
      } else {
        console.log('CURRENT TRACK NOT LOADED');

        _reactNativeTrackPlayer["default"].skip(0);
      }
    } catch (e) {
      console.log(e);
    }

    _reactNativeTrackPlayer["default"].setRate(rate);

    _reactNativeTrackPlayer["default"].seekTo(position); // console.log('ADDED FROM HOMESCREEN.JS');

  } else {
    console.log('QUEUE NOT LOADED');
  }
}