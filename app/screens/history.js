import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';
import { firebase } from '../../config';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch the edit history from the Firestore collection
    const fetchHistory = async () => {
  try {
    const currentUser = firebase.auth().currentUser;
    const itemsRef = firebase.firestore().collection('items');
    const querySnapshot = await itemsRef.orderBy('dateEntered', 'desc').get();
    const historyData = querySnapshot.docs.map((doc) => ({
      action: doc.data().action,
      user: doc.data().user ? doc.data().user : (currentUser ? currentUser.email : 'Unknown User'),
      timestamp: doc.data().dateEntered ? doc.data().dateEntered.toDate().toLocaleString() : 'Unknown Timestamp',
    }));
    setHistory(historyData);
  } catch (error) {
    console.error('Error fetching history:', error);
  }
};


    fetchHistory();
  }, []);

  return (
    <ImageBackground source={require('../assets/test4.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Edit History</Text>
      {history.length === 0 ? (
        <Text>No edit history available</Text>
      ) : (
        <View>
          {history.map((entry, index) => (
            <View key={index} style={styles.entryContainer}>
              <Text style={styles.entryText}>
                Action: {entry.action} | User: {entry.user} | Timestamp: {entry.timestamp}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entryContainer: {
    marginBottom: 10,
  },
  entryText: {
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  
});

export default History;
