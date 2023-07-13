import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Picker } from 'react-native-web';
import { firebase } from '../../../config';
import * as XLSX from 'xlsx';
import * as DocumentPicker from 'expo-document-picker';

const FileOut = () => {
  const [selectedCollection, setSelectedCollection] = useState('items');

  const exportData = async () => {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection(selectedCollection).get();
      const itemsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Convert Firestore Timestamps to JavaScript Dates
        if (data.dateEntered instanceof firebase.firestore.Timestamp) {
          data.dateEntered = data.dateEntered.toDate();
        }
        return data;
      });
  
      const worksheet = XLSX.utils.json_to_sheet(itemsData, {
        dateNF: 'yyyy-mm-dd', // Specify the desired date format
      });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');
      const excelData = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
  
      const fileName = 'items.xlsx';
      const data = new Blob([s2ab(excelData)], { type: 'application/octet-stream' });
  
      if (navigator.msSaveBlob) {
        // For IE and Edge
        navigator.msSaveBlob(data, fileName);
      } else {
        // For other browsers
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(data);
        link.download = fileName;
        link.click();
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };
  

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <ImageBackground source={require('../../assets/test3.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={selectedCollection}
          onValueChange={(value) => setSelectedCollection(value)}
        >
          <Picker.Item label="SELECT" value="" />
            <Picker.Item label="BCHydro 1" value="BCHydro1Spares" />
            <Picker.Item label="BCHydro 2" value="BCHydro2Spares" />
            <Picker.Item label="BCHydro 3" value="BCHydro3Spares" />
            <Picker.Item label="BCHydro 4" value="BCHydro4Spares" />
        </Picker>

        <TouchableOpacity style={styles.exportButton} onPress={exportData}>
          <Text style={styles.buttonText}>Export to Excel</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  picker: {
    height: 40,
    width: 300,
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  exportButton: {
    backgroundColor: '#144E87',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FileOut;
