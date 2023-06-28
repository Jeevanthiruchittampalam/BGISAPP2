import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { firebase } from '../../../config';
import 'firebase/firestore';

const SummaryPage = () => {
  const [hvacData, setHvacData] = useState([]);

  useEffect(() => {
    const fetchHvacData = async () => {
      const querySnapshot = await firebase.firestore().collection('HVAC')
        .where('Region', '==', 'AB')
        .get();

      const data = querySnapshot.docs.map((doc) => doc.data());
      setHvacData(data);
    };

    fetchHvacData();
  }, []);

  // Extract unique building options
  const uniqueBuildings = hvacData.reduce((acc, item) => {
    if (!acc.includes(item.Building)) {
      acc.push(item.Building);
    }
    return acc;
  }, []);

  // Calculate total sum for each building with 'No' inventory
  const column3Data = uniqueBuildings.reduce((acc, building) => {
    const buildingData = hvacData.filter(
      (item) => item.Building === building && (item['Inventory on site'] === 'No' || item['Inventory on site'] === 'no' || item['Inventory on site'] === 'NO')
    );
    const sum = buildingData.reduce((total, item) => total + parseFloat(item['Budget Estimate ($)'] || 0), 0);
    acc[building] = sum;
    return acc;
  }, {});

  // Calculate total sum for each building with 'Yes' inventory
  const column4Data = uniqueBuildings.reduce((acc, building) => {
    const buildingData = hvacData.filter(
      (item) => item.Building === building && (item['Inventory on site'] === 'Yes' || item['Inventory on site'] === 'yes' || item['Inventory on site'] === 'YES')
    );
    const sum = buildingData.reduce((total, item) => total + parseFloat(item['Budget Estimate ($)'] || 0), 0);
    acc[building] = sum;
    return acc;
  }, {});

  // Calculate grand total for each building
  const grandTotalData = uniqueBuildings.reduce((acc, building) => {
    const noTotal = column3Data[building] || 0;
    const yesTotal = column4Data[building] || 0;
    acc[building] = noTotal + yesTotal;
    return acc;
  }, {});

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Summary Page</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
            <Text style={styles.columnHeader}>Building</Text>
            <Text style={styles.columnHeader}>No</Text>
            <Text style={styles.columnHeader}>Yes</Text>
            <Text style={styles.columnHeader}>Grand Total</Text>
          </View>
          {uniqueBuildings.map((building, index) => (
            <View key={building} style={styles.tableRow}>
              <Text style={styles.cell}>AB</Text>
              <Text style={styles.cell}>{building}</Text>
              <Text style={styles.cell}>{column3Data[building] || ''}</Text>
              <Text style={styles.cell}>{column4Data[building] || ''}</Text>
              <Text style={styles.cell}>{grandTotalData[building] || ''}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 8,
    paddingBottom: 8,
  },
  cell: {
    flex: 1,
  },
});

export default SummaryPage;
