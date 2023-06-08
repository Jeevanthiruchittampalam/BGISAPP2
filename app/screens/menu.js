import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  const pressAbout1Handler = () => {
    navigation.navigate('About');
  };

  const pressEditHandler = () => {
    navigation.navigate('Edit');
  };

  const pressRemoveHandler = () => {
    navigation.navigate('Delete');
  };

  const pressTestHandler = () => {
    navigation.navigate('SSF');
  };

  const pressImportHandler = () => {
    navigation.navigate('FileIn');
  };

  const pressExportHandler = () => {
    navigation.navigate('FileOut');
  };
  const pressHistoryHandler = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/door.jpg')} style={styles.backgroundImage}>
        <Text style={styles.logo}>BGIS</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressEditHandler}>
            <Text style={styles.buttonLabel}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressRemoveHandler}>
            <Text style={styles.buttonLabel}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressTestHandler}>
            <Text style={styles.buttonLabel}>Spreadsheet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressHistoryHandler}>
            <Text style={styles.buttonLabel}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressAbout1Handler}>
            <Text style={styles.buttonLabel}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#71d9e2' }]} onPress={pressImportHandler}>
            <Text style={styles.buttonLabel}>Import</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#71d9e2' }]} onPress={pressExportHandler}>
            <Text style={styles.buttonLabel}>Export</Text>
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
