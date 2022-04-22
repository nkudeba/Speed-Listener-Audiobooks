"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getsortedAlbums = getsortedAlbums;

// import {sortAlbumTracksbyUrl} from '../../utils/sortAlbumTracksbyUrl';
// import {sortAlbumTracksbyName} from '../../utils/sortAlbumTracksbyName';
// import {sortAlbumTracks} from '../../utils/sortAlbumTracks';
// import {parseFixedJson} from '../../utils/parseFixedJson';
function getsortedAlbums(otherpromises, sorted) {
  return regeneratorRuntime.async(function getsortedAlbums$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Promise.all(otherpromises).then(function _callee(results) {
            var mysortedalbums;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // console.log('DEE OTHER RESULTS');
                    // console.log(sorted);
                    mysortedalbums = sorted.sort(dynamicSortMultiple('track', 'title', 'url'));
                    console.log('mysortedalbums');
                    console.log(mysortedalbums);
                    return _context.abrupt("return", mysortedalbums);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function dynamicSortMultiple() {
  /*
   * save the arguments object as it will be overwritten
   * note that arguments object is an array-like object
   * consisting of the names of the properties to sort by
   */
  var props = arguments;
  return function (obj1, obj2) {
    var i = 0,
        result = 0,
        numberOfProperties = props.length;
    /* try getting a different result from 0 (equal)
     * as long as we have extra properties to compare
     */

    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }

    return result;
  };
}

function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}