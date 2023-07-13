import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../../../config';
import 'firebase/firestore';

const SummaryPage = ({ navigation }) => {

  const pressAI1Handler = () => {
    navigation.navigate('AI1Spares');
  };
  const pressAI2Handler = () => {
    navigation.navigate('AI2Spares');
  };
  const pressAI3Handler = () => {
    navigation.navigate('AI3Spares');
  };
  const pressAI4Handler = () => {
    navigation.navigate('AI4Spares');
  };

  const [CSDataAI2, setCSDataAI2] = useState([]);
  const [CSDataAI1, setCSDataAI1] = useState([]);
  const [CSDataAI3, setCSDataAI3] = useState([]);
  const [CSDataAI4, setCSDataAI4] = useState([]);

  useEffect(() => {
    const fetchCSData = async () => {
      const querySnapshotAI2CS = await firebase.firestore().collection('AI2Spares')
        .get();

      const querySnapshotAI1CS = await firebase.firestore().collection('AI1Spares')
        
        .get();

      const querySnapshotAI3CS = await firebase.firestore().collection('AI3Spares')
        
        .get();
    
    const querySnapshotAI4CS = await firebase.firestore().collection('AI4Spares')
        
        .get();

      const dataAI2CS = querySnapshotAI2CS.docs.map((doc) => doc.data());
      setCSDataAI2(dataAI2CS);

      const dataAI1CS = querySnapshotAI1CS.docs.map((doc) => doc.data());
      setCSDataAI1(dataAI1CS);

      const dataAI4 = querySnapshotAI4CS.docs.map((doc) => doc.data());
      setCSDataAI4(dataAI4);

      const dataAI3 = querySnapshotAI3CS.docs.map((doc) => doc.data());
      setCSDataAI3(dataAI3);
    };

    fetchCSData();
  }, []);


  const calculateSummaryData = (CSData) => {
    const uniqueBuildings = CSData.reduce((acc, item) => {
      if (!acc.includes(item['Building Name'])) {
        acc.push(item['Building Name']);
      }
      return acc;
    }, []);


    //total inventory on site
    const column3Data = uniqueBuildings.reduce((acc, building) => {
      const buildingData = CSData.filter(
        (item) =>
          item['Building Name'] === building && item['Wish List'] === 'N' );
      const sum = buildingData.reduce(
        (total, item) => total + parseFloat(item['Last Cost'] || 0) * parseFloat(item['Quantity On Site']  || 0),
        0
      );
      acc[building] = sum;
      return acc;
      }, {});
      
      //Inventory Cost Requirements
    const column4Data = uniqueBuildings.reduce((acc, building) => {
      const buildingData = CSData.filter(
        (item) =>
          item['Building Name'] === building && (item['Quantity On Site'] === '0' || item['Quantity On Site'] === '') && item['Wish List'] === 'N');
      const sum = buildingData.reduce(
        (total, item) => total + parseFloat(item['Last Cost'] || 0),// * parseFloat(item['Quantity On Site']  || 0),
        0
      );
      acc[building] = sum;
      return acc;
    }, {});

        //Wish List Cost Requirements
    const column5Data = uniqueBuildings.reduce((acc, building) => {
      const buildingData = CSData.filter(
        (item) =>
          item['Building Name'] === building && (item['Quantity On Site'] === '0' || item['Quantity On Site'] === '') && item['Wish List'] === 'Y');
      const sum = buildingData.reduce(
        (total, item) => total + parseFloat(item['Last Cost'] || 0),// * parseFloat(item['Quantity On Site']  || 0),
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

    return { uniqueBuildings, column3Data, column4Data, column5Data, grandTotalData, abTotalNo, abTotalYes, abTotalGrand};
  };
  

  const {
    uniqueBuildings: uniqueBuildingsAI2,
    column3Data: column3DataAI2,
    column4Data: column4DataAI2,
    column5Data: column5DataAI2,
    grandTotalData: grandTotalDataAI2,
    abTotalNo: abTotalNoAI2,
    abTotalYes: abTotalYesAI2,
    abTotalGrand: abTotalGrandAI2,
  } = calculateSummaryData(CSDataAI2);

  const {
    uniqueBuildings: uniqueBuildingsAI1,
    column3Data: column3DataAI1,
    column4Data: column4DataAI1,
    column5Data: column5DataAI1,
    grandTotalData: grandTotalDataAI1,
    abTotalNo: abTotalNoAI1,
    abTotalYes: abTotalYesAI1,
    abTotalGrand: abTotalGrandAI1,
  } = calculateSummaryData(CSDataAI1);

  const {
    uniqueBuildings: uniqueBuildingsAI4,
    column3Data: column3DataAI4,
    column4Data: column4DataAI4,
    column5Data: column5DataAI4,
    grandTotalData: grandTotalDataAI4,
    abTotalNo: abTotalNoAI4,
    abTotalYes: abTotalYesAI4,
    abTotalGrand: abTotalGrandAI4,
  } = calculateSummaryData(CSDataAI4);

  const {
    uniqueBuildings: uniqueBuildingsAI3,
    column3Data: column3DataAI3,
    column4Data: column4DataAI3,
    column5Data: column5DataAI3,
    grandTotalData: grandTotalDataAI3,
    abTotalNo: abTotalNoAI3,
    abTotalYes: abTotalYesAI3,
    abTotalGrand: abTotalGrandAI3,
  } = calculateSummaryData(CSDataAI3);
  

  const fullTotalNo = abTotalNoAI4 + abTotalNoAI2 + abTotalNoAI1 + abTotalNoAI3;

  const fullTotalYes = abTotalYesAI4 + abTotalYesAI2 + abTotalYesAI1 +abTotalNoAI3;

  const fullTotalGrand = fullTotalYes;


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Critical Spares</Text>

        <View style={styles.tableContainer}>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={pressAI2Handler} >
        <Text style={styles.tableTitle}>Region: AI2</Text>
          </TouchableOpacity>
          

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsAI2.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>AI2</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataAI2[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataAI2[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataAI2[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>AI2 Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesAI2}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#39FF14' }]}onPress={pressAI1Handler}>
              <Text style={styles.tableTitle}>Region: AI1</Text>
        </TouchableOpacity>   
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsAI1.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>AI1</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataAI1[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataAI1[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataAI1[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>AI1 Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesAI1}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#3399FF' }]}onPress={pressAI4Handler} >
              <Text style={styles.tableTitle}>Region: AI4</Text>
        </TouchableOpacity> 
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsAI4.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>AI4</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataAI4[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataAI4[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataAI4[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>AI4 Total</Text>
              <Text style={styles.cell}></Text>

              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesAI4}</Text>

            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#8A2BE2' }]} onPress={pressAI3Handler}>
        <Text style={[styles.tableTitle, { color: "black" }]}>Region: AI3</Text>
        </TouchableOpacity> 
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsAI3.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>AI3</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataAI3[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataAI3[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataAI3[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>Quebec Total</Text>
              <Text style={styles.cell}></Text>

              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesAI3}</Text>

            </View>
          </View>
        </View>


        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Full Total</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}></Text>
              <Text style={styles.columnHeader}></Text>
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
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SummaryPage;
