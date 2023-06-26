import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const pressLoginHandler = () => {
    navigation.navigate('Login');
  };

  const pressRegisterHandler = () => {
    navigation.navigate('BCSpares');
  };



  return (
    <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/BGIS.png')} style={styles.image} />
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity style={[styles.loginButton, { backgroundColor: '#144E87' }]} onPress={pressLoginHandler}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.registerButton, { backgroundColor: '#71d9e2' }]} onPress={
          pressRegisterHandler
        }>
          <Text style={styles.buttonText}> About </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  loginButton: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButton: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default WelcomeScreen;
