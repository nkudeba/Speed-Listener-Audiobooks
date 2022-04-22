import * as React from 'react';
import {HomeScreen} from './src/components/screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumTracks from './src/components/screens/albumtracks';
import {useSelector, useDispatch, connect} from 'react-redux';
const HomeStack = createStackNavigator();

// The stack navigator pulls in all screens that will be accessed through links on the default screen, with the default screen on top

export function HomeStackScreen() {
  const theme = useSelector(state => state.themeReducer.theme);
  console.log('HOME THEME');
  console.log(theme);
  const options = {
    title: 'Now playing',
    headerStyle: {
      backgroundColor: theme.HIGHLIGHT_COLOR,
    },
    headerTintColor: theme.TEXT_COLOR,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={options} name="Home" component={HomeScreen} />
      {/* <HomeStack.Screen name="Bookss" component={AlbumTracks} /> */}
      {/* other screens */}
    </HomeStack.Navigator>
  );
}
