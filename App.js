import * as React from 'react';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeTabs} from './HomeTabs';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import themeReducer from './src/components/actions/themeReducer';
import reduxStore from './persistConfig';

export default function App() {
  const {store, persistor} = reduxStore();
  useEffect(() => {
    return () => {
      TrackPlayer.destroy();
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <HomeTabs />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
