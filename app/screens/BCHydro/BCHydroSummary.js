import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../../../config';
import 'firebase/firestore';

const SummaryPage = ({ navigation }) => {

  const pressBCHydro1Handler = () => {
    navigation.navigate('BCHydro1Spares');
  };
  const pressBCHydro2Handler = () => {
    navigation.navigate('BCHydro2Spares');
  };
  const pressBCHydro3Handler = () => {
    navigation.navigate('BCHydro3Spares');
  };
  const pressBCHydro4Handler = () => {
    navigation.navigate('BCHydro4Spares');
  };

  const [CSDataBCHydro2, setCSDataBCHydro2] = useState([]);
  const [CSDataBCHydro1, setCSDataBCHydro1] = useState([]);
  const [CSDataBCHydro3, setCSDataBCHydro3] = useState([]);
  const [CSDataBCHydro4, setCSDataBCHydro4] = useState([]);

  useEffect(() => {
    const fetchCSData = async () => {
      const querySnapshotBCHydro2CS = await firebase.firestore().collection('BCHydro2Spares')
        .get();

      const querySnapshotBCHydro1CS = await firebase.firestore().collection('BCHydro1Spares')
        
        .get();

      const querySnapshotBCHydro3CS = await firebase.firestore().collection('BCHydro3Spares')
        
        .get();
    
    const querySnapshotBCHydro4CS = await firebase.firestore().collection('BCHydro4Spares')
        
        .get();

      const dataBCHydro2CS = querySnapshotBCHydro2CS.docs.map((doc) => doc.data());
      setCSDataBCHydro2(dataBCHydro2CS);

      const dataBCHydro1CS = querySnapshotBCHydro1CS.docs.map((doc) => doc.data());
      setCSDataBCHydro1(dataBCHydro1CS);

      const dataBCHydro4 = querySnapshotBCHydro4CS.docs.map((doc) => doc.data());
      setCSDataBCHydro4(dataBCHydro4);

      const dataBCHydro3 = querySnapshotBCHydro3CS.docs.map((doc) => doc.data());
      setCSDataBCHydro3(dataBCHydro3);
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
    uniqueBuildings: uniqueBuildingsBCHydro2,
    column3Data: column3DataBCHydro2,
    column4Data: column4DataBCHydro2,
    column5Data: column5DataBCHydro2,
    grandTotalData: grandTotalDataBCHydro2,
    abTotalNo: abTotalNoBCHydro2,
    abTotalYes: abTotalYesBCHydro2,
    abTotalGrand: abTotalGrandBCHydro2,
  } = calculateSummaryData(CSDataBCHydro2);

  const {
    uniqueBuildings: uniqueBuildingsBCHydro1,
    column3Data: column3DataBCHydro1,
    column4Data: column4DataBCHydro1,
    column5Data: column5DataBCHydro1,
    grandTotalData: grandTotalDataBCHydro1,
    abTotalNo: abTotalNoBCHydro1,
    abTotalYes: abTotalYesBCHydro1,
    abTotalGrand: abTotalGrandBCHydro1,
  } = calculateSummaryData(CSDataBCHydro1);

  const {
    uniqueBuildings: uniqueBuildingsBCHydro4,
    column3Data: column3DataBCHydro4,
    column4Data: column4DataBCHydro4,
    column5Data: column5DataBCHydro4,
    grandTotalData: grandTotalDataBCHydro4,
    abTotalNo: abTotalNoBCHydro4,
    abTotalYes: abTotalYesBCHydro4,
    abTotalGrand: abTotalGrandBCHydro4,
  } = calculateSummaryData(CSDataBCHydro4);

  const {
    uniqueBuildings: uniqueBuildingsBCHydro3,
    column3Data: column3DataBCHydro3,
    column4Data: column4DataBCHydro3,
    column5Data: column5DataBCHydro3,
    grandTotalData: grandTotalDataBCHydro3,
    abTotalNo: abTotalNoBCHydro3,
    abTotalYes: abTotalYesBCHydro3,
    abTotalGrand: abTotalGrandBCHydro3,
  } = calculateSummaryData(CSDataBCHydro3);
  

  const fullTotalNo = abTotalNoBCHydro4 + abTotalNoBCHydro2 + abTotalNoBCHydro1 + abTotalNoBCHydro3;

  const fullTotalYes = abTotalYesBCHydro4 + abTotalYesBCHydro2 + abTotalYesBCHydro1 +abTotalNoBCHydro3;

  const fullTotalGrand = fullTotalYes;


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Critical Spares</Text>

        <View style={styles.tableContainer}>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={pressBCHydro2Handler} >
        <Text style={styles.tableTitle}>Region: BCHydro2</Text>
          </TouchableOpacity>
          

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsBCHydro2.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>BCHydro2</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataBCHydro2[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataBCHydro2[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataBCHydro2[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>BCHydro2 Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesBCHydro2}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#39FF14' }]}onPress={pressBCHydro1Handler}>
              <Text style={styles.tableTitle}>Region: BCHydro1</Text>
        </TouchableOpacity>   
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsBCHydro1.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>BCHydro1</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataBCHydro1[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataBCHydro1[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataBCHydro1[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>BCHydro1 Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesBCHydro1}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#3399FF' }]}onPress={pressBCHydro4Handler} >
              <Text style={styles.tableTitle}>Region: BCHydro4</Text>
        </TouchableOpacity> 
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsBCHydro4.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>BCHydro4</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataBCHydro4[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataBCHydro4[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataBCHydro4[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>BCHydro4 Total</Text>
              <Text style={styles.cell}></Text>

              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesBCHydro4}</Text>

            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#8A2BE2' }]} onPress={pressBCHydro3Handler}>
        <Text style={[styles.tableTitle, { color: "black" }]}>Region: BCHydro3</Text>
        </TouchableOpacity> 
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Inventory On Hand</Text>
              <Text style={styles.columnHeader}>Total Cost Requirements</Text>
              <Text style={styles.columnHeader}>Wish List Cost Requirements</Text>
            </View>
            {uniqueBuildingsBCHydro3.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>BCHydro3</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column3DataBCHydro3[building] || ''}</Text>
                <Text style={styles.cell}>{column4DataBCHydro3[building] || ''}</Text>
                <Text style={styles.cell}>{column5DataBCHydro3[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>Quebec Total</Text>
              <Text style={styles.cell}></Text>

              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesBCHydro3}</Text>

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
