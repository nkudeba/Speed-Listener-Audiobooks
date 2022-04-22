import * as React from 'react';
import {HomeScreen} from './src/components/screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumTracks from './src/components/screens/albumtracks';
const HomeStack = createStackNavigator();
import {Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch, connect} from 'react-redux';

// The stack navigator pulls in all screens that will be accessed through links on the default screen, with the default screen on top

export function AlbumsStackScreen() {
  const theme = useSelector(state => state.themeReducer.theme);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="My Books"
        options={{
          title: 'My Books',
          headerStyle: {
            backgroundColor: theme.HIGHLIGHT_COLOR,
          },
          headerTintColor: theme.TEXT_COLOR,
        }}
        component={AlbumTracks}
      />
      <HomeStack.Screen name="Home" component={HomeScreen} />
      {/* other screens */}
    </HomeStack.Navigator>
  );
}

const options = {title: 'My home'};
