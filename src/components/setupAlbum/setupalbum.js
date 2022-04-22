import {processAlbum} from './processAlbum';

export async function setupalbum(data, albumtracks, props) {
  // console.log('STARTING ALBUM SETUP...');
  // console.log('DISPLAYING DATA');
  // console.log(data);
  var prealbumartist = data.album + ' by ' + data.author;
  var albumartist = prealbumartist.toString();
  console.log('album artist on setupalbum.js: ' + albumartist);
  props.setAlbumArtist(albumartist);
  props.setArtist(data.author);
  props.setAlbum(data.album);
  // console.log('DISPLAYING ALBUM TRACKS');

  await processAlbum(albumtracks, albumartist, props);
}
