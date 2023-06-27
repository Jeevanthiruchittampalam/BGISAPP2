import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { firebase } from '../../../config';
//import './spreadsheet.css'; // Make sure to have the spreadsheet style file
import { ImageBackground } from 'react-native-web';

const Spreadsheet = () => {
  //items from the collection
  const [items, setItems] = useState([]);
  //new items to be added
  const [newItem, setNewItem] = useState({
    'Region': '',
    'Building': '',
    'Critical Spare Description': '',
    '(Model Name/Number)': '',
    'Parent Equipment/System': '',
    'Relationship to parent equipment/ system': '',
    'Reason Critical': '',
    'Criticality of Part ': '',
    'Notes': '',
    'Source (supplier)': '',
    'Lead Time  to Delivery (days/weeks)': '',
    'Budget Estimate ($)': '',
    'CAP/OPEX': '',
    'Inventory on site': '',
    'Inventory Location': '',
    'Comments': ''
  });
  //const [sortConfig, setSortConfig] = useState({field: '', direction: 'asc'});

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('HVAC').onSnapshot((snapshot) => {
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
      const newItemRef = await firebase.firestore().collection('HVAC').add(newItem);
      setItems([...items, { id: newItemRef.id, ...newItem }]);
      setNewItem({
    'Region': '',
    'Building': '',
    'Critical Spare Description': '',
    '(Model Name/Number)': '',
    'Parent Equipment/System': '',
    'Relationship to parent equipment/ system': '',
    'Reason Critical': '',
    'Criticality of Part ': '',
    'Notes': '',
    'Source (supplier)': '',
    'Lead Time  to Delivery (days/weeks)': '',
    'Budget Estimate ($)': '',
    'CAP/OPEX': '',
    'Inventory on site': '',
    'Inventory Location': '',
    'Comments': ''
      });
    } catch (error) {
      console.log('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await firebase.firestore().collection('HVAC').doc(itemId).delete();
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const handleConfirm = async () => {
    try {
      const batch = firebase.firestore().batch();
  
      items.forEach((item) => {
        const itemRef = firebase.firestore().collection('HVAC').doc(item.id);
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
      const collectionRef = firebase.firestore().collection('HVAC');
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

    /* 'Region': '',
    'Building': '',
    'Critical Spare Description': '',
    '(Model Name/Number)': '',
    'Parent Equipment/System': '',
    'Relationship to parent equipment/ system': '',
    'Reason Critical': '',
    'Criticality of Part ': '',
    'Notes': '',
    'Source (supplier)': '',
    'Lead Time  to Delivery (days/weeks)': '',
    'Budget Estimate ($)': '',
    'CAP/OPEX': '',
    'Inventory on site': '',
    'Inventory Location': '',
    'Comments': ''*/
    
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText} onPress={() => handleSort('Region')}>CLLI Code</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Building')}>Building Category</Text>          
          <Text style={styles.headerText} onPress={() => handleSort('Critical Spare Description')}>Building Name</Text>
          <Text style={styles.headerText}onPress={() => handleSort('(Model Name/Number)')}>Building Type</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Parent Equipment/System')}>Manufacturer</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Relationship to parent equipment/ system')}>Model</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Reason Critical')}>Notes</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Criticality of Part')}>Parent Equipment/System</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Notes')}>Part Description</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Source (supplier)')}>Part Location</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Lead Time  to Delivery (days/weeks)')}>Last Cost</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Budget Estimate ($)')}>Quantity on Site</Text>
          <Text style={styles.headerText} onPress={() => handleSort('CAP/OPEX')}>Region</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Inventory on site')}>Relationship to Parent Equipment/System</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Inventory Location')}>Serial Number</Text>
          <Text style={styles.headerText} onPress={() => handleSort('Comments')}>Vendor</Text>

        </View>
        {items.map((item, index) => (
          <View style={styles.dataRow} key={item.id}>
            <TextInput
  style={styles.input}
  value={item['Region']}
  onChangeText={(value) => handleChange(value, 'Region', index)}
/>
<TextInput
  style={styles.input}
  value={item['Building']}
  onChangeText={(value) => handleChange(value, 'Building', index)}
/>
<TextInput
  style={styles.input}
  value={item['Critical Spare Description']}
  onChangeText={(value) => handleChange(value, 'Critical Spare Description', index)}
/>
<TextInput
  style={styles.input}
  value={item['(Model Name/Number)']}
  onChangeText={(value) => handleChange(value, '(Model Name/Number)', index)}
/>
<TextInput
  style={styles.input}
  value={item['Parent Equipment/System']}
  onChangeText={(value) => handleChange(value, 'Parent Equipment/System', index)}
/>
<TextInput
  style={styles.input}
  value={item['Relationship to parent equipment/ system']}
  onChangeText={(value) => handleChange(value, 'Relationship to parent equipment/ system', index)}
/>
<TextInput
  style={styles.input}
  value={item['Reason Critical']}
  onChangeText={(value) => handleChange(value, 'Reason Critical', index)}
/>
<TextInput
  style={styles.input}
  value={item['Criticality of Part ']}
  onChangeText={(value) => handleChange(value, 'Criticality of Part ', index)}
/>
<TextInput
  style={styles.input}
  value={item['Notes']}
  onChangeText={(value) => handleChange(value, 'Notes', index)}
/>
<TextInput
  style={styles.input}
  value={item['Source (supplier)']}
  onChangeText={(value) => handleChange(value, 'Source (supplier)', index)}
/>
<TextInput
  style={styles.input}
  value={item['Lead Time  to Delivery (days/weeks)']}
  onChangeText={(value) => handleChange(value, 'Lead Time  to Delivery (days/weeks)', index)}
/>
<TextInput
  style={styles.input}
  value={item['Budget Estimate ($)']}
  onChangeText={(value) => handleChange(value, 'Budget Estimate ($)', index)}
/>
<TextInput
  style={styles.input}
  value={item['CAP/OPEX']}
  onChangeText={(value) => handleChange(value, 'CAP/OPEX', index)}
/>
<TextInput
  style={styles.input}
  value={item['Inventory on site']}
  onChangeText={(value) => handleChange(value, 'Inventory on site', index)}
/>
<TextInput
  style={styles.input}
  value={item['Inventory Location']}
  onChangeText={(value) => handleChange(value, 'Inventory Location', index)}
/>
<TextInput
  style={styles.input}
  value={item['Comments']}
  onChangeText={(value) => handleChange(value, 'Comments', index)}
/>

            
            
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.addRow}>
        <TextInput
  style={styles.input}
  value={newItem['Region']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Region': value })}
  placeholder="Region"
/>
<TextInput
  style={styles.input}
  value={newItem['Building']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Building': value })}
  placeholder="Building Category"
/>
<TextInput
  style={styles.input}
  value={newItem['Critical Spare Description']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Critical Spare Description': value })}
  placeholder="Building Name"
/>
<TextInput
  style={styles.input}
  value={newItem['(Model Name/Number)']}
  onChangeText={(value) => setNewItem({ ...newItem, '(Model Name/Number)': value })}
  placeholder="Building Type"
/>
<TextInput
  style={styles.input}
  value={newItem['Parent Equipment/System']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Parent Equipment/System': value })}
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
  value={newItem['Quantity on Site']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Quantity on Site': value })}
  placeholder="Quantity on Site"
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
        <TouchableOpacity onPress={
          handleConfirm
          //PressDelete()
        }>
          <Text style={styles.confirmButton}>Confirm</Text>
        </TouchableOpacity>
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
