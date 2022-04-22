import * as React from 'react';
import {ProfileScreen} from './src/components/screens/ProfileScreen';
import AlbumTracks from './src/components/screens/albumtracks';
import {createStackNavigator} from '@react-navigation/stack';
const ProfileStack = createStackNavigator();
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';

// The stack navigator pulls in all screens that will be accessed through links on the default screen, with the default screen on top

export function AlbumStackingScreen() {
  const {theme} = useTheme();
  // console.log('MY THEME')
  // console.log(theme);
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={AlbumTracks} />
      {/* other screens */}
    </ProfileStack.Navigator>
  );
}
