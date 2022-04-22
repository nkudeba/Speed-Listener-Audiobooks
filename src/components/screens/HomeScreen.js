import React from 'react';
import {StatusBar, View} from 'react-native';
import TrackPlayer, {Event} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import MusicPlayer from './MusicPlayer';
import {useSelector, connect} from 'react-redux';
class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log('HOME MOUNT 12345');
    // console.log('HOME THEME');
    // console.log(this.props.theme);
  }
  componentWillUnmount() {}

  render() {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={this.props.theme.BACKGROUND_COLOR}
        />
        {/* {this.state.tracksloaded ? (
          <MusicPlayer />
        ) : (
          <View
            style={{
              backgroundColor: backgroundColor,
            }}>
            <Button
              title="Go to Books"
              onPress={() => this.props.navigation.navigate('Books')}
            />
          </View>
        )} */}
        <MusicPlayer navigation={this.props.navigation} />
      </>
    );
  }
}

export function HomeScreen({navigation, route}) {
  const theme = useSelector(state => state.themeReducer.theme);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.BACKGROUND_COLOR,
        justifyContent: 'center',
      }}>
      <Test navigation={navigation} theme={theme} />
    </View>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    theme: state.themeReducer.theme,
  };
}

// export default connect(mapStateToProps)(Test);
