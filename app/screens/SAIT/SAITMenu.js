import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {


  const pressEditHandler = () => {
    navigation.navigate('Edit');
  };

  const pressBCHandler = () => {
    navigation.navigate('BCMenu');
  };

  const pressCentralHandler = () => {
    navigation.navigate('CMenu');
  };
  const pressABHandler = () => {
    navigation.navigate('ABMenu');
  };

  const pressQCHandler = () => {
    navigation.navigate('QMenu');
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
  const pressSummaryHandler = () => {
    navigation.navigate('SAITSummary');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/door.jpg')} style={styles.backgroundImage}>
        <Text style={styles.logo}>SAIT</Text>

        <View style={styles.buttonContainer}>
     

          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressSummaryHandler}>
            <Text style={styles.buttonLabel}>Regions Summary</Text>
          </TouchableOpacity>
{/* 
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressEditHandler}>
            <Text style={styles.buttonLabel}>Quick Add</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressImportHandler}>
            <Text style={styles.buttonLabel}>Import</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#144E87' }]} onPress={pressExportHandler}>
            <Text style={styles.buttonLabel}>Export</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //71d9e2
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
