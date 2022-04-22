"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonAction = ButtonAction;

var _setupalbum = require("../setupAlbum/setupalbum");

var _setupTrackPlayer = require("../../utils/setupTrackPlayer");

var _reactNativeGetMusicFiles = require("react-native-get-music-files");

var _reactNativeTrackPlayer = _interopRequireDefault(require("react-native-track-player"));

var _BackgroundTimer = _interopRequireDefault(require("../../utils/BackgroundTimer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ButtonAction(navigation, data, props) {
  var myartist, mycover, albumtracks;
  return regeneratorRuntime.async(function ButtonAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_reactNativeTrackPlayer["default"].pause());

        case 2:
          console.log('paused from ButtonAction');
          _context.next = 5;
          return regeneratorRuntime.awrap(props.setPlayback('paused'));

        case 5:
          _BackgroundTimer["default"].stop();

          console.log('progress CLEARED');
          console.log('data');
          console.log(data);
          console.log('artist: ' + data.author);
          console.log('album: ' + data.album);
          myartist = data.author == null ? '' : data.author;
          mycover = data.cover == null ? '' : data.cover;
          _context.next = 15;
          return regeneratorRuntime.awrap(_reactNativeGetMusicFiles.RNAndroidAudioStore.getSongs({
            artist: myartist,
            cover: mycover,
            album: data.album
          }).then(function (albumtracks) {
            return albumtracks;
          }));

        case 15:
          albumtracks = _context.sent;
          console.log('MY albumtracks from ButtonAction');
          console.log(albumtracks);

          if (!(albumtracks === undefined || albumtracks.length == 0)) {
            _context.next = 21;
            break;
          }

          console.log('Album no longer exists');
          return _context.abrupt("return");

        case 21:
          console.log('Going Home');
          console.log(data);
          console.log(data.album);
          _context.t0 = regeneratorRuntime;
          _context.t1 = (0, _setupalbum.setupalbum)(data, albumtracks, props);
          _context.t2 = regeneratorRuntime;
          _context.t3 = (0, _setupTrackPlayer.setupTrackPlayer)();
          _context.next = 30;
          return regeneratorRuntime.awrap(navigation.navigate('Now Playing'));

        case 30:
          _context.t4 = _context.sent;
          _context.t5 = _context.t3.then.call(_context.t3, _context.t4);
          _context.next = 34;
          return _context.t2.awrap.call(_context.t2, _context.t5);

        case 34:
          _context.t6 = _context.sent;
          _context.t7 = _context.t1.then.call(_context.t1, _context.t6);
          _context.next = 38;
          return _context.t0.awrap.call(_context.t0, _context.t7);

        case 38:
        case "end":
          return _context.stop();
      }
    }
  });
}