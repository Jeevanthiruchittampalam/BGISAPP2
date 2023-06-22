import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { firebase } from '../../../config';

const ABMaintenancePage = () => {
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
        console.error('Error fetching ABSpares:', error);
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
      const collection = 'ABSpares';

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
          <Text style={[styles.headerText, styles.column]}>Notes</Text>
          <Text style={[styles.headerText, styles.column]}>Building Name</Text>
          <Text style={[styles.headerText, styles.column]}>Last Maintenance</Text>
          <Text style={[styles.headerText, styles.column]}>Upcoming Maintenance Date</Text>
          <Text style={[styles.headerText, styles.column]}>Status</Text>
        </View>
        {spares.map((spare) => {
          const isUrgent = spare['Maintenance Status'] && spare['Maintenance Status'].toLowerCase() === 'urgent';
          return (
            <View
              key={spare.id}
              style={[styles.item, isUrgent ? styles.urgentRow : null]}
            >
              <Text style={[styles.itemText, styles.column]}>{spare['Part Description']}</Text>
              <Text style={[styles.itemText, styles.column]}>{spare['Manufacturer']}</Text>
              <Text style={[styles.itemText, styles.column]}>{spare['Model']}</Text>
              <Text style={[styles.itemText, styles.column]}>
                {spare['Parent Equipment/System']}
              </Text>
              <Text style={[styles.itemText, styles.column]}>{spare['Notes']}</Text>
              <Text style={[styles.itemText, styles.column]}>{spare['Building Name']}</Text>
              <TextInput
                style={[styles.input, styles.column]}
                value={spare['Last Maintenance']}
                onChangeText={(value) =>
                  handleChange(spare.id, 'Last Maintenance', value)
                }
              />
              <TextInput
                style={[styles.input, styles.column]}
                value={spare['Upcoming Maintenance Date']}
                onChangeText={(value) =>
                  handleChange(spare.id, 'Upcoming Maintenance Date', value)
                }
              />
              <TextInput
                style={[styles.input, styles.column]}
                value={spare['Maintenance Status']}
                onChangeText={(value) =>
                  handleChange(spare.id, 'Maintenance Status', value)
                }
              />
              <Button
                title="Save"
                onPress={() => {
                  saveField(spare.id, 'Last Maintenance', spare['Last Maintenance']);
                  saveField(
                    spare.id,
                    'Upcoming Maintenance Date',
                    spare['Upcoming Maintenance Date']
                  );
                  saveField(spare.id, 'Maintenance Status', spare['Maintenance Status']);
                }}
              />
            </View>
          );
        })}
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
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
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
    textAlign: 'center',
  },
  input: {
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 5,
    flex: 1,
    textAlign: 'center',
  },
  urgentRow: {
    backgroundColor: 'red',
  },
});

export default ABMaintenancePage;
