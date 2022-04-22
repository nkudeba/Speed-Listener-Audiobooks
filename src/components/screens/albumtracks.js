import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useIsFocused} from '@react-navigation/native';
import {
  Text,
  View,
  Button,
  StatusBar,
  FlatList,
  PermissionsAndroid,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {RNAndroidAudioStore} from 'react-native-get-music-files';
import AsyncStorage from '@react-native-community/async-storage';
import TrackPlayer, {Event} from 'react-native-track-player';
import {CommonActions} from '@react-navigation/native';
import {SearchableFlatList} from '../../utils/searchableflatlist';
import {TextInput} from 'react-native-paper';
import {tryparse} from '../../utils/tryparse';
import {styles} from '../styles/stylesAlbumTracks';
import {RenderItem, ConnectedRender} from '../actions/renderItem';
import {useSelector, useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {lightTheme, darkTheme} from '../styles/themes';
import {switchTheme} from '../actions/themeActions';
import TestScreen from './TestScreen';
import {mapDispatchToProps} from '../actions/mapDispatchToProps';
import {clearingProgress} from './clearingProgress';
import BackgroundTimer from 'react-native-background-timer';

type Props = {};
class AlbumTracks extends Component<Props> {
  state = {
    musics: [],
    getAlbumsInput: '',
    getSongsInput: {},
    searchParam: '',
    tracks: [],
    artists: [],
    albums: [],
    songs: [],
    search: [],
    searchTerm: '',
    searchAttribute: 'album',
    searchAttribute2: 'author',
    ignoreCase: true,
    loading: true,
  };
  constructor() {
    super();
  }

  async componentDidMount() {
    BackgroundTimer.stopBackgroundTimer();
    await TrackPlayer.pause();
    // await AsyncStorage.setItem('timerOn', 'false');
    console.log('paused from componentDidMount on albumtracks');
    // this.props.navigation.addListener('focus', this.onFocus);
    var setPlayback = this.props.setPlayback('paused');
    var myprops = this.props;
    this.props.navigation.addListener('focus', async t => {
      console.log('=====_onFocus');
      // console.log(se);
      await TrackPlayer.pause();
      setPlayback;
      BackgroundTimer.stopBackgroundTimer();
      // await AsyncStorage.setItem('timerOn', 'false');
      console.log('paused from focus on albumtracks');
    });
    DeviceEventEmitter.addListener('onBatchReceived', params => {
      this.setState({
        ...this.state,
        tracks: [...this.state.tracks, params.batch],
      });
    });

    this.setListener();
    console.log('check perms');
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage',
        message: ' This app would like to access your storage',
      },
    ).then(async permission => {
      if (permission === 'denied') {
        console.log('you cannot access');
      } else {
        console.log('got perms');
        // var savedalbums = await AsyncStorage.getItem('all_albums');
        // // console.log('First SAVED');
        // // savedalbums == null
        // //   ? console.log('GETTIN ALBUMS')
        // //   : console.log('ALBUMS EXIST');
        // // // console.log(savedalbums);
        // // console.log('access');
        // if (savedalbums) await this.getSavedAlbums(savedalbums);
        // else await this.getInitialAlbums();
        await this.getInitialAlbums();
      }
    });
  }
  async getInitialAlbums() {
    await RNAndroidAudioStore.getAlbums()
      .then(async albums => {
        console.log('MY ALBUMS');
        console.log(albums);
        // await AsyncStorage.setItem('all_albums', JSON.stringify(albums));
        this.setState({albums: albums});
        this.setState({loading: false});
      })
      .catch(error => {});
  }
  // async onFocus(props) {
  //   console.log('=====_onFocus');
  //   await TrackPlayer.pause();
  //   this.props.setPlayback('paused');
  //   await clearingProgress();
  //   console.log('paused from focus on albumtracks');
  // }
  async getSavedAlbums(savedalbums) {
    // console.log('PARSING 1');
    var parsedalbums = await tryparse(savedalbums);
    // console.log('PARSED ALBUMS');
    // console.log(parsedalbums);
    this.setState({loading: false});
    this.setState({albums: await parsedalbums});
  }

  setListener() {
    DeviceEventEmitter.addListener('onLastBatchReceived', params => {
      this.setState(alert('last batch sent'));
    });
  }

  async HeaderButton() {
    await AsyncStorage.removeItem('all_albums');
    await this.getInitialAlbums();
  }

  // componentWillUnmount() {
  //   DeviceEventEmitter.removeAllListeners();
  // }
  render() {
    // console.log('MYNEW THEME!');
    // console.log(this.props.theme);
    return (
      <>
        <View
          style={{
            backgroundColor: this.props.theme.BACKGROUND_COLOR,
          }}>
          {this.state.loading ? (
            <View style={{bottom: 50}}>
              <ActivityIndicator
                style={{height: 30, top: 10}}
                size="medium"
                color="black"
              />
              <Text style={{textAlign: 'center', top: 20, left: 5}}>
                Tracks Loading...
              </Text>
            </View>
          ) : (
            <>
              <View>
                <TextInput
                  placeholderTextColor={this.props.theme.HIGHLIGHT_COLOR}
                  theme={{colors: {text: this.props.theme.TEXT_COLOR}}}
                  style={styles(this.props).search}
                  placeholder={'Search...'}
                  right={
                    <TextInput.Icon
                      name="magnify"
                      color={this.props.theme.TEXT_COLOR}
                    />
                  }
                  onChangeText={searchTerm => this.setState({searchTerm})}
                />
              </View>
              <SearchableFlatList
                data={this.state.albums}
                keyExtractor={item => item.id}
                searchTerm={this.state.searchTerm}
                searchAttribute={this.state.searchAttribute}
                searchAttribute2={this.state.searchAttribute2}
                ignoreCase={this.state.ignoreCase}
                renderItem={({item}) => this.rendering(item)}
              />
            </>
          )}
        </View>
      </>
    );
  }

  rendering(item) {
    return <ConnectedRender item={item} navigation={this.props.navigation} />;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumTracks);

function ColorChanger() {
  // in class component, useSelector() is mapStateToProps and useDispatch() is mapDispatchToProps()
  const theme = useSelector(state => state.themeReducer.theme);
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
    <View style={styles2.controls}>
      {theme.mode === 'light' ? (
        <TouchableOpacity onPress={() => dispatch(switchTheme(darkTheme))}>
          <Text style={styles2.textStyle}>Switch to Dark Theme</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => dispatch(switchTheme(lightTheme))}>
          <Text style={styles2.textStyle}>Switch to Light Theme</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
