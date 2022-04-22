import {tryparse} from './tryparse';

export function sortAlbumTracksbyName(albumtosort) {
  console.log('SORTING BY TRACK TITLE');
  console.log('ALBUM TO SORT');
  console.log(albumtosort);
  return albumtosort.sort((a, b) =>
    tryparse(a.title) > tryparse(b.title)
      ? 1
      : tryparse(b.title) > tryparse(a.title)
      ? -1
      : 0,
  );
}
