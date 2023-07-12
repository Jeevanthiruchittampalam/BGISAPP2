import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { firebase } from '../../../../config';
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
    'Vendor': ''
  });
  //const [sortConfig, setSortConfig] = useState({field: '', direction: 'asc'});

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('CWS').onSnapshot((snapshot) => {
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
      const newItemRef = await firebase.firestore().collection('CWS').add(newItem);
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
        'Vendor': ''
      });
    } catch (error) {
      console.log('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await firebase.firestore().collection('CWS').doc(itemId).delete();
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const handleConfirm = async () => {
    try {
      const batch = firebase.firestore().batch();
  
      items.forEach((item) => {
        const itemRef = firebase.firestore().collection('CWS').doc(item.id);
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
  

  return (
    //<ImageBackground source={require('../assets/darkmountains.jpg')} style={styles.backgroundImage}>
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
            
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.addRow}>
          <TextInput
            style={styles.input}
            value={newItem['CLLI Code']}
            onChangeText={(value) => setNewItem({ ...newItem, 'CLLI Code': value })}
            placeholder="CLLI Code"
          />
          <TextInput
            style={styles.input}
            value={newItem['Building Category']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Building Category': value })}
            placeholder="Building Category"
          />
          <TextInput
            style={styles.input}
            value={newItem['Building Name']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Building Name': value })}
            placeholder="Building Name"
          />
          <TextInput
            style={styles.input}
            value={newItem['Building Type']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Building Type': value })}
            placeholder="Building Type"
          />
          <TextInput
            style={styles.input}
            value={newItem['Manufacturer']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Manufacturer': value })}
            placeholder="Manufacturer"
          />
          <TextInput
            style={styles.input}
            value={newItem['Model']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Model': value })}
            placeholder="Model"
          />
          <TextInput
            style={styles.input}
            value={newItem['Notes']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Notes': value })}
            placeholder="Notes"
          />
          <TextInput
            style={styles.input}
            value={newItem['Parent Equipment/System']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Parent Equipment/System': value })}
            placeholder="Parent Equipment/System"
          />
          <TextInput
            style={styles.input}
            value={newItem['Part Description']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Part Description': value })}
            placeholder="Part Description"
          />
          <TextInput
            style={styles.input}
            value={newItem['Part Location']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Part Location': value })}
            placeholder="Part Location"
          />
          <TextInput
            style={styles.input}
            value={newItem['Last Cost']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Last Cost': value })}
            placeholder="Last Cost"
          />
          <TextInput
            style={styles.input}
            value={newItem['Quantity On Site']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Quantity On Site': value })}
            placeholder="Quantity On Site"
          />
          <TextInput
            style={styles.input}
            value={newItem['Region']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Region': value })}
            placeholder="Region"
          />
          <TextInput
            style={styles.input}
            value={newItem['Relationship to Parent Equipment/System']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Relationship to Parent Equipment/System': value })}
            placeholder="Relationship to Parent Equipment/System"
          />
          <TextInput
            style={styles.input}
            value={newItem['Serial Number']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Serial Number': value })}
            placeholder="Serial Number"
          />
          <TextInput
            style={styles.input}
            value={newItem['Vendor']}
            onChangeText={(value) => setNewItem({ ...newItem, 'Vendor': value })}
            placeholder="Vendor"
          />
          <TouchableOpacity onPress={handleAddItem}>
            <Text style={styles.addButton}>Add</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleConfirm}>
          <Text style={styles.confirmButton}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    //</ImageBackground>
  );
  
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginRight: 10,
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
