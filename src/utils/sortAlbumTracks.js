import {tryparse} from './tryparse';
import {parsetonum} from './parsetonum';

export function sortAlbumTracks(albumtosort) {
  console.log('SORTING BY TRACK ID');
  console.log('SORTING THE FOLLOWING: ');
  console.log(albumtosort);
  return albumtosort.sort((a, b) =>
    tryparse(a.track) > tryparse(b.track)
      ? 1
      : tryparse(b.track) > tryparse(a.track)
      ? -1
      : parsetonum(a.title) > parsetonum(b.title)
      ? 1
      : parsetonum(b.title) > parsetonum(a.title)
      ? -1
      : parsetonum(a.url) > parsetonum(b.url)
      ? 1
      : parsetonum(b.url) > parsetonum(a.url)
      ? -1
      : 0,
  );
}
