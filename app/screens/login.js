import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { firebase } from '../../config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const pressLoginHandler = () => {
    navigation.navigate('Menu');
  };

  const handleLogin = async () => {
    try {
      const usersRef = firebase.firestore().collection('users');
      const snapshot = await usersRef
        .where('email', '==', email)
        .where('password', '==', password)
        .get();

      if (snapshot.empty) {
        setErrorMessage('Error, invalid sign-in, please try again.');
      } else {
        // User is authorized, navigate to the "View" page
        pressLoginHandler();
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <ImageBackground source={require('../assets/test2.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={[styles.logo, { color: '#144E87', fontSize: 40, marginTop: 30 }]}>BGIS</Text>
        <Text style={[styles.loginText, { color: '#144E87' }]}>Login</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#71d9e2' }]}
          placeholder="Email"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#71d9e2' }]}
          placeholder="Password"
          placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
