import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../../../../config';
import 'firebase/firestore';

const SummaryPage = ({ navigation }) => {

  const pressSAIT1Handler = () => {
    navigation.navigate('U3SAIT1Spares');
  };
  const pressSAIT2Handler = () => {
    navigation.navigate('U3SAIT2Spares');
  };
  const pressSAIT3Handler = () => {
    navigation.navigate('U3SAIT3Spares');
  };
  const pressSAIT4Handler = () => {
    navigation.navigate('U3SAIT4Spares');
  };



  const [CSDataSAIT2, setCSDataSAIT2] = useState([]);
  const [CSDataSAIT1, setCSDataSAIT1] = useState([]);
  const [CSDataSAIT3, setCSDataSAIT3] = useState([]);
  const [CSDataSAIT4, setCSDataSAIT4] = useState([]);

  useEffect(() => {
    const fetchCSData = async () => {
      const querySnapshotSAIT2CS = await firebase.firestore().collection('SAIT1Spares')
        .get();

      const querySnapshotSAIT1CS = await firebase.firestore().collection('SAIT2Spares')
        
        .get();

      const querySnapshotSAIT3CS = await firebase.firestore().collection('SAIT3Spares')
        
        .get();
    
    const querySnapshotSAIT4CS = await firebase.firestore().collection('SAIT4Spares')
        
        .get();

      const dataSAIT2CS = querySnapshotSAIT2CS.docs.map((doc) => doc.data());
      setCSDataSAIT2(dataSAIT2CS);

      const dataSAIT1CS = querySnapshotSAIT1CS.docs.map((doc) => doc.data());
      setCSDataSAIT1(dataSAIT1CS);

      const dataSAIT4 = querySnapshotSAIT4CS.docs.map((doc) => doc.data());
      setCSDataSAIT4(dataSAIT4);

      const dataSAIT3 = querySnapshotSAIT3CS.docs.map((doc) => doc.data());
      setCSDataSAIT3(dataSAIT3);
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
    uniqueBuildings: uniqueBuildingsSAIT2,
    column3Data: column3DataSAIT2,
    column4Data: column4DataSAIT2,
    column5Data: column5DataSAIT2,
    grandTotalData: grandTotalDataSAIT2,
    abTotalNo: abTotalNoSAIT2,
    abTotalYes: abTotalYesSAIT2,
    abTotalGrand: abTotalGrandSAIT2,
  } = calculateSummaryData(CSDataSAIT2);

  const {
    uniqueBuildings: uniqueBuildingsSAIT1,
    column3Data: column3DataSAIT1,
    column4Data: column4DataSAIT1,
    column5Data: column5DataSAIT1,
    grandTotalData: grandTotalDataSAIT1,
    abTotalNo: abTotalNoSAIT1,
    abTotalYes: abTotalYesSAIT1,
    abTotalGrand: abTotalGrandSAIT1,
  } = calculateSummaryData(CSDataSAIT1);

  const {
    uniqueBuildings: uniqueBuildingsSAIT4,
    column3Data: column3DataSAIT4,
    column4Data: column4DataSAIT4,
    column5Data: column5DataSAIT4,
    grandTotalData: grandTotalDataSAIT4,
    abTotalNo: abTotalNoSAIT4,
    abTotalYes: abTotalYesSAIT4,
    abTotalGrand: abTotalGrandSAIT4,
  } = calculateSummaryData(CSDataSAIT4);

  const {
    uniqueBuildings: uniqueBuildingsSAIT3,
    column3Data: column3DataSAIT3,
    column4Data: column4DataSAIT3,
    column5Data: column5DataSAIT3,
    grandTotalData: grandTotalDataSAIT3,
    abTotalNo: abTotalNoSAIT3,
    abTotalYes: abTotalYesSAIT3,
    abTotalGrand: abTotalGrandSAIT3,
  } = calculateSummaryData(CSDataSAIT3);
  

  const fullTotalNo = abTotalNoSAIT4 + abTotalNoSAIT2 + abTotalNoSAIT1 + abTotalNoSAIT3;

  const fullTotalYes = abTotalYesSAIT4 + abTotalYesSAIT2 + abTotalYesSAIT1 +abTotalNoSAIT3;

  const fullTotalGrand = fullTotalYes;


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Critical Spares</Text>

        <View style={styles.tableContainer}>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={pressSAIT2Handler} >
        <Text style={styles.tableTitle}>Region: SAIT2</Text>
          </TouchableOpacity>
          

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsSAIT2.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>SAIT2</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataSAIT2[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataSAIT2[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataSAIT2[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>SAIT2 Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesSAIT2}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#39FF14' }]}onPress={pressSAIT1Handler}>
              <Text style={styles.tableTitle}>Region: SAIT1</Text>
        </TouchableOpacity>   
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsSAIT1.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>SAIT1</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataSAIT1[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataSAIT1[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataSAIT1[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>SAIT1 Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesSAIT1}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#3399FF' }]}onPress={pressSAIT4Handler} >
              <Text style={styles.tableTitle}>Region: SAIT4</Text>
        </TouchableOpacity> 
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsSAIT4.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>SAIT4</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataSAIT4[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataSAIT4[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataSAIT4[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>SAIT4 Total</Text>
              <Text style={styles.cell}></Text>

              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesSAIT4}</Text>

            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#8A2BE2' }]} onPress={pressSAIT3Handler}>
        <Text style={[styles.tableTitle, { color: "black" }]}>Region: SAIT3</Text>
        </TouchableOpacity> 
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsSAIT3.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>SAIT3</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataSAIT3[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataSAIT3[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataSAIT3[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>SAIT3 Total</Text>
              <Text style={styles.cell}></Text>

              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesSAIT3}</Text>

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
