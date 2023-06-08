import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native-web';
import { firebase } from '../../config';
import * as XLSX from 'xlsx';
import * as DocumentPicker from 'expo-document-picker';

const FileOut = () => {
  const exportData = async () => {
    try {
      const db = firebase.firestore();
      const querySnapshot = await db.collection('items').get();
      const itemsData = querySnapshot.docs.map((doc) => doc.data());

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(itemsData);
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
    <ImageBackground source={require('../assets/test3.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default FileOut;
