/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App.tsx';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import {getStore} from './src/store/configureStore';

const store = getStore();

const RNRedux = () => (
    <Provider store = { store }>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  )
  
AppRegistry.registerComponent(appName, () => RNRedux);
