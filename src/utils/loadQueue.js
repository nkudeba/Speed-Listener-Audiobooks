import TrackPlayer, {Capability} from 'react-native-track-player';
import setStartPos from './setStartPos';

export function loadQueue(queue, currentTrack, rate, position) {
  if (queue != null) {
    TrackPlayer.reset();
    console.log('props queue on loadQueue');
    // console.log(queue);
    console.log(queue);
    TrackPlayer.setupPlayer({
      minBuffer: 180,
      maxBuffer: 300,
      backBuffer: 120,
    });
    TrackPlayer.updateOptions({
      stopWithApp: true,
      alwaysPauseOnInterruption: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SeekTo,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.PlayFromId,
        Capability.PlayFromSearch,
        Capability.JumpForward,
        Capability.JumpBackward,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpBackward,
        Capability.JumpForward,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpBackward,
        Capability.JumpForward,
      ],
      forwardJumpInterval: 10,
      backwardJumpInterval: 10,
    });
    // var parsed = JSON.parse(queue);
    var parsed2 = JSON.parse(queue);
    // console.log('HOME PARSED');
    // console.log(parsed.queue[0]);
    // console.log(parsed2[0])
    // console.log(parsed.queue[0]);
    // console.log('ADDING TRACKS BELOW FROM LOADQUEUE');
    // console.log(parsed2);
    // console.log(parsed2[0].album);
    TrackPlayer.add(parsed2);
    try {
      if (typeof currentTrack == 'number') {
        console.log('MY INDEX AT');
        console.log(currentTrack);
        TrackPlayer.skip(JSON.parse(currentTrack));
      } else {
        console.log('CURRENT TRACK NOT LOADED');
        TrackPlayer.skip(0);
      }
    } catch (e) {
      console.log(e);
    }
    TrackPlayer.setRate(rate);
    TrackPlayer.seekTo(position);
    // console.log('ADDED FROM HOMESCREEN.JS');
  } else {
    console.log('QUEUE NOT LOADED');
  }
}
