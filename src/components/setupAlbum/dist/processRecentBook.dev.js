"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processRecentBook = processRecentBook;

var _setQueue = require("./setQueue");

var _setAlbumHistory = _interopRequireDefault(require("./setAlbumHistory"));

var _reactNativeTrackPlayer = _interopRequireDefault(require("react-native-track-player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function processRecentBook(albumtracks, albumartist, props, retrievedindex, trackposition) {
  var savedposition;
  return regeneratorRuntime.async(function processRecentBook$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('THE TRACK POSITION IN PROCESS_RECENT_BOOK');
          console.log(trackposition);
          savedposition = trackposition ? trackposition : 0;

          _reactNativeTrackPlayer["default"].setupPlayer();

          console.log('ADDING TRACKS below from processRecentBook');
          console.log(albumtracks);
          _context.next = 8;
          return regeneratorRuntime.awrap(_reactNativeTrackPlayer["default"].add(albumtracks).then((0, _setQueue.setQueue)(props, albumtracks)));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap((0, _setAlbumHistory["default"])(albumtracks, props));

        case 10:
          _reactNativeTrackPlayer["default"].skip(retrievedindex);

          _reactNativeTrackPlayer["default"].seekTo(savedposition);

          console.log('seeked to ' + savedposition + ' from processRecentBook');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}