import * as React from 'react';
import {useEffect} from 'react';
import {loadQueue} from './src/utils/loadQueue';
import {HomeStackScreen} from './HomeStackScreen';
import {ProfileStackScreen} from './ProfileStackScreen';
import {AlbumsStackScreen} from './AlbumsStackScreen';
import {AlbumStackingScreen} from './AlbumStackingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {useSelector, useDispatch, connect} from 'react-redux';
const RouteConfigs = {};

// Figure out how to make the screen always active so that

// Each bottom tab pulls in a separate stack navigator

export function HomeTabs(props) {
  const theme = useSelector(state => state.themeReducer.theme);
  const queue = useSelector(state => state.queue);
  const rate = useSelector(state => state.rate);
  const position = useSelector(state => state.position);
  const currentTrack = useSelector(state => state.currentTrack);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      loadQueue(queue, currentTrack, rate, position);
    } catch (e) {
      console.log(e);
    }
    dispatch({type: 'PLAYBACK', payload: 'paused'});
    return () => {};
  }, []);
  const TabBarOptions = {
    // styling here: https://reactnavigation.org/docs/1.x/tab-navigator/
    activeTintColor: theme.HIGHLIGHT_COLOR,
    inactiveTintColor: theme.TEXT_COLOR,
    style: {
      backgroundColor: theme.BACKGROUND_COLOR,
      paddingBottom: 13,
      position: 'absolute',
      paddingTop: 0,
      bottom: '0%',
      borderTopWidth: 0.5,
      borderTopColor: theme.HIGHLIGHT_COLOR,
      // elevation: 50,
      // fontSize: 33,
      height: 45,
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      // color: 'green'
    },
  };

  const MyTheme = {
    dark: false,
    colors: {
      primary: theme.HIGHLIGHT_COLOR,
      background: theme.BACKGROUND_COLOR,
      card: 'rgb(255, 255, 255)',
      text: theme.TEXT_COLOR,
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  return (
    <Tab.Navigator tabBarOptions={TabBarOptions}>
      {/* <Tab.Screen
        name="Storage Tests"
        theme={MyTheme}
        component={ProfileStackScreen}
      /> */}
      <Tab.Screen
        name="Now Playing"
        colors={(theme.HIGHLIGHT_COLOR, theme.BACKGROUND_COLOR)}
        component={HomeStackScreen}
      />
      {/* <Tab.Screen
        name="MyBooks"
        theme={MyTheme}
        component={AlbumStackingScreen}
      /> */}
      <Tab.Screen name="Books" theme={MyTheme} component={AlbumsStackScreen} />
    </Tab.Navigator>
  );
}
