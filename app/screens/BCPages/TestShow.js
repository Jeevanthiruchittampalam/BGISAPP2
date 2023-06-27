import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, ScrollView, StyleSheet } from 'react-native';
import { firebase } from '../../../config';

const HVACPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHVACData = async () => {
      try {
        const db = firebase.firestore();
        const collectionRef = db.collection('HVAC');

        const snapshot = await collectionRef.orderBy('Region').get();
        const documents = snapshot.docs.map((doc) => doc.data());

        setData(documents);
      } catch (error) {
        console.log('Error fetching HVAC data:', error);
      }
    };

    fetchHVACData();
  }, []);

  const updateCellValue = (rowIndex, header, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][header] = value;
      return newData;
    });
  };

  const renderHeader = () => {
    const headers = Object.keys(data[0] || {});

    return (
      <View style={styles.headerContainer}>
        {headers.map((header, index) => (
          <TextInput
            key={index}
            style={styles.headerText}
            value={header}
            editable={false}
          />
        ))}
      </View>
    );
  };

  const renderRow = (rowData, rowIndex) => {
    const headers = Object.keys(data[0] || {});
    const row = headers.map((header) => rowData[header]);

    return (
      <View style={styles.rowContainer}>
        {row.map((cell, columnIndex) => (
          <TextInput
            key={columnIndex}
            style={[
              styles.cellText,
              columnIndex === 0 && styles.firstColumnCell,
            ]}
            value={cell}
            onChangeText={(value) =>
              updateCellValue(rowIndex, headers[columnIndex], value)
            }
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {data.length > 0 && (
          <FlatList
            data={data}
            ListHeaderComponent={renderHeader}
            renderItem={({ item, index }) => renderRow(item, index)}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingHorizontal: 5,
  },
  firstColumnCell: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  rowSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HVACPage;
