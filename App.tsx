/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Home from './src/pages/Home';
import Routes from './src/navigation/routes';
function App(): JSX.Element {

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
