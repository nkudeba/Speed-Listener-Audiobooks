// To do:

// - Fix bug where app crashes after playing for a certain amount of time
// - Fix improper sorting for some books
// - Ensure that when remote pause is pushed, the progress tracking stops and the speed increase stops
// - Fix miniplayer
// - Add navigation between tracks (with skipTo) on Now Playing screen
// - Add book switcher to switch between recent books.
// - Convert all uses of state to redux-connect. Create array and loop through all of it to set props

import React, {useEffect, useRef, useReducer, useCallback} from 'react';
// import DropDownPicker from 'dropdown-picker-rn';
import DropDownPicker from 'react-native-dropdown-picker';
import useState from 'react-usestateref';
import {
  Animated,
  TextInput,
  Button,
  Easing,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  TrackPlayerEvents,
  State,
  useProgress,
  usePlaybackState,
  RepeatMode,
} from 'react-native-track-player';
import BackgroundTimer from 'react-native-background-timer';
import {isEmpty} from 'lodash';
import {processRecentBook} from '../setupAlbum/processRecentBook';
import {setupTrackPlayer} from '../../utils/setupTrackPlayer';
import {useSelector, useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {switchTheme} from '../actions/themeActions';
import {
  lightTheme,
  grapeJelly,
  pinktheme,
  pistachio,
  jade,
  bluetheme,
  peach,
  themelist,
} from '../styles/themes';
import {mapDispatchToProps} from '../actions/mapDispatchToProps';
import {RunDecrement} from '../actions/RunDecrement';
import {getTrackIndex} from '../../utils/getTrackIndex';

let x = 0;
let shift = 0.2;
var egrowth;
var t;
var g;
var denom;
var newrate;
export var progresstimer;
import {tryparse} from '../../utils/tryparse';
import {setStartPos} from '../../utils/setStartPos';
import {secondsToTime} from '../../utils/secondsToTime';
import {clearingProgress} from './clearingProgress';

function ColorChanger() {
  // in class component, useSelector() is mapStateToProps and useDispatch() is mapDispatchToProps()
  const theme = useSelector(state => state.themeReducer.theme);
  const albumHistory = useSelector(state => state.albumHistory);
  const styles2 = StyleSheet.create({
    mainStyle: {
      color: theme.HIGHLIGHT_COLOR,
    },
    textStyle: {
      color: theme.TEXT_COLOR,
    },
    controls: {
      alignItems: 'center',
    },
  });
  const dispatch = useDispatch();
  // console.log('my theme: ');
  // console.log(theme);
  return (
    <>
      <DropDownPicker
        items={themelist}
        autoScroll={true}
        defaultValue="Change theme..."
        // dropDownDirection="BOTTOM"
        searchTextInputProps={{color: theme.TEXT_COLOR}}
        searchPlaceholder={'Hi'}
        // searchContainerStyle={{
        //   borderBottomColor: 'orange',
        // }}
        searchablePlaceholderTextColor={{
          backgroundColor: theme.BACKGROUND_COLOR,
        }}
        customArrowUp={() => (
          <Icon name="chevron-down" color={theme.ICO_COLORS} />
        )}
        customArrowDown={() => (
          <Icon name="chevron-up" color={theme.ICO_COLORS} />
        )}
        searchablePlaceholder="Search styles"
        searchableTextInputStyle={{
          color: theme.TEXT_COLOR,
          opacity: '40%',
        }}
        searchable={true}
        placeholder="Change theme..."
        containerStyle={{height: 40}}
        style={{
          backgroundColor: theme.HIGHLIGHT_COLOR,
          color: theme.TEXT_COLOR,
        }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        selectedItemContainerStyle={{
          backgroundColor: 'grey',
        }}
        arrowColor={theme.TEXT_COLOR}
        // textStyle={styles.dropdownText}
        labelStyle={{color: theme.TEXT_COLOR}}
        selectedLabelStyle={{
          fontSize: 13,
          color: theme.TEXT_COLOR,
        }}
        activeItemStyle={{
          color: theme.BACKGROUND_COLOR,
          marginLeft: 11,
        }}
        activeLabelStyle={{
          color: theme.BACKGROUND_COLOR,
        }}
        dropDownMaxHeight={500}
        selectedItemStyle={{
          fontSize: 13,
          color: 'black',
        }}
        dropDownStyle={{backgroundColor: theme.INPUT_COLOR}}
        onChangeItem={async item => {
          console.log(item);
          console.log(albumHistory);
          console.log(theme);
          switch (item.value) {
            case 'Grape Jelly':
              dispatch(switchTheme(grapeJelly));
              break;
            case 'Shades':
              dispatch(switchTheme(lightTheme));
              break;
            case 'Pink Sky':
              dispatch(switchTheme(pinktheme));
              break;
            case 'Pistachio':
              dispatch(switchTheme(pistachio));
              break;
            case 'Jade':
              dispatch(switchTheme(jade));
              break;
            case 'Denim':
              dispatch(switchTheme(bluetheme));
              break;
            case 'Fuzzy Peach':
              dispatch(switchTheme(peach));
              break;
          }
          // item.value === 'Dark Theme'
          //   ? dispatch(switchTheme(grapeJelly))
          //   : dispatch(switchTheme(lightTheme));
        }}
      />
      {/* <View style={styles2.controls}>
        {theme.mode === 'Light Theme' ? (
          <TouchableOpacity onPress={() => dispatch(switchTheme(grapeJelly))}>
            <Text style={styles2.textStyle}>Switch to Dark Theme</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => dispatch(switchTheme(lightTheme))}>
            <Text style={styles2.textStyle}>Switch to Light Theme</Text>
          </TouchableOpacity>
        )}
      </View> */}
    </>
  );
}

class MusicPlayer extends React.Component {
  //
  // Growth rate: 1 + (target-1)*(e^(-growth*x)-1), where x is increment
  async componentDidMount() {
    // progresstimer = null;
    this.props.openSettings(false);
    BackgroundTimer.stopBackgroundTimer();
    console.log('MOUNTING MUSIC PLAYER ............');
    console.log('MUSIC PLAYER QUEUE ...........');
    // console.log(this.props.queue);
    // Hide Header
    this.props.navigation.setOptions({
      title: `'Now Playing'`,
      headerShown: false,
    });

    const changingTrack = TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      async e => {
        try {
          // console.log('PLAYING STATE');
          // console.log(this.props.playback);
          // console.log('playback TRACK changed');
          if (this.props.loaded) {
            // console.log('TRACKS LOADED TRACK CHANGE');
            if (e.track || e.track == 0) {
              console.log('previous track EXISTS');
              console.log(e);
              console.log(e.track);
              this.setTrackInfo(this.props);
            } else {
              console.log('NO PREVIOUS TRACK EXISTS');
              console.log(e);
              console.log(e.track);
            }
            console.log('track changed in PlaybackTrackChanged');
            console.log('EVENT:');
          } else {
            console.log('TRACK CHANGE WHEN NO TRACKS LOADED - AWAITING UPDATE');
          }
        } catch {
          console.log('track change error');
        }
      },
    );
    const changingPlayback = TrackPlayer.addEventListener(
      Event.PlaybackState,
      async () => {
        if (this.props.loaded) {
          try {
            console.log('playback STATE changed');
            // Check if playback state not 2 or 3. If so, return. Check if playback status is the same as plackback state. If so, return.
            // console.log('STATE: ');
            await TrackPlayer.getState().then(async state => {
              // console.log('showing state: ');
              // console.log(state);
              if (state == 2) {
                BackgroundTimer.stopBackgroundTimer();
              }
              if (state == 2 && this.props.playback == 'playing') {
                this.props.setPlayback('paused');
                return;
              }
            });
          } catch {
            console.log('playback change error');
          }
        }
      },
    );
    let didInterrupted = false;
    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
      await TrackPlayer.getCurrentTrack().then(async track => {
        if (track !== null) {
          const currentTrackInfo = await TrackPlayer.getTrack(track);
          await TrackPlayer.getState().then(async state => {
            if (state == 2) {
              return await this.rewindAfterPause(currentTrackInfo, state);
            }
          });
          // if (this.props.playback === 'playing') {
          //   await TrackPlayer.pause();
          //   console.log('paused from togglePlayback');
          // }
          // if (this.props.playback === 'paused') {
          //   await TrackPlayer.play();
          //   console.log('play from togglePlayback');
          // }
        }
      });
      await TrackPlayer.play();
      this.props.setPlayback('playing');
      await this.startProgress();
    });

    TrackPlayer.addEventListener(Event.RemotePause, async () => {
      TrackPlayer.pause();
      this.props.setPlayback('paused');
      BackgroundTimer.stopBackgroundTimer();
    });

    TrackPlayer.addEventListener('remote-jump-backward', async event => {
      await this.jumpBackward();
    });
    TrackPlayer.addEventListener('remote-jump-forward', async event => {
      await this.jumpingforward();
    });
    const ducking = TrackPlayer.addEventListener(Event.RemoteDuck, async e => {
      const state = await TrackPlayer.getState();
      if (e.paused && state === State.Playing) {
        didInterrupted = true;
        await TrackPlayer.pause();
        this.props.setPlayback('paused');
        BackgroundTimer.stopBackgroundTimer();
        console.log('paused from RemoteDuck on MusicPlayer');
      } else if (!e.paused && didInterrupted) {
        didInterrupted = false;
        await TrackPlayer.getCurrentTrack().then(async track => {
          if (track !== null) {
            const currentTrackInfo = await TrackPlayer.getTrack(track);
            // console.log('track object is now playing');
            // console.log(track);
            // var currentURL = trackplayerQueue[track].url;
            // console.log(currentURL);
            // var trackInfo = await AsyncStorage.getItem(currentURL);
            // var parsedtrackInfo = trackInfo ? await tryparse(trackInfo) : null;
            // console.log('track info from togglePlayback');
            // console.log(trackInfo);
            // var lastPlayback = parsedtrackInfo
            //   ? parsedtrackInfo.lastPlaybackTime
            //   : null;
            // console.log(lastPlayback);
            // var current = new Date();
            // var timeSincePlayback =
            //   (current.getTime() - this.props.lastPlayback) / 1000;
            // console.log('times of playback on togglePlayback');
            // console.log(this.props.lastPlayback);
            // console.log(timeSincePlayback);
            await TrackPlayer.getState().then(async state => {
              // console.log('showing state: ');
              // console.log(state);
              await this.rewindAfterPause(currentTrackInfo, state);
            });
            // if (this.props.playback === 'playing') {
            //   await TrackPlayer.pause();
            //   console.log('paused from togglePlayback');
            // }
            // if (this.props.playback === 'paused') {
            //   await TrackPlayer.play();
            //   console.log('play from togglePlayback');
            // }
          }
        });
        console.log(
          'play from RemoteDuck on MusicPlayer after interruption ended',
        );
      }
    });
  }

  // async setupTrackAndAlbum(props) {
  //   // const startpos = props.currentUrl;
  //   // const mystartpos = getStartPos(props.currentUrl);
  //   // console.log('MY START POS');
  //   // console.log(startpos);
  //   // console.log(mystartpos);
  //   // getCurrentTrackIds();
  //   this.setTrackInfo(props);
  //   // await setStartPos(props);
  // }

  componentDidUpdate(prevProps, prevState) {
    // console.log('Update state: ');
    // console.log(getObjectDiff(prevState, this.state));
  }

  setTrackInfo(props) {
    console.log('Setting track INFO - setTrackInfo');
    myCurrentTrack().then(track => {
      console.log('Set title and starttime from setTrackInfo as: ');
      console.log(track.title);
      console.log(track.starttime);
      track.album ? props.setAlbum(track.album) : props.setAlbum('Unknown');
      track.starttime
        ? props.setStartTime(track.starttime)
        : props.setStartTime(0);
      track.title ? props.setTitle(track.title) : props.setTitle('Untitled');
      track.artist ? props.setArtist(track.artist) : props.setArtist('Unknown');
      console.log('just set artist from MUSICPLAYER as ' + track.artist);
      console.log('Just set artist from setTrackInfo');
      track.duration
        ? props.setTrackDuration(track.duration)
        : props.setTrackDuration(0);
      // track.starttime ? this.props.setStartTime(track.starttime) : null;

      // console.log(track.album);
    });
  }

  toggleSettings = async () => {
    this.props.settingsBar
      ? this.props.openSettings(false)
      : this.props.openSettings(true);
  };

  togglePlayback = async () => {
    console.log('Progress Timer');
    console.log(progresstimer);
    console.log('togglePlayback hit');
    console.log('current playback is');
    console.log(this.props.playback);
    // var trackplayerQueue = await TrackPlayer.getQueue();
    await TrackPlayer.getCurrentTrack().then(async track => {
      if (track !== null) {
        const currentTrackInfo = await TrackPlayer.getTrack(track);
        // console.log('track object is now playing');
        // console.log(track);
        // var currentURL = trackplayerQueue[track].url;
        // console.log(currentURL);
        // var trackInfo = await AsyncStorage.getItem(currentURL);
        // var parsedtrackInfo = trackInfo ? await tryparse(trackInfo) : null;
        // console.log('track info from togglePlayback');
        // console.log(trackInfo);
        // var lastPlayback = parsedtrackInfo
        //   ? parsedtrackInfo.lastPlaybackTime
        //   : null;
        // console.log(lastPlayback);
        // var current = new Date();
        // var timeSincePlayback =
        //   (current.getTime() - this.props.lastPlayback) / 1000;
        // console.log('times of playback on togglePlayback');
        // console.log(this.props.lastPlayback);
        // console.log(timeSincePlayback);
        await TrackPlayer.getState().then(async state => {
          // console.log('showing state: ');
          // console.log(state);
          if (state !== 2 && state !== 3) {
            console.log('state: ' + state);
            console.log('OTHER STATE - pausing');
            TrackPlayer.pause();
            this.props.setPlayback('paused');
            return;
          } else if (state == 3) {
            console.log('state: ' + state);
            await TrackPlayer.pause();
            BackgroundTimer.stopBackgroundTimer();
            this.props.setPlayback('paused');
            return;
          } else if (state == 2) {
            return await this.rewindAfterPause(currentTrackInfo, state);
          }
        });
        // if (this.props.playback === 'playing') {
        //   await TrackPlayer.pause();
        //   console.log('paused from togglePlayback');
        // }
        // if (this.props.playback === 'paused') {
        //   await TrackPlayer.play();
        //   console.log('play from togglePlayback');
        // }
      }
    });
  };

  async rewindAfterPause(currentTrackInfo, state) {
    console.log('CURRENT TRACK INFO: ');
    console.log(currentTrackInfo);
    var starttime = currentTrackInfo.starttime
      ? currentTrackInfo.starttime / 1000
      : 0;
    var trackDuration = await TrackPlayer.getDuration();
    var position = await TrackPlayer.getPosition();
    console.log('trackUrl is:');
    console.log(currentTrackInfo.url);
    console.log('Last Playback Was:');
    var lastPlaybackobject = currentTrackInfo.url
      ? await AsyncStorage.getItem(currentTrackInfo.url)
      : null;
    var lastPlayback = lastPlaybackobject ? tryparse(lastPlaybackobject) : null;

    if (lastPlaybackobject) {
      var lastPlayBackTime = lastPlayback
        ? lastPlayback.lastPlaybackTime
        : null;
      console.log(lastPlaybackobject);
      console.log(lastPlayBackTime);
      var current = new Date();
      var currentTime = current.getTime();
      console.log(currentTime);
      var timeDiff = (currentTime - lastPlayBackTime) / 1000;
      console.log(timeDiff);
      console.log('state: ' + state);
      var value = position + starttime;

      if (timeDiff > 5) {
        value = value - 1;
      }
      if (timeDiff > 30) {
        value = value - 5;
      }
      if (timeDiff > 200) {
        value = value - 5;
      }
      if (timeDiff > 2000) {
        value = value - 5;
      }
      if (value < 0) {
        value = 0;
      }
      console.log('value: ' + value);
      console.log('position: ' + position);
      console.log('timeDiff: ' + timeDiff);
      console.log('starttime: ' + starttime);
      console.log('trackDuration: ' + trackDuration);
      if (value > starttime + trackDuration) {
        console.log('later track');
        // console.log(props.queue);
        const mytracks = tryparse(this.props.queue);
        console.log(mytracks);
        var tracknum = mytracks.findIndex(
          track => track.starttime > value * 1000,
        );
        var finalTrack = tracknum < 0 ? mytracks.length - 1 : tracknum - 1;
        console.log(finalTrack);
        var newstarttime = mytracks[finalTrack].starttime / 1000;
        console.log(newstarttime);
        var newposition = value - newstarttime;
        console.log(newposition);
        await TrackPlayer.skip(finalTrack);
        this.props.setPosition(newposition);
        await TrackPlayer.seekTo(newposition);
      }
      if (value < starttime) {
        console.log('previous track');
        console.log('new value: ' + value);
        // console.log(props.queue);
        const mytracks = tryparse(this.props.queue);
        console.log(mytracks);
        var tracknum = mytracks.findIndex(
          track => track.starttime > value * 1000,
        );
        console.log('track num');
        console.log(tracknum);
        var finalTrack = tracknum < 0 ? mytracks.length - 1 : tracknum - 1;
        console.log(finalTrack);
        var newstarttime = mytracks[finalTrack].starttime / 1000;
        console.log(newstarttime);
        var newposition = value - newstarttime;
        console.log(newposition);
        await TrackPlayer.skip(finalTrack);
        this.props.setPosition(newposition);
        await TrackPlayer.seekTo(newposition);
      }
      if (value >= starttime && value <= starttime + trackDuration) {
        console.log('in between');
        this.props.setPosition(value - starttime);
        await TrackPlayer.seekTo(value - starttime);
      }
    }

    await TrackPlayer.play();
    await this.startProgress();
    this.props.setPlayback('playing');
    return;
  }

  componentWillUnmount() {}
  async speedgrowth(props) {
    console.log('start speed growth');
    console.log('current rate');
    console.log(props.rate);
    let currentspeed = props.rate;
    t = props.target;
    if (currentspeed >= t) {
      console.log('Speed greater than target');
      return;
    }
    g = props.growth;
    console.log('target ' + t + ' growth ' + g + ' speed ' + currentspeed);
    let p = t / currentspeed - 1;
    let q = p / (t - 1);
    let r = Math.log(q);
    console.log('q ' + q + ' r ' + r);
    x = r / -g;
    x = x + t / 25; // adjust speed with target
    // x = Math.exp((t / currentspeed - 1) / (t - 1)) / -g;
    egrowth = Math.exp(-g * x);
    denom = 1 + (t - 1) * egrowth;
    newrate = t / denom;
    console.log('new rate: ');
    console.log(newrate);
    props.setRate(newrate);
    await TrackPlayer.setRate(newrate);
  }

  positiongrowth() {
    AsyncStorage.getItem('position').then(value => {
      if (value != null) {
        let newposition = useProgress().position;
        AsyncStorage.setItem('position', JSON.stringify(newposition));
      }
    });
  }

  ToggleSpeedRamp = () => {
    this.props.speedRamp
      ? this.props.setSpeedRamp(false)
      : this.props.setSpeedRamp(true);
  };
  ToggleSpeedFactor = () => {
    this.props.speedFactor
      ? this.props.setSpeedFactor(false)
      : this.props.setSpeedFactor(true);
  };
  ToggleUniversalSpeed = () => {
    this.props.universalSpeed
      ? this.props.setUniversalSpeed(false)
      : this.props.setUniversalSpeed(true);
  };

  playPreviousTrack = async () => {
    try {
      let playback = this.props.playback;

      // await clearingProgress();
      const position = await TrackPlayer.getPosition();
      position > 5
        ? await TrackPlayer.seekTo(0).then(this.props.setPosition(0))
        : await TrackPlayer.skipToPrevious().then(
            await TrackPlayer.seekTo(0)
              // .then(this.setTrackInfo(this.props))
              .then(this.props.setPosition(0)),
          );
      // playback == 'playing'
      //   ? (this.props.setPlayback('playing'),
      //     setTimeout(async function () {
      //       await TrackPlayer.play();
      //     }, 1500))
      //   : null;
    } catch (error) {
      console.error('This is the first track');
    }
  };

  playNext = async () => {
    try {
      let playback = this.props.playback;
      // await TrackPlayer.pause();
      // await clearingProgress();
      await TrackPlayer.skipToNext().then(this.setTrackInfo(this.props));
      // playback == 'playing'
      //   ? (this.props.setPlayback('playing'),
      //     setTimeout(async function () {
      //       await TrackPlayer.play();
      //     }, 1500))
      //   : null;
    } catch (error) {
      console.error('This is the last track');
      // alert('Last Track');
    }
  };

  jumpBackward = async () => {
    const offset = 10;
    console.log('Jump backward');
    try {
      // let playback = this.props.playback;
      // await TrackPlayer.pause();
      // await clearingProgress();
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
  };

  jumpForward = async () => {
    let playback = this.props.playback;
    await this.jumpingforward();
  };

  // fullJumpForward = async () => {
  //   await this.jumpForward();
  // };

  async jumpingforward() {
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

  async startProgress() {
    console.log('about to START progress');
    // BackgroundTimer.stop();
    // BackgroundTimer.runBackgroundTimer(() => {
    //   //code that will be called every 3 seconds
    // }, 1000);
    BackgroundTimer.runBackgroundTimer(async () => {
      this.sendState(this.props);
      this.props.speedRamp ? await this.speedgrowth(this.props) : null;
    }, 1000);

    // BackgroundTimer.clearInterval(progresstimer);
    // await AsyncStorage.setItem('timerOn', 'true');
    // await clearingProgress();
    progresstimer
      ? console.log('progress timer exists')
      : console.log('not in progress');
    // AsyncStorage.setItem('timerOn', 'true').then(
    //   (progresstimer = BackgroundTimer.setInterval(async () => {
    //     await this.sendState(this.props);
    //     this.props.speedRamp ? await this.speedgrowth(this.props) : null;
    //   }, 1000)),
    // );
  }

  onChangedGrowth(text, props) {
    let newText = '';
    let numbers = '0123456789.';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('please enter numbers only');
      }
    }
    props.setGrowth(newText / 2000);
  }
  onChangedTarget(text, props) {
    let newText = '';
    let numbers = '0123456789.';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('please enter numbers only');
      }
    }
    if (newText <= 8) {
      props.setTarget(newText);
    }
    if (newText > 8) {
      alert(
        'Due to playback limitations, max playback speed is 8x. Setting target to 8x.',
      );
      props.setTarget(8);
    }
  }

  onChangedSpeed(text, props) {
    let newText = '';
    let numbers = '0123456789.';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('please enter numbers only');
      }
    }
    newText = parseFloat(newText);
    if (newText <= 8) {
      TrackPlayer.setRate(newText);
      props.setRate(newText);
    }
    if (newText > 8) {
      alert(
        'Due to playback limitations, max playback speed is 8x. Setting speed to 8x.',
      );
      TrackPlayer.setRate(8);
      props.setRate(8);
    }
  }

  onIncrement(props) {
    props.setRate(props.rate + 0.3);
  }

  render() {
    // console.log('All the props');
    // console.log(this.props.duration);

    const styles = StyleSheet.create({
      heartIconStyle: {
        // backgroundColor: 'red',
        borderRadius: 35,
        padding: 15,
        borderColor: 'lightgrey',
        borderWidth: 1,
      },
      switch: {
        top: -10,
      },
      switch2: {
        top: 0,
      },
      controls: {
        color: this.props.theme.TEXT_COLOR,
        alignItems: 'center',
      },
      sliderAndTimerViewStyle: {
        paddingVertical: '5%',
      },
      timerTextStyle: {
        color: this.props.theme.TEXT_COLOR,
      },
      button: {
        backgroundColor: this.props.theme.HIGHLIGHT_COLOR,
        borderColor: this.props.theme.INPUT_COLOR,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
      },
      playerButton: {
        backgroundColor: this.props.theme.BACKGROUND_COLOR,
        borderColor: this.props.theme.INPUT_COLOR,
        // borderWidth: 1,
        // padding: 10,
        // borderRadius: 10,
      },
      playedTimerViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      songImageStyle: {
        borderRadius: 7,
      },
      songImageViewStyle: {
        paddingVertical: 15,
      },
      songNameInfoViewStyle: {
        paddingVertical: 10,
        paddingTop: '10%',
      },
      songNameTextStyle: {
        fontSize: 32,
        color: this.props.theme.TEXT_COLOR,
        fontWeight: '400',
      },
      songInfoTextStyle: {
        fontSize: 20,
        fontWeight: '300',
        color: this.props.theme.TEXT_COLOR,
      },
      playerControlButtonsStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 30,
        // backgroundColor: 'red',
        alignItems: 'center',
      },
      repeatControlStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
      },
      playerContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingVertical: '10%',
        paddingHorizontal: '5%',
      },
      dropdownMain: {
        backgroundColor: this.props.theme.HIGHLIGHT_COLOR,
        color: this.props.theme.TEXT_COLOR,
      },
      dropdownList: {
        backgroundColor: this.props.theme.INPUT_COLOR,
        // height: 2000,
      },
      dropdownText: {
        color: this.props.theme.TEXT_COLOR,
      },
      listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      dropdownContainerStyle: {
        height: 40,
      },
      buttonStyle: {
        color: this.props.theme.BACKGROUND_COLOR,
      },
      textinput2: {
        marginLeft: 5,
        color: this.props.theme.TEXT_COLOR,
        height: 35,
        borderRadius: 10,
        padding: 5,
        top: 9,
        // backgroundColor: backgroundColor,
        // borderWidth: 1,
      },
      stopstart: {
        // marginLeft: 5,
        color: this.props.theme.TEXT_COLOR,
        height: 35,
        width: 50,
        borderRadius: 10,
        padding: 5,
        top: -5,
        // top: -100,
        backgroundColor: this.props.theme.HIGHLIGHT_COLOR,
        // borderWidth: 1,
      },
      resume: {
        // marginLeft: 5,
        color: this.props.theme.TEXT_COLOR,
        height: 35,
        width: 68,
        borderRadius: 10,
        padding: 5,
        top: -5,
        backgroundColor: this.props.theme.HIGHLIGHT_COLOR,
        // borderWidth: 1,
      },
      textInput: {
        color: this.props.theme.TEXT_COLOR,
      },
      sideBar: {
        backgroundColor: this.props.theme.BACKGROUND_COLOR,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingVertical: '10%',
        paddingHorizontal: '12%',
      },
    });
    return (
      <View style={styles.playerContainerStyle}>
        <Modal
          transparent
          style={styles.sideBar}
          visible={this.props.settingsBar}>
          <View style={styles.sideBar}>
            <TouchableOpacity onPress={this.toggleSettings}>
              <Icon
                name="remove"
                size={30}
                color={this.props.theme.ICO_COLORS}
              />
            </TouchableOpacity>
            <View style={styles.controls}>
              <Text style={styles.controls}> </Text>
            </View>
            <View style={styles.controls}>
              <Text style={styles.controls}>
                Change Playback Speed (currently {this.props.rate.toFixed(3)}):
              </Text>
              <Text style={styles.controls}>
                <Text> </Text>
                <RunDecrement />
                <TouchableOpacity>
                  <TextInput
                    style={styles.textinput2}
                    keyboardType="numeric"
                    placeholder="manual input"
                    placeholderTextColor={this.props.theme.HIGHLIGHT_COLOR}
                    onChangeText={text =>
                      text > 0 ? this.onChangedSpeed(text, this.props) : null
                    }
                    maxLength={10} //setting limit of input
                  />
                </TouchableOpacity>
              </Text>
            </View>

            <View style={styles.controls}>
              <Text style={styles.controls}>
                {' '}
                {'\n'} Change Speed Growth Rate (currently{' '}
                {this.props.growth * 2000}):{' '}
              </Text>
              <Text style={styles.controls}>
                <TouchableOpacity>
                  <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    theme={{
                      colors: {text: this.props.theme.TEXT_COLOR},
                    }}
                    placeholder="speed growth rate"
                    placeholderTextColor={this.props.theme.HIGHLIGHT_COLOR}
                    onChangeText={text =>
                      text > 0 ? this.onChangedGrowth(text, this.props) : null
                    }
                    maxLength={10} //setting limit of input
                  />
                </TouchableOpacity>{' '}
                <TouchableOpacity onPress={this.ToggleSpeedRamp}>
                  <View style={styles.switch}>
                    <Switch
                      trackColor={{
                        false: this.props.theme.INPUT_COLOR,
                        true: this.props.theme.HIGHLIGHT_COLOR,
                      }}
                      thumbColor={
                        this.props.speedRamp
                          ? this.props.theme.ICO_COLORS
                          : this.props.theme.BACKGROUND_COLOR
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={this.ToggleSpeedRamp}
                      value={this.props.speedRamp}
                    />
                  </View>
                </TouchableOpacity>{' '}
              </Text>
            </View>
            <View style={styles.controls}>
              <Text style={styles.controls}>
                Adjust book length on slider with playback speed
              </Text>
              <View style={styles.switch}>
                <Switch
                  trackColor={{
                    false: this.props.theme.INPUT_COLOR,
                    true: this.props.theme.HIGHLIGHT_COLOR,
                  }}
                  thumbColor={
                    this.props.speedRamp
                      ? this.props.theme.ICO_COLORS
                      : this.props.theme.BACKGROUND_COLOR
                  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.ToggleSpeedFactor}
                  value={this.props.speedFactor}
                />
              </View>
            </View>
            <View style={styles.controls}>
              <Text style={styles.controls}>
                Set unique speed for each book
              </Text>
              <View style={styles.switch2}>
                <Switch
                  trackColor={{
                    false: this.props.theme.INPUT_COLOR,
                    true: this.props.theme.HIGHLIGHT_COLOR,
                  }}
                  thumbColor={
                    this.props.speedRamp
                      ? this.props.theme.ICO_COLORS
                      : this.props.theme.BACKGROUND_COLOR
                  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.ToggleUniversalSpeed}
                  value={!this.props.universalSpeed}
                />
              </View>
            </View>
            <View style={styles.controls}>
              <Text style={styles.controls}>
                Change Target Speed (currently {this.props.target}){' '}
              </Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                theme={{colors: {text: this.props.theme.TEXT_COLOR}}}
                placeholderTextColor={this.props.theme.HIGHLIGHT_COLOR}
                placeholder="target speed"
                onChangeText={text =>
                  text > 0 ? this.onChangedTarget(text, this.props) : null
                }
                maxLength={10} //setting limit of input
              />
            </View>
            <ColorChanger />
          </View>
        </Modal>
        <View>
          {this.props.loaded ? (
            <TouchableOpacity onPress={this.toggleSettings}>
              <Icon
                name="navicon"
                size={30}
                color={this.props.theme.ICO_COLORS}
              />
            </TouchableOpacity>
          ) : (
            <>
              <Button
                style={styles.buttonStyle}
                title="Settings"
                color={this.props.theme.HIGHLIGHT_COLOR}
                onPress={this.toggleSettings}
              />
              <Text>{'\n'}</Text>
            </>
          )}
        </View>
        {this.props.loaded ? (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <View style={styles.songNameInfoViewStyle}>
                  <Text style={styles.songNameTextStyle}>
                    {this.props.title}
                  </Text>
                  <Text style={styles.songInfoTextStyle}>
                    {this.props.album} by {this.props.artist}
                  </Text>
                </View>
                {this.setSlider(
                  styles,
                  this.props.position,
                  this.props.trackDuration / 1000,
                  this.props,
                  'Track',
                  this.props.rate,
                )}
                {this.setSlider(
                  styles,
                  this.props.startTime / 1000 + this.props.position,
                  this.props.duration / 1000,
                  this.props,
                  'Book',
                  this.props.rate,
                  this.props.startTime / 1000,
                  this.props.trackDuration / 1000,
                )}
                <View style={styles.playerControlButtonsStyle}>
                  <TouchableOpacity onPress={this.playPreviousTrack}>
                    <Icon
                      name="caret-left"
                      size={50}
                      color={this.props.theme.ICO_COLORS}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.jumpBackward}>
                    <Icon
                      name="backward"
                      size={30}
                      color={this.props.theme.ICO_COLORS}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.togglePlayback()}>
                    {this.props.playback === 'playing' ? (
                      <Icon
                        name="pause-circle"
                        size={70}
                        color={this.props.theme.ICO_COLORS}
                      />
                    ) : (
                      <Icon
                        name="play-circle"
                        size={70}
                        color={this.props.theme.ICO_COLORS}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.jumpForward}>
                    <Icon
                      name="forward"
                      size={30}
                      color={this.props.theme.ICO_COLORS}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.playNext}>
                    <Icon
                      name="caret-right"
                      size={50}
                      color={this.props.theme.ICO_COLORS}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.controls}>
                  <Text style={styles.controls}> </Text>
                </View>
                <View style={styles.controls}>
                  <Text style={styles.controls}>
                    {' '}
                    Current Speed:
                    {this.props.rate.toFixed(3)}
                  </Text>
                </View>
                <View style={styles.controls}>
                  <Text style={styles.controls}>
                    {' '}
                    Speed Growth Rate:
                    {this.props.growth * 2000}
                  </Text>
                </View>
                <View style={styles.controls}>
                  <Text style={styles.controls}>
                    Target Speed: {this.props.target}
                  </Text>
                </View>
                {/* <View style={styles.controls}>
                  <Text style={styles.controls}>
                    Playback State: {this.props.playback}
                  </Text>
                </View> */}
                {/* <View style={styles.controls}>
                  <Text style={styles.controls}>
                    Track Duration: {this.props.trackDuration}
                  </Text>
                </View>
                <View style={styles.controls}>
                  <Text style={styles.controls}>
                    Full Duration: {this.props.duration}
                  </Text>
                </View> */}
              </View>
            </ScrollView>
            {this.props.albumHistory ? (
              <DropDownPicker
                items={this.props.albumHistory}
                autoScroll={true}
                defaultValue="Book History"
                // dropDownDirection="BOTTOM"
                searchTextInputProps={{color: this.props.theme.TEXT_COLOR}}
                searchPlaceholder={'Hi'}
                // searchContainerStyle={{
                //   borderBottomColor: 'orange',
                // }}
                searchablePlaceholderTextColor={{
                  backgroundColor: this.props.theme.BACKGROUND_COLOR,
                }}
                customArrowUp={() => (
                  <Icon
                    name="chevron-down"
                    color={this.props.theme.ICO_COLORS}
                  />
                )}
                customArrowDown={() => (
                  <Icon name="chevron-up" color={this.props.theme.ICO_COLORS} />
                )}
                searchablePlaceholder="Search for a book"
                searchableTextInputStyle={{
                  color: this.props.theme.TEXT_COLOR,
                  opacity: '40%',
                }}
                searchable={true}
                placeholder="Book History"
                containerStyle={styles.dropdownContainerStyle}
                style={styles.dropdownMain}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                selectedItemContainerStyle={{
                  backgroundColor: 'grey',
                }}
                arrowColor={this.props.theme.TEXT_COLOR}
                // textStyle={styles.dropdownText}
                labelStyle={styles.dropdownText}
                selectedLabelStyle={{
                  fontSize: 13,
                  color: this.props.theme.TEXT_COLOR,
                }}
                activeItemStyle={{
                  color: this.props.theme.BACKGROUND_COLOR,
                  marginLeft: 11,
                }}
                activeLabelStyle={{
                  color: this.props.theme.BACKGROUND_COLOR,
                }}
                dropDownMaxHeight={500}
                selectedItemStyle={{
                  fontSize: 13,
                  color: 'black',
                }}
                dropDownStyle={styles.dropdownList}
                onChangeItem={async item => {
                  await TrackPlayer.pause();
                  console.log('pause from select track dropdown');
                  await this.props.setPlayback('paused');
                  BackgroundTimer.stopBackgroundTimer();
                  this.props.setAlbumArtist(item.label);
                  console.log('Pressed album ' + item.label + ' with tracks:');
                  console.log(item.label);
                  console.log('DROPDOWN ITEM');
                  console.log('Retrieved track from dropdown');
                  console.log(await AsyncStorage.getItem(item.label));
                  var savedid = await AsyncStorage.getItem(item.label);
                  var retrievedindex =
                    savedid == null
                      ? 0
                      : getTrackIndex(savedid, item.tracks)[0].index;
                  this.props.setCurrentTrack(JSON.stringify(retrievedindex));
                  item.tracks[retrievedindex].title
                    ? this.props.setTitle(item.tracks[retrievedindex].title)
                    : this.props.setTitle('Untitled');

                  this.props.setFullDuration(item.tracks[0].fullduration);

                  item.tracks[retrievedindex].starttime
                    ? this.props.setStartTime(
                        item.tracks[retrievedindex].starttime,
                      )
                    : this.props.setStartTime(0);
                  item.tracks[retrievedindex].album
                    ? this.props.setAlbum(item.tracks[retrievedindex].album)
                    : this.props.setAlbum('Unknown');
                  item.tracks[retrievedindex].artist
                    ? this.props.setArtist(item.tracks[retrievedindex].artist)
                    : this.props.setArtist('Unknown');
                  item.tracks[retrievedindex].duration
                    ? this.props.setTrackDuration(
                        item.tracks[retrievedindex].duration,
                      )
                    : this.props.setTrackDuration(0);
                  console.log(item);
                  var trackposition;
                  trackposition = await AsyncStorage.getItem(
                    item.tracks[retrievedindex].url,
                  ).then(async myitem => {
                    console.log('this is what is stored');
                    console.log(myitem);
                    let trackposition =
                      myitem == null
                        ? 0
                        : JSON.parse(myitem).position
                        ? JSON.parse(myitem).position
                        : 0;
                    this.props.setPosition(trackposition);
                    if (!this.props.universalSpeed && myitem != null) {
                      console.log('tracks using unique speed');
                      console.log(
                        'setting playback speed to last speed of book from MusicPlayer',
                      );
                      var playbackRate = await tryparse(myitem).playbackRate;
                      console.log(playbackRate);
                      await TrackPlayer.setRate(playbackRate);
                      await this.props.setRate(playbackRate);
                    }
                    return trackposition;
                  });
                  item.tracks[retrievedindex].url
                    ? this.props.setUrl(item.tracks[retrievedindex].url)
                    : null;
                  await processRecentBook(
                    item.tracks,
                    item.label,
                    this.props,
                    retrievedindex,
                    trackposition,
                  );
                  //When item from dropdown selected, TrackPlayer.setupPlayer() then TrackPlayer.add() that array as tracks
                  //Then run through the whole component mount setup again
                }}
              />
            ) : null}
            <DropDownPicker
              items={this.props.dropdownQueue}
              autoScroll={true}
              defaultValue="Select a track"
              // dropDownDirection="BOTTOM"
              searchTextInputProps={{color: this.props.theme.TEXT_COLOR}}
              selectedItem={this.props.currentTrack}
              searchablePlaceholderTextColor={this.props.theme.BACKGROUND_COLOR}
              customArrowUp={() => (
                <Icon name="chevron-down" color={this.props.theme.ICO_COLORS} />
              )}
              customArrowDown={() => (
                <Icon name="chevron-up" color={this.props.theme.ICO_COLORS} />
              )}
              searchablePlaceholder="Search for a track"
              searchableTextInputStyle={{
                color: this.props.theme.TEXT_COLOR,
                opacity: '40%',
              }}
              searchable={true}
              placeholder="Select Track"
              containerStyle={styles.dropdownContainerStyle}
              style={styles.dropdownMain}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              selectedItemContainerStyle={{
                backgroundColor: 'grey',
              }}
              arrowColor={this.props.theme.TEXT_COLOR}
              labelStyle={styles.dropdownText}
              selectedLabelStyle={{
                fontSize: 13,
                color: this.props.theme.TEXT_COLOR,
              }}
              activeItemStyle={{
                color: this.props.theme.BACKGROUND_COLOR,
                marginLeft: 11,
              }}
              activeLabelStyle={{
                color: this.props.theme.BACKGROUND_COLOR,
              }}
              dropDownMaxHeight={500}
              selectedItemStyle={{
                fontSize: 13,
                color: 'black',
              }}
              dropDownStyle={styles.dropdownList}
              onChangeItem={item => {
                this.props.setPosition(0);
                this.props.setCurrentTrack(item.value);
                //this.props.setPosition(0)
                console.log('track switch item selected');
                console.log(item);
                this.props.setTitle(item.label);
                this.props.setTrackDuration(item.duration);
                this.props.setStartTime(item.starttime);
                TrackPlayer.skip(item.value);
                TrackPlayer.seekTo(0);
              }}
            />
            <Text> {'\n'} </Text>
          </>
        ) : (
          <>
            <Button
              style={styles.buttonStyle}
              title="Go to Books"
              color={this.props.theme.HIGHLIGHT_COLOR}
              onPress={() => this.props.navigation.navigate('Books')}
            />
          </>
        )}
      </View>
    );
  }
  async sendState(props) {
    // var timerOn = await AsyncStorage.getItem('timerOn');
    // if (timerOn == 'false') {
    //   BackgroundTimer.stopBackgroundTimer();
    // }
    // if (timerOn == 'true') {

    // }
    // console.log('Sending state...');
    await TrackPlayer.getState().then(async state => {
      // console.log('showing state: ');
      // console.log(state);
      if (state == 2) {
        BackgroundTimer.stopBackgroundTimer();
      }
      if (state == 2 && this.props.playback == 'playing') {
        this.props.setPlayback('paused');
        return;
      }
      if (state == 3) {
        const currentTrackInfo = await TrackPlayer.getTrack(
          await TrackPlayer.getCurrentTrack(),
        );

        var current = new Date();
        var lastPlaybackTime = current.getTime();
        props.setLastPlaybackTime(lastPlaybackTime);
        const position = await TrackPlayer.getPosition();
        const playbackRate = await TrackPlayer.getRate();

        const updatedPlayerState = {
          position,
          playbackRate,
          lastPlaybackTime,
        };
        // console.log('Position: ' + position);
        props.setPosition(position);
        var CurrentTrack = await TrackPlayer.getCurrentTrack();
        // console.log('Track Index: ');
        // console.log(CurrentTrack);
        props.setCurrentTrack(CurrentTrack);
        console.log('CURRENT TRACK INFO');
        console.log(currentTrackInfo);
        var prealbumartist2 =
          currentTrackInfo.album + ' by ' + currentTrackInfo.artist;
        var albumartist = prealbumartist2.toString();
        // console.log('Current Props Queue');
        // console.log(props.queue);
        // console.log('ALBUMARTIST');
        // console.log(albumartist);
        // console.log('Setting ' + albumartist + ' to the track ID below:');
        // currentTrackInfo.id
        //   ? console.log(currentTrackInfo.id)
        //   : console.log('No track Id');
        currentTrackInfo.album && currentTrackInfo.id
          ? await AsyncStorage.setItem(albumartist, currentTrackInfo.id)
          : null;
        // console.log(await AsyncStorage.getItem(currentTrackInfo.album));

        currentTrackInfo.url
          ? await AsyncStorage.setItem(
              currentTrackInfo.url,
              JSON.stringify(updatedPlayerState),
            )
          : null;
      }
    });
  }

  setSlider(
    styles,
    position,
    duration,
    props,
    type,
    rate,
    starttime,
    trackDuration,
  ) {
    var speedfactor = this.props.speedFactor ? rate : 1;
    var mytype = type;
    var durationlength = '';
    var myduration = '';
    switch (duration) {
      case duration > 1000:
        durationlength = 'days';
        break;
      case duration > 500:
        durationlength = 'hours';
        myduration = new Date(duration).toISOString().substr(11, 8);
        break;
      default:
        durationlength = 'minutes';
        myduration = new Date(position * 1000).toISOString().substr(14, 5);
    }
    return (
      <View style={styles.sliderAndTimerViewStyle}>
        <Slider
          style={{width: '100%', height: 30}}
          value={position / speedfactor}
          minimumValue={0}
          maximumValue={duration / speedfactor}
          thumbTintColor={this.props.theme.HIGHLIGHT_COLOR}
          minimumTrackTintColor={this.props.theme.ICO_COLORS}
          maximumTrackTintColor={this.props.theme.HIGHLIGHT_COLOR}
          tapToSeek={true}
          onSlidingComplete={async value => {
            value = value * speedfactor;
            console.log('props');
            console.log(this.props.theme);
            // let playback = this.props.playback;
            // await TrackPlayer.pause();
            // await clearingProgress();
            if (mytype == 'Track') {
              props.setPosition(value);
              await TrackPlayer.seekTo(value);
              // playback == 'playing'
              //   ? (this.props.setPlayback('playing'),
              //     setTimeout(async function () {
              //       await TrackPlayer.play();
              //     }, 5))
              //   : null;
            }
            if (mytype == 'Book') {
              console.log('Book seek');
              console.log(
                'starttime: ' +
                  starttime +
                  ' duration: ' +
                  trackDuration +
                  ' value: ' +
                  value,
              );
              if (value > starttime + trackDuration) {
                console.log('later track');
                // console.log(props.queue);
                const mytracks = tryparse(props.queue);
                console.log(mytracks);
                var tracknum = mytracks.findIndex(
                  track => track.starttime > value * 1000,
                );
                var finalTrack =
                  tracknum < 0 ? mytracks.length - 1 : tracknum - 1;
                console.log(finalTrack);
                var newstarttime = mytracks[finalTrack].starttime / 1000;
                console.log(newstarttime);
                var newposition = value - newstarttime;
                console.log(newposition);
                await TrackPlayer.skip(finalTrack);
                props.setPosition(newposition);
                await TrackPlayer.seekTo(newposition);
              }
              if (value < starttime) {
                console.log('previous track');
                // console.log(props.queue);
                const mytracks = tryparse(props.queue);
                console.log(mytracks);
                var tracknum = mytracks.findIndex(
                  track => track.starttime > value * 1000,
                );
                var finalTrack =
                  tracknum < 0 ? mytracks.length - 1 : tracknum - 1;
                console.log(finalTrack);
                var newstarttime = mytracks[finalTrack].starttime / 1000;
                console.log(newstarttime);
                var newposition = value - newstarttime;
                console.log(newposition);
                await TrackPlayer.skip(finalTrack);
                props.setPosition(newposition);
                await TrackPlayer.seekTo(newposition);
              }
              if (value >= starttime && value <= starttime + trackDuration) {
                console.log('in between');
                props.setPosition(value - starttime);
                await TrackPlayer.seekTo(value - starttime);
              }
            }
          }}
        />
        <View style={styles.playedTimerViewStyle}>
          <Text style={styles.timerTextStyle}>
            {secondsToTime(position / speedfactor)}
          </Text>
          <Text style={styles.timerTextStyle}>
            {secondsToTime(duration / speedfactor)}
          </Text>
        </View>
      </View>
    );
  }
}

async function myCurrentTrack() {
  const currentTrackInfo = await TrackPlayer.getTrack(
    await TrackPlayer.getCurrentTrack(),
  );
  // console.log(currentTrackInfo);
  return currentTrackInfo;
}

function mapStateToProps(state, ownProps) {
  return {
    theme: state.themeReducer.theme,
    speedFactor: state.speedFactor,
    universalSpeed: state.universalSpeed,
    position: state.position,
    duration: state.duration,
    trackDuration: state.trackDuration,
    startTime: state.startTime,
    queue: state.queue,
    currentTrack: state.currentTrack,
    currentUrl: state.currentUrl,
    albumHistory: state.albumHistory,
    rate: state.rate,
    lastPlayback: state.lastPlayback,
    growth: state.growth,
    target: state.target,
    loaded: state.loaded,
    dropdownQueue: state.dropdownQueue,
    settingsBar: state.settingsBar,
    title: state.title,
    artist: state.artist,
    album: state.album,
    speedRamp: state.speedRamp,
    playback: state.playback,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
