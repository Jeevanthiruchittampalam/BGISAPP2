import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import HomeStack from './app/routes/homeStack';


const App = () => {
  return <HomeStack />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;


//IOS: 456116842485-c7p5mn9l1iqqflbi3lvota4nqr059ts9.apps.googleusercontent.com
//WEB: 456116842485-pev8aguku1apvft5178u4r1eghah3flm.apps.googleusercontent.com
//AND: 456116842485-bnjskjeg1ar3vnr91ghe3j5i403j0009.apps.googleusercontent.com
//AND2: 456116842485-mv3ni02o2s7oqfnelev86848m6g8gtr0.apps.googleusercontent.com