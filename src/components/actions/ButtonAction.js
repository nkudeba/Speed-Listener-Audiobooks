import {setupalbum} from '../setupAlbum/setupalbum';
import {setupTrackPlayer} from '../../utils/setupTrackPlayer';
import {RNAndroidAudioStore} from 'react-native-get-music-files';
import TrackPlayer from 'react-native-track-player';
import BackgroundTimer from '../../utils/BackgroundTimer';

export async function ButtonAction(navigation, data, props) {
  // console.log('Button Action Props: ');
  // console.log(props);
  // props.setCounterA(5500);
  await TrackPlayer.pause();
  console.log('paused from ButtonAction');
  await props.setPlayback('paused');
  BackgroundTimer.stop();
  console.log('progress CLEARED');
  console.log('data');
  console.log(data);
  console.log('artist: ' + data.author);
  console.log('album: ' + data.album);
  var myartist = data.author == null ? '' : data.author;
  var mycover = data.cover == null ? '' : data.cover;
  let albumtracks = await RNAndroidAudioStore.getSongs({
    artist: myartist,
    cover: mycover,
    album: data.album,
  }).then(albumtracks => {
    return albumtracks;
  });
  console.log('MY albumtracks from ButtonAction');
  console.log(albumtracks);
  if (albumtracks === undefined || albumtracks.length == 0) {
    console.log('Album no longer exists');
    return;
  }

  console.log('Going Home');
  console.log(data);
  console.log(data.album);
  await setupalbum(data, albumtracks, props).then(
    await setupTrackPlayer().then(await navigation.navigate('Now Playing')),
  );
}
