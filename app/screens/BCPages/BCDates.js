import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { firebase } from '../../../config';

const BCSparesPage = () => {
  const [spares, setSpares] = useState([]);

  useEffect(() => {
    const fetchSpares = async () => {
      try {
        const collection = 'BCSpares';
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

  const handleChange = (id, field, value) => {
    setSpares((prevSpares) =>
      prevSpares.map((spare) =>
        spare.id === id ? { ...spare, [field]: value } : spare
      )
    );
  };

  const saveField = async (id, field, value) => {
    try {
      const collection = 'BCSpares';

      // Update the field value in the collection
      await firebase.firestore().collection(collection).doc(id).update({
        [field]: value,
      });

      // Update the field value in the component state
      setSpares((prevSpares) =>
        prevSpares.map((spare) =>
          spare.id === id ? { ...spare, [field]: value } : spare
        )
      );

      console.log(`${field} value saved successfully!`);
    } catch (error) {
      console.error(`Error saving ${field} value:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.column]}>Part Description</Text>
          <Text style={[styles.headerText, styles.column]}>Manufacturer</Text>
          <Text style={[styles.headerText, styles.column]}>Model</Text>
          <Text style={[styles.headerText, styles.column]}>Parent Equipment/System</Text>
          <Text style={[styles.headerText, styles.column]}>Date Entered</Text>
          <Text style={[styles.headerText, styles.column]}>Date Received</Text>
          <Text style={[styles.headerText, styles.column]}>Required By</Text>
          <Text style={[styles.headerText, styles.column]}>Estimated Arrival Interval</Text>
          <Text style={[styles.headerText, styles.column]}>Status</Text>
        </View>
        {spares.map((spare) => (
          <View key={spare.id} style={styles.item}>
            <Text style={[styles.itemText, styles.column]}>{spare['Part Description']}</Text>
            <Text style={[styles.itemText, styles.column]}>{spare['Manufacturer']}</Text>
            <Text style={[styles.itemText, styles.column]}>{spare['Model']}</Text>
            <Text style={[styles.itemText, styles.column]}>
              {spare['Parent Equipment/System']}
            </Text>
            <Text style={[styles.itemText, styles.column]}>{spare['Date Entered']}</Text>
            <TextInput
              style={[styles.input, styles.column]}
              value={spare.dateReceived}
              onChangeText={(value) => handleChange(spare.id, 'dateReceived', value)}
            />
            <TextInput
              style={[styles.input, styles.column]}
              value={spare.requiredBy}
              onChangeText={(value) => handleChange(spare.id, 'requiredBy', value)}
            />
            <TextInput
              style={[styles.input, styles.column]}
              value={spare.estimatedArrivalInterval}
              onChangeText={(value) =>
                handleChange(spare.id, 'estimatedArrivalInterval', value)
              }
            />
            <TextInput
              style={[styles.input, styles.column]}
              value={spare.status}
              onChangeText={(value) => handleChange(spare.id, 'status', value)}
            />
            <Button
              title="Save"
              onPress={() => {
                saveField(spare.id, 'dateReceived', spare.dateReceived);
                saveField(spare.id, 'requiredBy', spare.requiredBy);
                saveField(spare.id, 'estimatedArrivalInterval', spare.estimatedArrivalInterval);
                saveField(spare.id, 'status', spare.status);
              }}
            />
          </View>
        ))}
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  column: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 14,
    flex: 1,
  },
  input: {
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 5,
    flex: 1,
  },
});

export default BCSparesPage;
