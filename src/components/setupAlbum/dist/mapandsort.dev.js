"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapandsort = mapandsort;

var _addValueInObject = require("../../utils/addValueInObject");

var _reactNative = require("react-native");

var _getsortedAlbums = require("./getsortedAlbums");

var _reactNativeMediaMeta = _interopRequireDefault(require("react-native-media-meta"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapandsort(albumtracks, props) {
  var sorted, otherpromises, sortedalbums, fullduration, finalresults;
  return regeneratorRuntime.async(function mapandsort$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // console.log('album track on mapandsort');
          // console.log(albumtracks);
          sorted = [];
          _context2.next = 3;
          return regeneratorRuntime.awrap(albumtracks.map(function _callee(element) {
            var mydetails;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // var newpath = await addValueInObject(path, 'path', element.path);
                    mydetails = {
                      album: element.album,
                      artist: element.artist,
                      title: element.title,
                      type: 'default',
                      duration: element.duration,
                      track: null,
                      id: element.id,
                      url: element.path
                    };
                    sorted.push(mydetails);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 3:
          otherpromises = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap((0, _getsortedAlbums.getsortedAlbums)(otherpromises, sorted));

        case 6:
          sortedalbums = _context2.sent;
          fullduration = sortedalbums.reduce(function (total, obj) {
            return 1 * obj.duration + total;
          }, 0);
          props.setFullDuration(fullduration);
          finalresults = sortedalbums.map(function (result, index) {
            var starttime = 0;

            if (index == 0) {
              starttime = 0;
            } else {
              for (i = 0; i < index; i++) {
                // console.log(index);
                // console.log('indexing')
                starttime = starttime + 1 * sortedalbums[i].duration; // set start time of current track = sum of durations of previous tracks
              }
            }

            return {
              album: result.album,
              artist: result.artist,
              duration: result.duration,
              title: result.title,
              type: result.type,
              url: result.url,
              id: result.id,
              fullduration: fullduration,
              starttime: starttime
            };
          });
          return _context2.abrupt("return", finalresults);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}