import AsyncStorage from '@react-native-community/async-storage';
import {mapandsort} from './mapandsort';
import {getTrackIndex} from '../../utils/getTrackIndex';
import {setQueue} from './setQueue';
import {setCurrentTrack} from './setCurrentTrack';
import TrackPlayer from 'react-native-track-player';
import SetAlbumHistory from './setAlbumHistory';
import tryparse from '../../utils/tryparse';

export async function processAlbum(albumtracks, albumartist, props) {
  var sortedalbums = await mapandsort(albumtracks, props);
  console.log('SORTED ALBUMS');
  console.log(sortedalbums);
  TrackPlayer.add(sortedalbums);

  // console.log(albumtracks);
  var savedid = await AsyncStorage.getItem(albumartist);

  // This should work with retrievedalbums
  var retrievedindex =
    savedid == null ? 0 : getTrackIndex(savedid, sortedalbums)[0].index;
  AsyncStorage.getItem(sortedalbums[retrievedindex].url).then(async item => {
    console.log('this is what is stored');
    console.log(item);
    console.log('position stored in item');
    item == null
      ? props.setPosition(0)
      : JSON.parse(item).position
      ? props.setPosition(JSON.parse(item).position)
      : props.setPosition(0);
    if (!props.universalSpeed && item != null) {
      console.log('tracks using unique speed');
      console.log('setting playback speed to last speed of book');
      var playbackRate = await tryparse(item).playbackRate;
      console.log(playbackRate);
      await TrackPlayer.setRate(playbackRate);
      await props.setRate(playbackRate);
    }
  });
  sortedalbums[retrievedindex].title
    ? props.setTitle(sortedalbums[retrievedindex].title)
    : props.setTitle('Untitled');

  sortedalbums[retrievedindex].starttime
    ? props.setStartTime(sortedalbums[retrievedindex].starttime)
    : props.setStartTime(0);

  console.log(
    'Just set artist from reSortAlbums as ' +
      sortedalbums[retrievedindex].artist,
  );

  sortedalbums[retrievedindex].duration
    ? props.setTrackDuration(sortedalbums[retrievedindex].duration)
    : props.setTrackDuration(0);

  sortedalbums[retrievedindex].url
    ? props.setUrl(sortedalbums[retrievedindex].url)
    : null;
  // await ResortAlbums(promises2, sortedalbums, retrievedindex, props);
  await setQueue(props, sortedalbums);
  await setCurrentTrack(retrievedindex, props, sortedalbums);
  await SetAlbumHistory(sortedalbums, props).then(props.setLoaded(true));
}
