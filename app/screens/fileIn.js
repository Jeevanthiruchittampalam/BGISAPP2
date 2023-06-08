import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native-web';
import { firebase } from '../../config';
import * as XLSX from 'xlsx';
import * as DocumentPicker from 'expo-document-picker';
const FileIn = () => {
    const [fileName, setFileName] = useState('');
  
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
            const itemsData = jsonData.slice(1).map((row) => {
              const item = {};
              headers.forEach((header, index) => {
                item[header] = row[index] || '';
              });
              return item;
            });
  
            // Add the itemsData to the 'items' collection in Firebase
            const db = firebase.firestore();
            await Promise.all(itemsData.map((item) => db.collection('items').add(item)));
  
            setFileName(file.name);
          };
  
          reader.readAsArrayBuffer(blob);
        }
      } catch (error) {
        console.error('Error importing data:', error);
      }
    };
  
    return (
      <ImageBackground source={require('../assets/test3.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>'
      
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
 