import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { firebase } from '../../config';
import 'firebase/firestore';

const SummaryPage = () => {

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

  const [WSDataAB, setWSDataAB] = useState([]);
  const [WSDataBC, setWSDataBC] = useState([]);
  const [WSDataCentral, setWSDataCentral] = useState([]);
  const [WSDataQC, setWSDataQC] = useState([]);

  useEffect(() => {
    const fetchWSData = async () => {
      const querySnapshotABWS = await firebase.firestore().collection('ABWS')
        
        .get();

      const querySnapshotBCWS = await firebase.firestore().collection('BCWS')
        .where('Region', '==', 'BC')
        .get();

      const querySnapshotCentralWS = await firebase.firestore().collection('CWS')
        
        .get();
      

      const querySnapshotQCWS = await firebase.firestore().collection('QCWS')
        
        .get();

      

      const dataAB2 = querySnapshotABWS.docs.map((doc) => doc.data());
      setWSDataAB(dataAB2);

      const dataBC2 = querySnapshotBCWS.docs.map((doc) => doc.data());
      setWSDataBC(dataBC2);

      const dataCentral2 = querySnapshotCentralWS.docs.map((doc) => doc.data());
      setWSDataCentral(dataCentral2);

      const dataQC2 = querySnapshotQCWS.docs.map((doc) => doc.data());
      setWSDataQC(dataQC2);
    };

    fetchWSData();
  }, []);

  const calculateSummaryData = (CSData) => {
    const uniqueBuildings = CSData.reduce((acc, item) => {
      if (!acc.includes(item['Building Name'])) {
        acc.push(item['Building Name']);
      }
      return acc;
    }, []);

    const column3Data = uniqueBuildings.reduce((acc, building) => {
        const buildingData = CSData.filter(
          (item) =>
            item['Building Name'] === building 
        );
        const sum = buildingData.reduce(
          (total, item) => total + parseFloat(item['Last Cost'] || 0),
          0
        );
        acc[building] = sum;
        return acc;
      }, {});
      

    const column4Data = uniqueBuildings.reduce((acc, building) => {
      const buildingData = CSData.filter(
        (item) =>
          item['Building Name'] === building );
      const sum = buildingData.reduce(
        (total, item) => total + parseFloat(item['Last Cost'] || 0) * parseFloat(item['Quantity On Site']  || 0),
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

  const calculateSummaryData2 = (WSData) => {
    const uniqueBuildings2 = WSData.reduce((acc, item) => {
      if (!acc.includes(item['Building Name'])) {
        acc.push(item['Building Name']);
      }
      return acc;
    }, []);

    const column3Data2 = uniqueBuildings2.reduce((acc, building) => {
      const buildingData2 = WSData.filter(
        (item) =>
          item['Building Name'] === building 
      );
      const sum = buildingData2.reduce(
        (total, item) => total + parseFloat(item['Last Cost'] || 0),
        0
      );
      acc[building] = sum;
      return acc;
    }, {});

    const column4Data2 = uniqueBuildings2.reduce((acc, building) => {
      const buildingData2 = WSData.filter(
        (item) =>
          item['Building Name'] === building 
      );
      const sum = buildingData2.reduce(
        (total, item) => total + parseFloat(item['Last Cost'] || 0) * parseFloat(item['Quantity On Site']  || 0),
        0
      );
      acc[building] = sum;
      return acc;
    }, {});

    const grandTotalData2 = uniqueBuildings2.reduce((acc, building) => {
      const noSum2 = column3Data2[building] || 0;
      const yesSum2 = column4Data2[building] || 0;
      const grandTotal2 = noSum2 + yesSum2;
      acc[building] = grandTotal2;
      return acc;
    }, {});

    const abTotalNo2 = Object.values(column3Data2).reduce(
      (total, value) => total + value,
      0
    );
    const abTotalYes2 = Object.values(column4Data2).reduce(
      (total, value) => total + value,
      0
    );
    const abTotalGrand2 = Object.values(grandTotalData2).reduce(
      (total, value) => total + value,
      0
    );

    

    return { uniqueBuildings2, column3Data2, column4Data2, grandTotalData2, abTotalNo2, abTotalYes2, abTotalGrand2 };
  };

  const {
    uniqueBuildings: uniqueBuildingsAB,
    column3Data: column3DataAB,
    column4Data: column4DataAB,
    grandTotalData: grandTotalDataAB,
    abTotalNo: abTotalNoAB,
    abTotalYes: abTotalYesAB,
    abTotalGrand: abTotalGrandAB,
  } = calculateSummaryData(CSDataAB);

  const {
    uniqueBuildings: uniqueBuildingsBC,
    column3Data: column3DataBC,
    column4Data: column4DataBC,
    grandTotalData: grandTotalDataBC,
    abTotalNo: abTotalNoBC,
    abTotalYes: abTotalYesBC,
    abTotalGrand: abTotalGrandBC,
  } = calculateSummaryData(CSDataBC);

  const {
    uniqueBuildings: uniqueBuildingsCentral,
    column3Data: column3DataCentral,
    column4Data: column4DataCentral,
    grandTotalData: grandTotalDataCentral,
    abTotalNo: abTotalNoCentral,
    abTotalYes: abTotalYesCentral,
    abTotalGrand: abTotalGrandCentral,
  } = calculateSummaryData(CSDataCentral);

  const {
    uniqueBuildings: uniqueBuildingsQC,
    column3Data: column3DataQC,
    column4Data: column4DataQC,
    grandTotalData: grandTotalDataQC,
    abTotalNo: abTotalNoQC,
    abTotalYes: abTotalYesQC,
    abTotalGrand: abTotalGrandQC,
  } = calculateSummaryData(CSDataQC);
  

  const fullTotalNo = abTotalNoCentral + abTotalNoAB + abTotalNoBC + abTotalNoQC;

  const fullTotalYes = abTotalYesCentral + abTotalYesAB + abTotalYesBC +abTotalNoQC;

  const fullTotalGrand = fullTotalYes;

  //WS
  const {
    uniqueBuildings2: uniqueBuildingsAB2,
    column3Data2: column3DataAB2,
    column4Data2: column4DataAB2,
    grandTotalData2: grandTotalDataAB2,
    abTotalNo2: abTotalNoAB2,
    abTotalYes2: abTotalYesAB2,
    abTotalGrand2: abTotalGrandAB2,
  } = calculateSummaryData2(WSDataAB);

  const {
    uniqueBuildings2: uniqueBuildingsBC2,
    column3Data2: column3DataBC2,
    column4Data2: column4DataBC2,
    grandTotalData2: grandTotalDataBC2,
    abTotalNo2: abTotalNoBC2,
    abTotalYes2: abTotalYesBC2,
    abTotalGrand2: abTotalGrandBC2,
  } = calculateSummaryData2(WSDataBC);

  const {
    uniqueBuildings2: uniqueBuildingsCentral2,
    column3Data2: column3DataCentral2,
    column4Data2: column4DataCentral2,
    grandTotalData2: grandTotalDataCentral2,
    abTotalNo2: abTotalNoCentral2,
    abTotalYes2: abTotalYesCentral2,
    abTotalGrand2: abTotalGrandCentral2,
  } = calculateSummaryData2(WSDataCentral);

  const {
    uniqueBuildings2: uniqueBuildingsQC2,
    column3Data2: column3DataQC2,
    column4Data2: column4DataQC2,
    grandTotalData2: grandTotalDataQC2,
    abTotalNo2: abTotalNoQC2,
    abTotalYes2: abTotalYesQC2,
    abTotalGrand2: abTotalGrandQC2,
  } = calculateSummaryData2(WSDataQC);

  const fullTotalNo2 = abTotalNoCentral2 + abTotalNoAB2 + abTotalNoBC2 + abTotalNoQC2;

  const fullTotalYes2 = abTotalYesCentral2 + abTotalYesAB2 + abTotalYesBC2 + abTotalYesQC2;

  const fullTotalGrand2 = fullTotalYes2;
  //-------

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Critical Spares</Text>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Region: AB</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Cost</Text>
            </View>
            {uniqueBuildingsAB.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>AB</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column4DataAB[building] || ''}</Text>
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
          <Text style={styles.tableTitle}>Region: BC</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Cost</Text>
            </View>
            {uniqueBuildingsBC.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>BC</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column4DataBC[building] || ''}</Text>
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
          <Text style={styles.tableTitle}>Region: Central</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Cost</Text>
            </View>
            {uniqueBuildingsCentral.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>Central</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column4DataCentral[building] || ''}</Text>
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
          <Text style={styles.tableTitle}>Region: QC</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Cost</Text>
            </View>
            {uniqueBuildingsQC.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>Quebec</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column4DataQC[building] || ''}</Text>
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

        <Text style={styles.heading}> Wish List </Text>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Region: AB</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Cost</Text>
            </View>
            {uniqueBuildingsAB2.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>AB</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column4DataAB2[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>AB Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesAB2}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Region: BC</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Cost</Text>
            </View>
            {uniqueBuildingsBC2.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>BC</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column4DataBC2[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>BC Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesBC2}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Region: Central</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Cost</Text>
            </View>
            {uniqueBuildingsCentral2.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>Central</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column4DataCentral2[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>Central Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesCentral2}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Region: QC</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Region</Text>
              <Text style={styles.columnHeader}>Building</Text>
              <Text style={styles.columnHeader}>Total Cost</Text>

            </View>
            {uniqueBuildingsQC2.map((building, index) => (
              <View key={building} style={styles.tableRow}>
                <Text style={styles.cell}>QC</Text>
                <Text style={styles.cell}>{building}</Text>
                <Text style={styles.cell}>{column4DataQC[building] || ''}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.footerCell]}>QC Total</Text>
              <Text style={styles.cell}></Text>
              <Text style={[styles.cell, styles.footerCell]}>{abTotalYesQC2}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Full Total</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}></Text>
              <Text style={styles.columnHeader}></Text>
              <Text style={styles.columnHeader}>{fullTotalYes2}</Text>
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
