"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentTrack = setCurrentTrack;

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _reactNativeTrackPlayer = _interopRequireDefault(require("react-native-track-player"));

var _tryparse = _interopRequireDefault(require("../../utils/tryparse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function setCurrentTrack(retrievedindex, props, albumtracks) {
  var mytrackposition;
  return regeneratorRuntime.async(function setCurrentTrack$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_reactNativeTrackPlayer["default"].skip(retrievedindex));

        case 2:
          console.log('retrievedindex');
          console.log(retrievedindex);
          console.log('albumtracks on setCurrentTrack');
          console.log(albumtracks); // var parsedalbumtracks = JSON.parse(albumtracks);
          // console.log(parsedalbumtracks);

          props.setCurrentTrack(JSON.stringify(retrievedindex));
          console.log('current URL from setCurrentTrack');
          console.log(albumtracks[retrievedindex]);
          _context.next = 11;
          return regeneratorRuntime.awrap(_asyncStorage["default"].getItem(albumtracks[retrievedindex].url).then(function (myitem) {
            console.log('this is what is stored');
            console.log(myitem);
            var trackposition = myitem == null ? 0 : JSON.parse(myitem).position ? JSON.parse(myitem).position : 0; // this.props.setPosition(trackposition);

            return trackposition;
          }));

        case 11:
          mytrackposition = _context.sent;
          console.log('mytrackposition from setCurrentTrack');
          console.log(mytrackposition);
          _context.next = 16;
          return regeneratorRuntime.awrap(_reactNativeTrackPlayer["default"].seekTo(mytrackposition));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}