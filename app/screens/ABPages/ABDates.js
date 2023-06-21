import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebase } from '../../../config';

const BCSparesPage = () => {
  const [spares, setSpares] = useState([]);

  useEffect(() => {
    const fetchSpares = async () => {
      try {
        const collection = 'ABSpares';
        const querySnapshot = await firebase.firestore().collection(collection).get();

        const sparesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setSpares(sparesData);
      } catch (error) {
        console.error('Error fetching BCSpares:', error);
      }
    };

    fetchSpares();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Part Description</Text>
        <Text style={styles.headerText}>Manufacturer</Text>
        <Text style={styles.headerText}>Model</Text>
        <Text style={styles.headerText}>Parent Equipment/System</Text>
        <Text style={styles.headerText}>Date Entered</Text>
        <Text style={styles.headerText}>Date Received</Text>
      </View>
      {spares.map((spare) => (
        <View key={spare.id} style={styles.item}>
          <Text style={styles.itemText}>{spare['Part Description']}</Text>
          <Text style={styles.itemText}>{spare['Manufacturer']}</Text>
          <Text style={styles.itemText}>{spare['Model']}</Text>
          <Text style={styles.itemText}>{spare['Parent Equipment/System']}</Text>
          <Text style={styles.itemText}>{spare['Date Entered']}</Text>
          <Text style={styles.itemText}>{spare.dateReceived}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
  },
});

export default BCSparesPage;
