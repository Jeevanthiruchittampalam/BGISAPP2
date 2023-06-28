import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  const pressPage1Handler = () => {
    navigation.navigate('ELEC', { page: 1 });
  };

  const pressPage2Handler = () => {
    navigation.navigate('HVAC', { page: 2 });
  };

  const pressPage3Handler = () => {
    navigation.navigate('SummaryI', { page: 3 });
  };




  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/test3.jpg')} style={styles.backgroundImage}>
        <Text style={styles.logo}>Summary</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressPage1Handler}>
            <Text style={styles.buttonLabel}>ELEC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressPage2Handler}>
            <Text style={styles.buttonLabel}>HVAC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressPage3Handler}>
            <Text style={styles.buttonLabel}>Summary</Text>
          </TouchableOpacity>
          

        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#144E87',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
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
  buttonLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Menu;
