import AsyncStorage from '@react-native-community/async-storage';
import TrackPlayer from 'react-native-track-player';
import tryparse from '../../utils/tryparse';

export async function setCurrentTrack(retrievedindex, props, albumtracks) {
  await TrackPlayer.skip(retrievedindex);
  console.log('retrievedindex');
  console.log(retrievedindex);
  console.log('albumtracks on setCurrentTrack');
  console.log(albumtracks);
  // var parsedalbumtracks = JSON.parse(albumtracks);
  // console.log(parsedalbumtracks);
  props.setCurrentTrack(JSON.stringify(retrievedindex));
  console.log('current URL from setCurrentTrack');
  console.log(albumtracks[retrievedindex]);
  var mytrackposition = await AsyncStorage.getItem(
    albumtracks[retrievedindex].url,
  ).then(myitem => {
    console.log('this is what is stored');
    console.log(myitem);
    let trackposition =
      myitem == null
        ? 0
        : JSON.parse(myitem).position
        ? JSON.parse(myitem).position
        : 0;
    // this.props.setPosition(trackposition);
    return trackposition;
  });
  console.log('mytrackposition from setCurrentTrack');
  console.log(mytrackposition);
  await TrackPlayer.seekTo(mytrackposition);
}
