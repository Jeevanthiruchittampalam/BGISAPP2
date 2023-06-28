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
    'Building ID': '',
    'Category': '',
    'Next Maintenance Cycle': '',
    'Critical Spare Description': '',
    'Manufacturer': '',
    'Model': '',
    'Serial #': '',
    'Size': '',
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
    const unsubscribe = firebase.firestore().collection('ELEC').onSnapshot((snapshot) => {
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
      const newItemRef = await firebase.firestore().collection('ELEC').add(newItem);
      setItems([...items, { id: newItemRef.id, ...newItem }]);
      setNewItem({
        'Region': '',
        'Building': '',
        'Building ID': '',
        'Category': '',
        'Next Maintenance Cycle': '',
        'Critical Spare Description': '',
        'Manufacturer': '',
        'Model': '',
        'Serial #': '',
        'Size': '',
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
      await firebase.firestore().collection('ELEC').doc(itemId).delete();
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const handleConfirm = async () => {
    try {
      const batch = firebase.firestore().batch();
  
      items.forEach((item) => {
        const itemRef = firebase.firestore().collection('ELEC').doc(item.id);
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
      const collectionRef = firebase.firestore().collection('ELEC');
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
        <Text style={styles.headerText} onPress={() => handleSort('Region')}>Region</Text>
<Text style={styles.headerText} onPress={() => handleSort('Building')}>Building</Text>
<Text style={styles.headerText} onPress={() => handleSort('Building ID')}>Building ID</Text>
<Text style={styles.headerText} onPress={() => handleSort('Category')}>Category</Text>
<Text style={styles.headerText} onPress={() => handleSort('Next Maintenance Cycle')}>Next Maintenance Cycle</Text>
<Text style={styles.headerText} onPress={() => handleSort('Critical Spare Description')}>Critical Spare Description</Text>
<Text style={styles.headerText} onPress={() => handleSort('Manufacturer')}>Manufacturer</Text>
<Text style={styles.headerText} onPress={() => handleSort('Model')}>Model</Text>
<Text style={styles.headerText} onPress={() => handleSort('Serial #')}>Serial #</Text>
<Text style={styles.headerText} onPress={() => handleSort('Size')}>Size</Text>
<Text style={styles.headerText} onPress={() => handleSort('Parent Equipment/System')}>Parent Equipment/System</Text>
<Text style={styles.headerText} onPress={() => handleSort('Relationship to parent equipment/ system')}>Relationship to parent equipment/system</Text>
<Text style={styles.headerText} onPress={() => handleSort('Reason Critical')}>Reason Critical</Text>
<Text style={styles.headerText} onPress={() => handleSort('Criticality of Part')}>Criticality of Part</Text>
<Text style={styles.headerText} onPress={() => handleSort('Notes')}>Notes</Text>
<Text style={styles.headerText} onPress={() => handleSort('Source (supplier)')}>Source (supplier)</Text>
<Text style={styles.headerText} onPress={() => handleSort('Lead Time to Delivery (days/weeks)')}>Lead Time to Delivery (days/weeks)</Text>
<Text style={styles.headerText} onPress={() => handleSort('Budget Estimate ($)')}>Budget Estimate ($)</Text>
<Text style={styles.headerText} onPress={() => handleSort('CAP/OPEX')}>CAP/OPEX</Text>
<Text style={styles.headerText} onPress={() => handleSort('Inventory on site')}>Inventory on site</Text>
<Text style={styles.headerText} onPress={() => handleSort('Inventory Location')}>Inventory Location</Text>
<Text style={styles.headerText} onPress={() => handleSort('Comments')}>Comments</Text>

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
  value={item['Building ID']}
  onChangeText={(value) => handleChange(value, 'Building ID', index)}
/>
<TextInput
  style={styles.input}
  value={item['Category']}
  onChangeText={(value) => handleChange(value, 'Category', index)}
/>
<TextInput
  style={styles.input}
  value={item['Next Maintenance Cycle']}
  onChangeText={(value) => handleChange(value, 'Next Maintenance Cycle', index)}
/>
<TextInput
  style={styles.input}
  value={item['Critical Spare Description']}
  onChangeText={(value) => handleChange(value, 'Critical Spare Description', index)}
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
  value={item['Serial #']}
  onChangeText={(value) => handleChange(value, 'Serial #', index)}
/>
<TextInput
  style={styles.input}
  value={item['Size']}
  onChangeText={(value) => handleChange(value, 'Size', index)}
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
  placeholder="Building"
/>
<TextInput
  style={styles.input}
  value={newItem['Building ID']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Building ID': value })}
  placeholder="Building ID"
/>
<TextInput
  style={styles.input}
  value={newItem['Category']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Category': value })}
  placeholder="Category"
/>
<TextInput
  style={styles.input}
  value={newItem['Next Maintenance Cycle']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Next Maintenance Cycle': value })}
  placeholder="Next Maintenance Cycle"
/>
<TextInput
  style={styles.input}
  value={newItem['Critical Spare Description']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Critical Spare Description': value })}
  placeholder="Critical Spare Description"
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
  value={newItem['Serial #']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Serial #': value })}
  placeholder="Serial #"
/>
<TextInput
  style={styles.input}
  value={newItem['Size']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Size': value })}
  placeholder="Size"
/>
<TextInput
  style={styles.input}
  value={newItem['Parent Equipment/System']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Parent Equipment/System': value })}
  placeholder="Parent Equipment/System"
/>
<TextInput
  style={styles.input}
  value={newItem['Relationship to parent equipment/ system']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Relationship to parent equipment/ system': value })}
  placeholder="Relationship to parent equipment/system"
/>
<TextInput
  style={styles.input}
  value={newItem['Reason Critical']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Reason Critical': value })}
  placeholder="Reason Critical"
/>
<TextInput
  style={styles.input}
  value={newItem['Criticality of Part ']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Criticality of Part ': value })}
  placeholder="Criticality of Part"
/>
<TextInput
  style={styles.input}
  value={newItem['Notes']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Notes': value })}
  placeholder="Notes"
/>
<TextInput
  style={styles.input}
  value={newItem['Source (supplier)']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Source (supplier)': value })}
  placeholder="Source (supplier)"
/>
<TextInput
  style={styles.input}
  value={newItem['Lead Time  to Delivery (days/weeks)']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Lead Time  to Delivery (days/weeks)': value })}
  placeholder="Lead Time to Delivery (days/weeks)"
/>
<TextInput
  style={styles.input}
  value={newItem['Budget Estimate ($)']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Budget Estimate ($)': value })}
  placeholder="Budget Estimate ($)"
/>
<TextInput
  style={styles.input}
  value={newItem['CAP/OPEX']}
  onChangeText={(value) => setNewItem({ ...newItem, 'CAP/OPEX': value })}
  placeholder="CAP/OPEX"
/>
<TextInput
  style={styles.input}
  value={newItem['Inventory on site']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Inventory on site': value })}
  placeholder="Inventory on site"
/>
<TextInput
  style={styles.input}
  value={newItem['Inventory Location']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Inventory Location': value })}
  placeholder="Inventory Location"
/>
<TextInput
  style={styles.input}
  value={newItem['Comments']}
  onChangeText={(value) => setNewItem({ ...newItem, 'Comments': value })}
  placeholder="Comments"
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
