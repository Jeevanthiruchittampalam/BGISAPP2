import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';



const items = [
  {
    region: 'Vancouver',
    CLLICode: 1234,
    buildingName: 'Arbutus Club',
    buildingType: '1',
    buildingCategory: 'CAT1',
    partDescription: 'Armstrong Pump Master',
    partLocation: '7th Ave Basement',
    manufacturer: 'Armstrong',
    model: 'Fb323',
    serialNumber: 2032,
    vendor: 'Johnson Controls',
    parentEq: 'Crane',
    relToParentEq: 'N/A',
    quantityOnSite: '2',
    lastCost: 3.25,
    dateEntered: 'July-12-2002',
    notes: 'Hi'
  },
  {
    region: 'Toronto',
    CLLICode: 5678,
    buildingName: 'CN Tower',
    buildingType: '2',
    buildingCategory: 'CAT2',
    partDescription: 'Elevator Control Panel',
    partLocation: 'Tower Control Room',
    manufacturer: 'Otis',
    model: 'EC-500',
    serialNumber: 4567,
    vendor: 'Schindler',
    parentEq: 'Elevator',
    relToParentEq: 'Main Control Panel',
    quantityOnSite: '1',
    lastCost: 10.5,
    dateEntered: 'March-05-2010',
    notes: 'Needs replacement'
  },
  {
    region: 'New York',
    CLLICode: 9876,
    buildingName: 'Empire State Building',
    buildingType: '1',
    buildingCategory: 'CAT1',
    partDescription: 'Air Conditioning Unit',
    partLocation: 'Floor 10',
    manufacturer: 'Carrier',
    model: 'AC-1000',
    serialNumber: 7890,
    vendor: 'Trane',
    parentEq: 'HVAC System',
    relToParentEq: 'Condenser Unit',
    quantityOnSite: '3',
    lastCost: 8.75,
    dateEntered: 'September-18-2015',
    notes: 'Regular maintenance required'
  },
  // Add more items here...
];

const ViewScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {items.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <Text style={styles.title}>Item {index + 1}</Text>
          <View style={styles.itemDetails}>
            <View style={styles.itemRow}>
              <Text style={styles.label}>Region:</Text>
              <Text style={styles.value}>{item.region}</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.label}>CLLICode:</Text>
              <Text style={styles.value}>{item.CLLICode}</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.label}>Building Name:</Text>
              <Text style={styles.value}>{item.buildingName}</Text>
            </View>
            {/* Add more properties here */}
          </View>
        </View>
      ))}
    </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  itemDetails: {
    marginTop: 10,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
});

export default ViewScreen;
