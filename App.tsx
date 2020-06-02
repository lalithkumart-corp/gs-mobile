import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Init from './src/screen/init/Init';
var SQLite = require('react-native-sqlite-storage')

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        {/* <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"> */}
        <Init />
        {/* </ScrollView>
        </SafeAreaView> */}
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
