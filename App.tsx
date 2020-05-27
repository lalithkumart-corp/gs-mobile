import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Init from './src/screen/init/Init';
var SQLite = require('react-native-sqlite-storage')

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Init />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
