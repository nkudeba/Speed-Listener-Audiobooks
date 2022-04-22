import {setQueue} from './setQueue';
import SetAlbumHistory from './setAlbumHistory';
import TrackPlayer from 'react-native-track-player';

export async function processRecentBook(
  albumtracks,
  albumartist,
  props,
  retrievedindex,
  trackposition,
) {
  console.log('THE TRACK POSITION IN PROCESS_RECENT_BOOK');
  console.log(trackposition);
  var savedposition = trackposition ? trackposition : 0;
  TrackPlayer.setupPlayer();
  console.log('ADDING TRACKS below from processRecentBook');
  console.log(albumtracks);
  await TrackPlayer.add(albumtracks).then(setQueue(props, albumtracks));
  await SetAlbumHistory(albumtracks, props);
  TrackPlayer.skip(retrievedindex);
  TrackPlayer.seekTo(savedposition);
  console.log('seeked to ' + savedposition + ' from processRecentBook');
}
