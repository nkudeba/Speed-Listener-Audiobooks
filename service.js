import TrackPlayer, {State, Event} from 'react-native-track-player';

module.exports = async function () {
  let didInterrupted = false;
  // TrackPlayer.addEventListener(Event.RemoteDuck, async e => {
  //   const state = await TrackPlayer.getState();
  //   if (e.paused && state === State.Playing) {
  //     didInterrupted = true;
  //     await TrackPlayer.pause();
  //     console.log('paused on service.js from interruption')
  //   } else if (!e.paused && didInterrupted) {
  //     didInterrupted = false;
  //     await TrackPlayer.play();
  //     console.log('play after interruption on service.js')
  //   }
  // });

  // TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  // TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
  // TrackPlayer.addEventListener('remote-jump-backward', async event => {
  //   await jumpBackward();
  // });
  // TrackPlayer.addEventListener('remote-jump-forward', async event => {
  //   await jumpingforward();
  // });

  TrackPlayer.addEventListener(Event.RemoteSeek, value =>
    TrackPlayer.seekTo(value),
  );
  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    try {
      await jumpForward();
      console.log('remote next succeeded');
    } catch {
      console.log('remote next error');
      // console.log(e);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    try {
      await jumpBackward();
      console.log('remote previous succeeded');
    } catch {
      console.log('remote previous error');
      // console.log(e);
    }
  });
  // ...
};

async function jumpForward() {
  await jumpingforward();
}

async function jumpingforward() {
  console.log('Jump forward');
  const offset = 10;
  try {
    const position = await TrackPlayer.getPosition();
    const duration = this.props.duration;
    let diff = duration - position;
    console.log('diff: ' + diff);

    console.log({position, duration});

    if (diff > offset) {
      console.log('jumping in fact');
      await TrackPlayer.seekTo(position + offset).then(
        this.props.setPosition(position + offset),
      );
    } else {
      console.log('playing next');
      await this.playNext();
    }
    // playback == 'playing' ? await TrackPlayer.play() : null;
  } catch (err) {
    console.log('failed to skip');
    console.log(err);
  }
}

async function jumpBackward() {
  const offset = 10;
  console.log('Jump backward');
  try {
    // let playback = this.props.playback;
    // await TrackPlayer.pause();
    // await clearProgress(progresstimer);
    const position = await TrackPlayer.getPosition();
    if (position - offset > 0) {
      await TrackPlayer.seekTo(position - offset).then(
        this.props.setPosition(position - offset),
      );
      // playback == 'playing'
      //   ? (this.props.setPlayback('playing'),
      //     setTimeout(async function () {
      //       await TrackPlayer.play();
      //     }, 50))
      //   : null;
    } else {
      await this.playPreviousTrack().then(this.props.setPosition(0));
    }
  } catch (err) {
    console.log(err);
  }
}
