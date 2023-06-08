import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native-web';
import { firebase } from '../../config';

const DeletePage = () => {
  const itemsRef = firebase.firestore().collection('items');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Fetch items from the collection and sort them alphabetically by CLLI Number
    const fetchItems = async () => {
      try {
        const snapshot = await itemsRef.orderBy('CLLI Code').get();
        const fetchedItems = snapshot.docs.map((doc) => doc.data());
        setItems(fetchedItems);
      } catch (error) {
        console.log('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleItemSelect = (item) => {
    // Toggle the select state of the item
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const deleteSelectedItems = () => {
    // Delete selected items from the collection
    selectedItems.forEach((item) => {
      itemsRef
        .where('CLLI Code', '==', item['CLLI Code'])
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .catch((error) => {
          console.log('Error deleting item:', error);
        });
    });

    // Clear the selected items list
    setSelectedItems([]);

    // Remove the selected items from the items list
    setItems((prevItems) => prevItems.filter((item) => !selectedItems.includes(item)));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemList}>
        <View style={[styles.row, styles.headerContainer]}>
          <ScrollView horizontal>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>CLLINumber</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>buildingCategory</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>buildingName</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>buildingType</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>dateEntered</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>manufacturer</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>model</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>notes</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>parentEquipment</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>partDescription</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>partLocation</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>prevCost</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>quantityOnSite</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>region</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>relationShipToParentEquipment</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>serialNumber</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>vendor</Text>
            </View>
            <View style={styles.cell}>
              <Text style={[styles.itemText, styles.headerText]}>Actions</Text>
            </View>
          </ScrollView>
        </View>
        <ScrollView style={{ height: '70vh' }}>
          {items.map((item, index) => (
            <View key={index} style={[styles.row, index % 2 === 1 && styles.oddRow]}>
              <ScrollView horizontal>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['CLLI Code']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Building Category']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Building Name']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Building Type']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>
                    {item.dateEntered && new Date(item.dateEntered.toDate()).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Manufacturer']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Model']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Notes']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Parent Equipment/System']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Part Description']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Part Location']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Last Cost']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Quantity On Site']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Region']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Relationship to Parent Equipment/System']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Serial Number']}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.itemText}>{item['Vendor']}</Text>
                </View>
                <View style={styles.cell}>
                  <TouchableOpacity
                    onPress={() => handleItemSelect(item)}
                    style={[
                      styles.selectButton,
                      selectedItems.includes(item) && styles.selectedButton,
                    ]}
                  >
                    <Text style={styles.selectButtonText}>
                      {selectedItems.includes(item) ? 'Selected' : 'Select'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={deleteSelectedItems}
          disabled={selectedItems.length === 0}
          style={[styles.deleteButton, selectedItems.length === 0 && styles.disabledButton]}
        >
          <Text style={styles.deleteButtonText}>Delete Selected</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemList: {
    flex: 1,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  oddRow: {
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    minWidth: 100,
  },
  headerText: {
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 12,
  },
  selectButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignSelf: 'flex-start',
  },
  selectedButton: {
    backgroundColor: '#5cb85c',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#dc3545',
  },
  disabledButton: {
    opacity: 0.5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DeletePage;
