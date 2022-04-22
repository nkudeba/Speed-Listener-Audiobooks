import {parsetonum} from './parsetonum';

export function sortAlbumTracksbyUrl(albumtosort) {
  console.log('SORTING BY TRACK URL');
  return albumtosort.sort((a, b) =>
    parsetonum(a.url) > parsetonum(b.url)
      ? 1
      : parsetonum(b.url) > parsetonum(a.url)
      ? -1
      : 0,
  );
}
