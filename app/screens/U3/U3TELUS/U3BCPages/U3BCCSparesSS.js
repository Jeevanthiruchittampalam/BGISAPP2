import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { firebase } from '../../../../../config';
//import './spreadsheet.css'; // Make sure to have the spreadsheet style file
import { ImageBackground } from 'react-native-web';

const Spreadsheet = () => {
  //items from the collection
  const [items, setItems] = useState([]);
  //new items to be added
  const [newItem, setNewItem] = useState({
    'CLLI Code': '',
    'Building Category': '',
    'Building Name': '',
    'Building Type': '',
    'Manufacturer': '',
    'Model': '',
    'Notes': '',
    'Parent Equipment/System': '',
    'Part Description': '',
    'Part Location': '',
    'Last Cost': '',
    'Quantity On Site': '',
    'Region': '',
    'Relationship to Parent Equipment/System': '',
    'Serial Number': '',
    'Vendor': '',
    'Date Entered': '',
    'dateRecieved': '',
    'requiredBy': '',
    'estimatedArrivalInterval':'',
    'Delivery Status': '',
    'Last Maintenance': '',
    'Upcoming Maintenance Date': '',
    'Mainenance Status': '',
    'Wish List': ''
  });
  //const [sortConfig, setSortConfig] = useState({field: '', direction: 'asc'});

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('BCSpares').onSnapshot((snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (value, field, index) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = async () => {
    try {
      const newItemRef = await firebase.firestore().collection('BCSpares').add(newItem);
      setItems([...items, { id: newItemRef.id, ...newItem }]);
      setNewItem({
        'CLLI Code': '',
        'Building Category': '',
        'Building Name': '',
        'Building Type': '',
        'Manufacturer': '',
        'Model': '',
        'Notes': '',
        'Parent Equipment/System': '',
        'Part Description': '',
        'Part Location': '',
        'Last Cost': '',
        'Quantity On Site': '',
        'Region': '',
        'Relationship to Parent Equipment/System': '',
        'Serial Number': '',
        'Vendor': '',
        'Date Entered': '',
        'dateRecieved': '',
        'requiredBy': '',
        'estimatedArrivalInterval':'',
        'Delivery Status': '',
        'Last Maintenance': '',
        'Upcoming Maintenance Date': '',
        'Mainenance Status': '',
        'Wish List': ''
      });
    } catch (error) {
      console.log('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await firebase.firestore().collection('BCSpares').doc(itemId).delete();
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const handleConfirm = async () => {
    try {
      const batch = firebase.firestore().batch();
  
      items.forEach((item) => {
        const itemRef = firebase.firestore().collection('BCSpares').doc(item.id);
        batch.set(itemRef, item); // Use 'set' instead of 'update' to save the entire item object
      });
  
      await batch.commit();
      Alert.alert('Changes saved successfully!');
    } catch (error) {
      console.log('Error saving changes:', error);
    }
  };

  const handleSort = (field) => {
    const sortedItems = [...items].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setItems(sortedItems);
  };

  const PressDelete = async () => {
    try {
      const collectionRef = firebase.firestore().collection('BCSpares');
      const snapshot = await collectionRef.get();
  
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
  
      console.log('Deletion successful!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText} onPress={() => handleSort('CLLI Code')}>CLLI Code</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Building Category')}>Building Category</Text>          
          <Text style={styles.headerText} onPress={() => handleSort('Building Name')}>Building Name</Text>
          <Text style={styles.headerText}onPress={() => handleSort('Building Type')}>Building Type</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Manufacturer')}>Manufacturer</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Model')}>Model</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Notes')}>Notes</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Parent Equipment/System')}>Parent Equipment/System</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Part Description')}>Part Description</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Part Location')}>Part Location</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Last Cost')}>Last Cost</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Quantity On Site')}>Quantity On Site</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Region')}>Region</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Relationship to Parent Equipment/System')}>Relationship to Parent Equipment/System</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Serial Number')}>Serial Number</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Vendor')}>Vendor</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Date Entered')}>Date Entered</Text>
          <Text style={styles.headerText} onPress={() => handleSort('dateRecieved')}>Date Recieved</Text>
          <Text style={styles.headerText} onPress={() => handleSort('requiredBy')}>Required By</Text>
          <Text style={styles.headerText} onPress={() => handleSort('estimatedArrivalInterval')}>Estimated Arrival Interval</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Delivery Status')}>Delivery Status</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Last Maintenance')}>Last Maintenance </Text>
          <Text style={styles.headerText} onPress={() => handleSort('Upcoming Maintenance Date')}>Upcoming Maintenance Date</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Maintenance Status')}>Maintenance Status</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Wish List')}>Wish List (Y/N)</Text>
          
        </View>
        {items.map((item, index) => (
          <View style={styles.dataRow} key={item.id}>
            <TextInput
              style={styles.input}
              value={item['CLLI Code']}
              onChangeText={(value) => handleChange(value, 'CLLI Code', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Building Category']}
              onChangeText={(value) => handleChange(value, 'Building Category', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Building Name']}
              onChangeText={(value) => handleChange(value, 'Building Name', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Building Type']}
              onChangeText={(value) => handleChange(value, 'Building Type', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Manufacturer']}
              onChangeText={(value) => handleChange(value, 'Manufacturer', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Model']}
              onChangeText={(value) => handleChange(value, 'Model', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Notes']}
              onChangeText={(value) => handleChange(value, 'Notes', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Parent Equipment/System']}
              onChangeText={(value) => handleChange(value, 'Parent Equipment/System', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Part Description']}
              onChangeText={(value) => handleChange(value, 'Part Description', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Part Location']}
              onChangeText={(value) => handleChange(value, 'Part Location', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Last Cost']}
              onChangeText={(value) => handleChange(value, 'Last Cost', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Quantity On Site']}
              onChangeText={(value) => handleChange(value, 'Quantity On Site', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Region']}
              onChangeText={(value) => handleChange(value, 'Region', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Relationship to Parent Equipment/System']}
              onChangeText={(value) => handleChange(value, 'Relationship to Parent Equipment/System', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Serial Number']}
              onChangeText={(value) => handleChange(value, 'Serial Number', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Vendor']}
              onChangeText={(value) => handleChange(value, 'Vendor', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Date Entered']}
              onChangeText={(value) => handleChange(value, 'Date Entered', index)}
            />
            <TextInput
              style={styles.input}
              value={item['dateReceived']}
              onChangeText={(value) => handleChange(value, 'dateRecieved', index)}
            />
            <TextInput
              style={styles.input}
              value={item['requiredBy']}
              onChangeText={(value) => handleChange(value, 'requiredBy', index)}
            />
            <TextInput
              style={styles.input}
              value={item['estimatedArrivalInterval']}
              onChangeText={(value) => handleChange(value, 'estimatedArrivalInterval', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Delivery Status']}
              onChangeText={(value) => handleChange(value, 'Delivery Status', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Last Maintenace']}
              onChangeText={(value) => handleChange(value, 'Last Maintenance', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Upcoming Maintenance Date']}
              onChangeText={(value) => handleChange(value, 'Upcoming Maintenance Date', index)}
            />
            <TextInput
              style={styles.input}
              value={item['Maintenance Status']}
              onChangeText={(value) => handleChange(value, 'Maintenance Status', index)}
            />

            <TextInput
              style={styles.input}
              value={item['Wish List']}
              onChangeText={(value) => handleChange(value, 'Wish List', index)}
            />
            
          </View>
        ))}


      </View>
    </ScrollView>
    
  );
  
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    //flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginRight: 10,
    width:100,
  },
  dataRow: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginRight: 10,
    width:100,
  },
  deleteButton: {
    color: 'red',
  },
  addRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
  addButton: {
    color: 'green',
    fontWeight: 'bold',
  },
  confirmButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
  },
};

export default Spreadsheet;
