import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  const handleClientSelection = (client) => {
    switch (client) {
      case 'TELUS':
        navigation.navigate('U3TelusSummary');
        break;
      case 'SAIT':
        navigation.navigate('U3SAITSummary');
        break;
      case 'BC Hydro':
        navigation.navigate('U3BCHydroSummary');
        break;
      case 'AI':
        navigation.navigate('U3AISummary');
        break;
      default:
        break;
    }
  };

  const pressEditHandler = () => {
    navigation.navigate('Edit');
  };

  const pressSummaryHandler = () => {
    navigation.navigate('Summary');
  };

  const pressImportHandler = () => {
    navigation.navigate('FileIn');
  };

  const pressExportHandler = () => {
    navigation.navigate('FileOut');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/test2.jpg')} style={styles.backgroundImage}>
      <Text style={[styles.logo, { color: '#144E87' }]}>(VIEW MODE) Clients</Text>


        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.button, { backgroundColor: '#144E87' }]}
            onPress={() => handleClientSelection('AI')}
          >
            <Text style={styles.buttonLabel}>AI Summary</Text>
          </TouchableOpacity> 

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#144E87' }]}
            onPress={() => handleClientSelection('BC Hydro')}
          >
            <Text style={styles.buttonLabel}>BC Hydro Summary</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#144E87' }]}
            onPress={() => handleClientSelection('SAIT')}
          >
            <Text style={styles.buttonLabel}>SAIT Summary</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#144E87' }]}
            onPress={() => handleClientSelection('TELUS')}
          >
            <Text style={styles.buttonLabel}>TELUS Summary</Text>
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
    color: '#71d9e2',
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
