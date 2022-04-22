"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ResortAlbums;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _tryparse = require("../../utils/tryparse");

var _reactNativeTrackPlayer = _interopRequireDefault(require("react-native-track-player"));

var _setAlbumHistory = _interopRequireDefault(require("./setAlbumHistory"));

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ResortAlbums(promises2, sortedalbums, retrievedindex, props) {
  return regeneratorRuntime.async(function ResortAlbums$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", Promise.all(promises2).then(function (results) {
            console.log('SORTEDALBUMS2 RESULTS on reSortAlbums.js!');
            console.log(results);
            console.log('sortedalbums on reSortAlbums.js!');
            console.log(sortedalbums); //Set fullduration to sum of all of results.duration here

            var fullduration = results.reduce(function (total, obj) {
              return 1 * obj.duration + total;
            }, 0); // props.setFullDuration(fullduration);
            // console.log('Full Duration: ', fullduration);
            // console.log('Original Converted');
            // console.log(sortedalbums);

            var finalresults = results.map(function (result, index) {
              function getTrackInfo(path) {
                return sortedalbums.filter(function (sortedalbums) {
                  return sortedalbums.url == result.url;
                });
              }

              var starttime = 0;
              var ogtrack = getTrackInfo(result.url)[0];

              if (index == 0) {
                starttime = 0;
              } else {
                for (i = 0; i < index; i++) {
                  // console.log(index);
                  // console.log('indexing')
                  starttime = starttime + 1 * results[i].duration; // set start time of current track = sum of durations of previous tracks
                }
              }

              var myartist = result.artist == undefined ? ogtrack.artist : result.artist;
              var mytitle = result.title == undefined ? ogtrack.title : result.title;
              var myalbum = result.album == undefined ? ogtrack.album : result.album;
              return {
                album: myalbum,
                artist: myartist,
                duration: result.duration,
                title: mytitle,
                type: result.type,
                url: result.url,
                id: result.id,
                fullduration: fullduration,
                starttime: starttime
              };
            });
            (0, _setAlbumHistory["default"])(finalresults, props); // console.log('FINAL RESULTS');
            // console.log(finalresults);
            // console.log('title');
            // console.log(finalresults[retrievedindex].title);

            finalresults[retrievedindex].title ? props.setTitle(finalresults[retrievedindex].title) : props.setTitle('Untitled');
            finalresults[retrievedindex].starttime ? props.setStartTime(finalresults[retrievedindex].starttime) : props.setStartTime(0);
            console.log('Just set artist from reSortAlbums as ' + finalresults[retrievedindex].artist);
            finalresults[retrievedindex].duration ? props.setTrackDuration(finalresults[retrievedindex].duration) : props.setTrackDuration(0);
            finalresults[retrievedindex].url ? props.setUrl(finalresults[retrievedindex].url) : null; // console.log('resortAlbums props');
            // console.log(props);

            console.log('resortAlbums universal speed');
            console.log(props.universalSpeed);
            console.log('ADDING TRACKS BELOW FROM reSortAlbums');
            console.log(finalresults); // TrackPlayer.add(finalresults);
            // AsyncStorage.getItem(finalresults[retrievedindex].url).then(
            //   async item => {
            //     console.log('this is what is stored');
            //     console.log(item);
            //     console.log('position stored in item');
            //     item == null
            //       ? props.setPosition(0)
            //       : JSON.parse(item).position
            //       ? props.setPosition(JSON.parse(item).position)
            //       : props.setPosition(0);
            //     if (!props.universalSpeed && item != null) {
            //       console.log('tracks using unique speed');
            //       console.log('setting playback speed to last speed of book');
            //       var playbackRate = await tryparse(item).playbackRate;
            //       console.log(playbackRate);
            //       await TrackPlayer.setRate(playbackRate);
            //       await props.setRate(playbackRate);
            //     }
            //   },
            // );
          })["catch"](function (e) {
            console.error(e);
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function mapStateToProps(state, ownProps) {
  // console.log('de duration: ');
  // console.log(state);
  // console.log(state.duration);
  return {
    theme: state.themeReducer.theme,
    duration: state.duration,
    universalSpeed: state.universalSpeed
  };
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // dispatching plain actions
    increment: function increment(payload) {
      return dispatch({
        type: 'INCREMENT',
        payload: payload
      });
    }
  };
};

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ResortAlbums);