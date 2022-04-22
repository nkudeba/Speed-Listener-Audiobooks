"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupalbum = setupalbum;

var _processAlbum = require("./processAlbum");

function setupalbum(data, albumtracks, props) {
  var prealbumartist, albumartist;
  return regeneratorRuntime.async(function setupalbum$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log('STARTING ALBUM SETUP...');
          // console.log('DISPLAYING DATA');
          // console.log(data);
          prealbumartist = data.album + ' by ' + data.author;
          albumartist = prealbumartist.toString();
          console.log('album artist on setupalbum.js: ' + albumartist);
          props.setAlbumArtist(albumartist);
          props.setArtist(data.author);
          props.setAlbum(data.album); // console.log('DISPLAYING ALBUM TRACKS');

          _context.next = 8;
          return regeneratorRuntime.awrap((0, _processAlbum.processAlbum)(albumtracks, albumartist, props));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}