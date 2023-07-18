import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Picker } from 'react-native-web';
import { firebase } from '../../../config';
import * as XLSX from 'xlsx';
import * as DocumentPicker from 'expo-document-picker';

const FileIn = () => {
  const [fileName, setFileName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('items');

const importData = async () => {
  try {
    const file = await DocumentPicker.getDocumentAsync({ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    if (file.type === 'success') {
      const { uri } = file;
      const response = await fetch(uri);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onload = async () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = jsonData[0];
        // ...
const itemsData = jsonData.slice(1).map((row) => {
  const item = {};
  headers.forEach((header, index) => {
    const value = row[index] || '';

    // Check if the header is "Date Entered"
    if (header === 'Date Entered') {
      // Convert Excel date value to desired format if it exists
      if (typeof value === 'number' && !isNaN(value)) {
        const dateValue = new Date(Math.round((value - 25569) * 86400 * 1000));
        const formattedDate = dateValue.toISOString().split('T')[0];
        item[header] = formattedDate;
      } else {
        item[header] = ''; // Set a default value if "Date Entered" is empty or invalid
      }
    } else {
      item[header] = value;
    }
  });
  return item;
});
// ...


        const db = firebase.firestore();
        const collectionRef = db.collection(selectedCollection); // Use selectedCollection
        await Promise.all(itemsData.map((item) => collectionRef.add(item)));

        setFileName(file.name);
      };

      reader.readAsArrayBuffer(blob);
    }
  } catch (error) {
    console.error('Error importing data:', error);
  }
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
            <Picker.Item label="AI 1" value="AI1Spares" />
            {/* <Picker.Item label="AI 2" value="AI2Spares" />
            <Picker.Item label="AI 3" value="AI3Spares" />
            <Picker.Item label="AI 4" value="AI4Spares" /> */}
        </Picker>

        <TouchableOpacity style={styles.importButton} onPress={importData}>
          <Text style={styles.buttonText}>Import Excel File</Text>
        </TouchableOpacity>

        {fileName !== '' && (
          <Text style={styles.fileNameText}>Imported File: {fileName}</Text>
        )}
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
  importButton: {
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
  fileNameText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FileIn;
