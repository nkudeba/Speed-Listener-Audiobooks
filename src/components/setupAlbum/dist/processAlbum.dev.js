"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processAlbum = processAlbum;

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _mapandsort = require("./mapandsort");

var _getTrackIndex = require("../../utils/getTrackIndex");

var _setQueue = require("./setQueue");

var _setCurrentTrack = require("./setCurrentTrack");

var _reactNativeTrackPlayer = _interopRequireDefault(require("react-native-track-player"));

var _setAlbumHistory = _interopRequireDefault(require("./setAlbumHistory"));

var _tryparse = _interopRequireDefault(require("../../utils/tryparse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function processAlbum(albumtracks, albumartist, props) {
  var sortedalbums, savedid, retrievedindex;
  return regeneratorRuntime.async(function processAlbum$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _mapandsort.mapandsort)(albumtracks, props));

        case 2:
          sortedalbums = _context2.sent;
          console.log('SORTED ALBUMS');
          console.log(sortedalbums);

          _reactNativeTrackPlayer["default"].add(sortedalbums); // console.log(albumtracks);


          _context2.next = 8;
          return regeneratorRuntime.awrap(_asyncStorage["default"].getItem(albumartist));

        case 8:
          savedid = _context2.sent;
          // This should work with retrievedalbums
          retrievedindex = savedid == null ? 0 : (0, _getTrackIndex.getTrackIndex)(savedid, sortedalbums)[0].index;

          _asyncStorage["default"].getItem(sortedalbums[retrievedindex].url).then(function _callee(item) {
            var playbackRate;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log('this is what is stored');
                    console.log(item);
                    console.log('position stored in item');
                    item == null ? props.setPosition(0) : JSON.parse(item).position ? props.setPosition(JSON.parse(item).position) : props.setPosition(0);

                    if (!(!props.universalSpeed && item != null)) {
                      _context.next = 15;
                      break;
                    }

                    console.log('tracks using unique speed');
                    console.log('setting playback speed to last speed of book');
                    _context.next = 9;
                    return regeneratorRuntime.awrap((0, _tryparse["default"])(item).playbackRate);

                  case 9:
                    playbackRate = _context.sent;
                    console.log(playbackRate);
                    _context.next = 13;
                    return regeneratorRuntime.awrap(_reactNativeTrackPlayer["default"].setRate(playbackRate));

                  case 13:
                    _context.next = 15;
                    return regeneratorRuntime.awrap(props.setRate(playbackRate));

                  case 15:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

          sortedalbums[retrievedindex].title ? props.setTitle(sortedalbums[retrievedindex].title) : props.setTitle('Untitled');
          sortedalbums[retrievedindex].starttime ? props.setStartTime(sortedalbums[retrievedindex].starttime) : props.setStartTime(0);
          console.log('Just set artist from reSortAlbums as ' + sortedalbums[retrievedindex].artist);
          sortedalbums[retrievedindex].duration ? props.setTrackDuration(sortedalbums[retrievedindex].duration) : props.setTrackDuration(0);
          sortedalbums[retrievedindex].url ? props.setUrl(sortedalbums[retrievedindex].url) : null; // await ResortAlbums(promises2, sortedalbums, retrievedindex, props);

          _context2.next = 18;
          return regeneratorRuntime.awrap((0, _setQueue.setQueue)(props, sortedalbums));

        case 18:
          _context2.next = 20;
          return regeneratorRuntime.awrap((0, _setCurrentTrack.setCurrentTrack)(retrievedindex, props, sortedalbums));

        case 20:
          _context2.next = 22;
          return regeneratorRuntime.awrap((0, _setAlbumHistory["default"])(sortedalbums, props).then(props.setLoaded(true)));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  });
}