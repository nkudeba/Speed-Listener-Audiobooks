import TrackPlayer from 'react-native-track-player';
import {getStartPos} from './getStartPos';

export async function setStartPos() {
  // console.log('Setting STARTPOS');
  const currentTrackId = await TrackPlayer.getCurrentTrack();
  if (currentTrackId !== null) {
    // console.log('GETTING TRACK INFO FOR STARTPOS: ');
    const currentTrackInfo = await TrackPlayer.getTrack(currentTrackId);
    // setCurrentTracks(currentTrackInfo);  Set state to current Track here.
    // console.log('newurl: ');
    // console.log(currentTrackInfo.url);
    const newtrackurl = currentTrackInfo.url;
    await getStartPos(newtrackurl).then(async pos => {
      await TrackPlayer.seekTo(pos);
    });
  } else {
    console.log('CANNOT GET INFO');
  }
}
