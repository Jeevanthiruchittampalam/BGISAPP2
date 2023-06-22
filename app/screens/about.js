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
                This Prototype Application was designed to improve upon the current inventory and procurement system
                used at BGIS.
              </Text>
            </View>
          </View>
          <Text style={styles.label}>Features</Text>
          <ScrollView style={styles.bulletPointsContainer}>
            <View style={styles.bubble}>
              <Text style={styles.bulletPoint}>Intuitive and Visually Appealing: Complete</Text>
              <Text style={styles.bulletPoint}>User Login: Functional, Need to Import Users</Text>
              <Text style={styles.bulletPoint}>Database Storage of Data: Complete</Text>
              <Text style={styles.bulletPoint}>Editable Data: Complete</Text>
              <Text style={styles.bulletPoint}>History of Edits: Partially Complete</Text>
              <Text style={styles.bulletPoint}>Notifications of shortages: Partial Solution</Text>
              <Text style={styles.bulletPoint}>Information Sorting: Complete</Text>
              <Text style={styles.bulletPoint}>Refreshable: Complete</Text>
              <Text style={styles.bulletPoint}>Leave Time, Criticality, Ordered vs Recieved, Images: Complete</Text>
              <Text style={styles.bulletPoint}>Maintenance Schedule: Complete</Text>
              <Text style={styles.bulletPoint}>Bonuses: Web scraping, auto procurement: Incomplete</Text>
              <Text style={styles.bulletPoint}>Version: 2.9.3</Text>
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
