import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { firebase } from '../../../config';
import 'firebase/firestore';

const SummaryPage = () => {
  const [hvacDataAB, setHvacDataAB] = useState([]);
  const [hvacDataBC, setHvacDataBC] = useState([]);
  const [hvacDataON, setHvacDataON] = useState([]);

  useEffect(() => {
    const fetchHvacData = async () => {
      const querySnapshotAB = await firebase.firestore().collection('HVAC')
        .where('Region', '==', 'AB')
        .get();

      const querySnapshotBC = await firebase.firestore().collection('HVAC')
        .where('Region', '==', 'BC')
        .get();

      const querySnapshotON = await firebase.firestore().collection('HVAC')
        .where('Region', '==', 'ON')
        .get();

      const dataAB = querySnapshotAB.docs.map((doc) => doc.data());
      setHvacDataAB(dataAB);

      const dataBC = querySnapshotBC.docs.map((doc) => doc.data());
      setHvacDataBC(dataBC);

      const dataON = querySnapshotON.docs.map((doc) => doc.data());
      setHvacDataON(dataON);
    };

    fetchHvacData();
  }, []);

  const calculateSummaryData = (hvacData) => {
    const uniqueBuildings = hvacData.reduce((acc, item) => {
      if (!acc.includes(item.Building)) {
        acc.push(item.Building);
      }
      return acc;
    }, []);

    const column3Data = uniqueBuildings.reduce((acc, building) => {
      const buildingData = hvacData.filter(
        (item) =>
          item.Building === building &&
          (item['Inventory on site'] === 'No' ||
            item['Inventory on site'] === 'no' ||
            item['Inventory on site'] === 'NO')
      );
      const sum = buildingData.reduce(
        (total, item) => total + parseFloat(item['Budget Estimate ($)'] || 0),
        0
      );
      acc[building] = sum;
      return acc;
    }, {});

    const column4Data = uniqueBuildings.reduce((acc, building) => {
      const buildingData = hvacData.filter(
        (item) =>
          item.Building === building &&
          (item['Inventory on site'] === 'Yes' ||
            item['Inventory on site'] === 'yes' ||
            item['Inventory on site'] === 'YES')
      );
      const sum = buildingData.reduce(
        (total, item) => total + parseFloat(item['Budget Estimate ($)'] || 0),
        0
      );
      acc[building] = sum;
      return acc;
    }, {});

    const grandTotalData = uniqueBuildings.reduce((acc, building) => {
      const noSum = column3Data[building] || 0;
      const yesSum = column4Data[building] || 0;
      const grandTotal = noSum + yesSum;
      acc[building] = grandTotal;
      return acc;
    }, {});

    const abTotalNo = Object.values(column3Data).reduce(
      (total, value) => total + value,
      0
    );
    const abTotalYes = Object.values(column4Data).reduce(
      (total, value) => total + value,
      0
    );
    const abTotalGrand = Object.values(grandTotalData).reduce(
      (total, value) => total + value,
      0
    );

    

    return { uniqueBuildings, column3Data, column4Data, grandTotalData, abTotalNo, abTotalYes, abTotalGrand };
  };

  const {
    uniqueBuildings: uniqueBuildingsAB,
    column3Data: column3DataAB,
    column4Data: column4DataAB,
    grandTotalData: grandTotalDataAB,
    abTotalNo: abTotalNoAB,
    abTotalYes: abTotalYesAB,
    abTotalGrand: abTotalGrandAB,
  } = calculateSummaryData(hvacDataAB);

  const {
    uniqueBuildings: uniqueBuildingsBC,
    column3Data: column3DataBC,
    column4Data: column4DataBC,
    grandTotalData: grandTotalDataBC,
    abTotalNo: abTotalNoBC,
    abTotalYes: abTotalYesBC,
    abTotalGrand: abTotalGrandBC,
  } = calculateSummaryData(hvacDataBC);

  const {
    uniqueBuildings: uniqueBuildingsON,
    column3Data: column3DataON,
    column4Data: column4DataON,
    grandTotalData: grandTotalDataON,
    abTotalNo: abTotalNoON,
    abTotalYes: abTotalYesON,
    abTotalGrand: abTotalGrandON,
  } = calculateSummaryData(hvacDataON);

  const fullTotalNo = abTotalNoON + abTotalNoAB + abTotalNoBC;

  const fullTotalYes = abTotalYesON + abTotalYesAB + abTotalYesBC

  const fullTotalGrand = fullTotalNo + fullTotalYes;

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Summary Page</Text>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Region: AB</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>No</Text>
              <Text style={styles.columnHeader}>Yes</Text>
              <Text style={styles.columnHeader}>Grand Total</Text>
            </View>
            {uniqueBuildingsAB.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>AB</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataAB[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataAB[building] || ''}</Text>
                <Text style={[styles.cell, styles.footerCell]}>
                  {grandTotalDataAB[building] || ''}
                </Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>AB Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalNoAB}</Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesAB}</Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalGrandAB}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Region: BC</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>No</Text>
              <Text style={styles.columnHeader}>Yes</Text>
              <Text style={styles.columnHeader}>Grand Total</Text>
            </View>
            {uniqueBuildingsBC.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>BC</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataBC[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataBC[building] || ''}</Text>
                <Text style={[styles.cell, styles.footerCell]}>
                  {grandTotalDataBC[building] || ''}
                </Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>BC Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalNoBC}</Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesBC}</Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalGrandBC}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Region: ON</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>No</Text>
              <Text style={styles.columnHeader}>Yes</Text>
              <Text style={styles.columnHeader}>Grand Total</Text>
            </View>
            {uniqueBuildingsON.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>ON</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataON[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataON[building] || ''}</Text>
                <Text style={[styles.cell, styles.footerCell]}>
                  {grandTotalDataON[building] || ''}
                </Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>ON Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalNoON}</Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesON}</Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalGrandON}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Full Total</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}></Text>
              <Text style={styles.columnHeader}></Text>
              <Text style={styles.columnHeader}>{fullTotalNo}</Text>
              <Text style={styles.columnHeader}>{fullTotalYes}</Text>
              <Text style={styles.columnHeader}>{fullTotalGrand}</Text>
            </View>
          </View>
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
    marginBottom: 24,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  table: {
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
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  footerCell: {
    fontWeight: 'bold',
  },
});

export default SummaryPage;
