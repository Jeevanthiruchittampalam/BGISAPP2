import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../../../config';
import 'firebase/firestore';

const SummaryPage = ({ navigation }) => {

  const pressBCHandler = () => {
    navigation.navigate('BCSpares');
  };
  const pressABHandler = () => {
    navigation.navigate('ABSpares');
  };
  const pressQCHandler = () => {
    navigation.navigate('QSpares');
  };
  const pressCentralHandler = () => {
    navigation.navigate('CSpares');
  };

  const [CSDataAB, setCSDataAB] = useState([]);
  const [CSDataBC, setCSDataBC] = useState([]);
  const [CSDataQC, setCSDataQC] = useState([]);
  const [CSDataCentral, setCSDataCentral] = useState([]);

  useEffect(() => {
    const fetchCSData = async () => {
      const querySnapshotABCS = await firebase.firestore().collection('ABSpares')
        .get();

      const querySnapshotBCCS = await firebase.firestore().collection('BCSpares')
        
        .get();

      const querySnapshotQCCS = await firebase.firestore().collection('QCSpares')
        
        .get();
    
    const querySnapshotCentralCS = await firebase.firestore().collection('CSpares')
        
        .get();

      const dataABCS = querySnapshotABCS.docs.map((doc) => doc.data());
      setCSDataAB(dataABCS);

      const dataBCCS = querySnapshotBCCS.docs.map((doc) => doc.data());
      setCSDataBC(dataBCCS);

      const dataCentral = querySnapshotCentralCS.docs.map((doc) => doc.data());
      setCSDataCentral(dataCentral);

      const dataQC = querySnapshotQCCS.docs.map((doc) => doc.data());
      setCSDataQC(dataQC);
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
    uniqueBuildings: uniqueBuildingsAB,
    column3Data: column3DataAB,
    column4Data: column4DataAB,
    column5Data: column5DataAB,
    grandTotalData: grandTotalDataAB,
    abTotalNo: abTotalNoAB,
    abTotalYes: abTotalYesAB,
    abTotalGrand: abTotalGrandAB,
  } = calculateSummaryData(CSDataAB);

  const {
    uniqueBuildings: uniqueBuildingsBC,
    column3Data: column3DataBC,
    column4Data: column4DataBC,
    column5Data: column5DataBC,
    grandTotalData: grandTotalDataBC,
    abTotalNo: abTotalNoBC,
    abTotalYes: abTotalYesBC,
    abTotalGrand: abTotalGrandBC,
  } = calculateSummaryData(CSDataBC);

  const {
    uniqueBuildings: uniqueBuildingsCentral,
    column3Data: column3DataCentral,
    column4Data: column4DataCentral,
    column5Data: column5DataCentral,
    grandTotalData: grandTotalDataCentral,
    abTotalNo: abTotalNoCentral,
    abTotalYes: abTotalYesCentral,
    abTotalGrand: abTotalGrandCentral,
  } = calculateSummaryData(CSDataCentral);

  const {
    uniqueBuildings: uniqueBuildingsQC,
    column3Data: column3DataQC,
    column4Data: column4DataQC,
    column5Data: column5DataQC,
    grandTotalData: grandTotalDataQC,
    abTotalNo: abTotalNoQC,
    abTotalYes: abTotalYesQC,
    abTotalGrand: abTotalGrandQC,
  } = calculateSummaryData(CSDataQC);
  

  const fullTotalNo = abTotalNoCentral + abTotalNoAB + abTotalNoBC + abTotalNoQC;

  const fullTotalYes = abTotalYesCentral + abTotalYesAB + abTotalYesBC +abTotalNoQC;

  const fullTotalGrand = fullTotalYes;


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Critical Spares</Text>

        <View style={styles.tableContainer}>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={pressABHandler} >
        <Text style={styles.tableTitle}>Region: AB</Text>
          </TouchableOpacity>
          

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsAB.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>AB</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataAB[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataAB[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataAB[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>AB Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesAB}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#39FF14' }]}onPress={pressBCHandler}>
              <Text style={styles.tableTitle}>Region: BC</Text>
        </TouchableOpacity>   
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsBC.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>BC</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataBC[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataBC[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataBC[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>BC Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesBC}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#3399FF' }]}onPress={pressCentralHandler} >
              <Text style={styles.tableTitle}>Region: Central</Text>
        </TouchableOpacity> 
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsCentral.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>Central</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataCentral[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataCentral[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataCentral[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>Central Total</Text>
              <Text style={styles.cell}></Text>

              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesCentral}</Text>

            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#8A2BE2' }]} onPress={pressQCHandler}>
        <Text style={[styles.tableTitle, { color: "black" }]}>Region: QC</Text>
        </TouchableOpacity> 
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsQC.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>Quebec</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataQC[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataQC[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataQC[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>Quebec Total</Text>
              <Text style={styles.cell}></Text>

              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesQC}</Text>

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
