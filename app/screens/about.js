import React from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/test5.jpg')} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View style={styles.ovalShape}>
              <Text style={styles.text}>
                This Application was designed to improve upon the current inventory and procurement system
                used at BGIS.
              </Text>
            </View>
          </View>
          <Text style={styles.label}>Features</Text>
          <ScrollView style={styles.bulletPointsContainer}>
            <View style={styles.bubble}>
              <Text style={styles.bulletPoint}>Version: 3.4.4</Text>
              <Text style={styles.bulletPoint}>Last Update: July 14, 2023</Text>
            </View>
          </ScrollView>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20, // Add paddingTop to lower the content
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ovalShape: {
    backgroundColor: '#144E87', // Change the button color to #144E87
    borderRadius: 20, // Decrease the borderRadius to make it rounder
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  bulletPointsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  bubble: {
    backgroundColor: '#144E87', // Set the bubble color to #144E87
    borderRadius: 10, // Adjust the borderRadius as desired
    padding: 10, // Add padding to give space inside the bubble
  },
  bulletPoint: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default About;
