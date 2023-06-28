import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { firebase } from '../../../config';

const ImportPage = () => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }); 

      if (document.type === 'success') {
        setLoading(true);
        const { uri } = document;

        const response = await fetch(uri);
        const fileData = await response.arrayBuffer();
        const workbook = XLSX.read(fileData, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setLoading(false);
        console.log('Excel file imported successfully!');

        // Store data in Firestore
        const db = firebase.firestore();
        const collectionRef = db.collection('ELEC');
        
        // Delete existing documents in the collection
        const deleteQuery = await collectionRef.get();
        deleteQuery.forEach((doc) => {
          doc.ref.delete();
        });

        // Extract column headers from Excel file
        const headers = jsonData[0];

        // Add imported data to Firestore
        jsonData.slice(1).forEach((rowData) => {
          const data = {};

          // Map column headers to field names
          headers.forEach((header, index) => {
            data[header] = rowData[index] || '';
          });

          collectionRef.add(data);
        });

        console.log('Data stored in Firestore!');
      }
    } catch (error) {
      console.log('Error importing Excel file:', error);
    }
  };

  return (
    <View>
      <Button onPress={handleFileUpload} title="Import Excel File" />
      {loading && <Text>Loading...</Text>}
    </View>
  );
};

export default ImportPage;
