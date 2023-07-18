import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, ScrollView, ImageBackground, Picker } from 'react-native-web';
import { firebase } from '../../../config';

const CoolPage = () => {
  const [formData, setFormData] = useState({
    'CLLI Code': '',
    'Building Category': '',
    'Building Name': '',
    'Building Type': '',
    'Manufacturer': '',
    'Model': '',
    'Notes': '',
    'Parent Equipment/System': '',
    'Part Description': '',
    'Part Location': '',
    'Last Cost': '',
    'Quantity On Site': '',
    'Region': '',
    'Relationship to Parent Equipment/System': '',
    'Serial Number': '',
    'Vendor': '',
    'Date Entered': '',
    'dateReceived': '', // Add new field with default value "N" 
    'Wish List': '', // Add new field with default value "N" 
    'collection': '' // Default collection value
  });

  const addItem = () => {
    if (isFormValid()) {
 
      const data = {
        ...formData,
       
      };

      const collection = formData.collection;
      const itemsRef = firebase.firestore().collection(collection);

      itemsRef
        .add(data)
        .then(() => {
          setFormData({
            'CLLI Code': '',
            'Building Category': '',
            'Building Name': '',
            'Building Type': '',
            'Manufacturer': '',
            'Model': '',
            'Notes': '',
            'Parent Equipment/System': '',
            'Part Description': '',
            'Part Location': '',
            'Last Cost': '',
            'Quantity On Site': '',
            'Region': '',
            'Relationship to Parent Equipment/System': '',
            'Serial Number': '',
            'Vendor': '',
            'Date Entered': '',
            'Wish List': '',
            'dateReceived': '', // Reset the field to default value "N"
            'collection': collection // Preserve the selected collection
          });
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      'CLLI Code',
      'Building Category',
      'Building Name',
      'Building Type',
      'Manufacturer',
      'Model',
      'Notes',
      'Parent Equipment/System',
      'Part Description',
      'Part Location',
      'Last Cost',
      'Quantity On Site',
      'Region',
      'Relationship to Parent Equipment/System',
      'Serial Number',
      'Date Entered',
      'Vendor'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field`);
        return false;
      }
    }
    return true;
  };

  const handleCollectionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      collection: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      'CLLI Code': '',
      'Building Category': '',
      'Building Name': '',
      'Building Type': '',
      'Manufacturer': '',
      'Model': '',
      'Notes': '',
      'Parent Equipment/System': '',
      'Part Description': '',
      'Part Location': '',
      'Last Cost': '',
      'Quantity On Site': '',
      'Region': '',
      'Relationship to Parent Equipment/System': '',
      'Serial Number': '',
      'Vendor': '',
      'Date Entered': '',
      'Wish List': '',
      'dateReceived': 'Not Yet Recieved', // Reset the field to default value "N"
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };


  return (
    <ImageBackground source={require('../../assets/test3.jpg')} style={styles.backgroundImage}>
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
      <Picker
            style={styles.input}
            selectedValue={formData.collection}
            onValueChange={(value) => handleCollectionChange(value)}
          >
            <Picker.Item label="SELECT" value="" />
            <Picker.Item label="SAIT" value="SAIT1Spares" />
            {/* <Picker.Item label="SAIT 2" value="SAIT2Spares" />
            <Picker.Item label="SAIT 3" value="SAIT3Spares" />
            <Picker.Item label="SAIT 4" value="SAIT4Spares" /> */}
          </Picker>
        <TextInput
          style={styles.input}
          placeholder="CLLI Code"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('CLLI Code', value)}
          value={formData['CLLI Code']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Building Category"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Building Category', value)}
          value={formData['Building Category']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Building Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Building Name', value)}
          value={formData['Building Name']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Building Type"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Building Type', value)}
          value={formData['Building Type']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Manufacturer"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Manufacturer', value)}
          value={formData['Manufacturer']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Model', value)}
          value={formData['Model']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Notes"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Notes', value)}
          value={formData['Notes']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Parent Equipment/System"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Parent Equipment/System', value)}
          value={formData['Parent Equipment/System']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Part Description"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Part Description', value)}
          value={formData['Part Description']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Part Location"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Part Location', value)}
          value={formData['Part Location']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Cost"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Last Cost', value)}
          value={formData['Last Cost']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity on Site"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Quantity On Site', value)}
          value={formData['Quantity On Site']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Region"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Region', value)}
          value={formData['Region']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Relationship to Parent Equipment/System"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Relationship to Parent Equipment/System', value)}
          value={formData['Relationship to Parent Equipment/System']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Serial Number"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Serial Number', value)}
          value={formData['Serial Number']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Vendor"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Vendor', value)}
          value={formData['Vendor']}
          underlineColor="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Date Entered, Format: YYYY-MM-DD"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Date Entered', value)}
          value={formData['Date Entered']}
          underlineColor="transparent"
          autoCapitalize="none"
        />

<TextInput
          style={styles.input}
          placeholder="Wish List (Enter Y Or N)"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => handleInputChange('Wish List', value)}
          value={formData['Wish List']}
          underlineColor="transparent"
          autoCapitalize="none"
        />

        <TextInput
            style={styles.input}
            placeholder="Date Received, Format: YYYY-MM-DD"
            placeholderTextColor="#aaaaaa"
            onChangeText={(value) => handleInputChange('dateReceived', value)}
            value={formData['dateReceived']}
            underlineColor="transparent"
            autoCapitalize="none"
        />

         
        
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    //backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    marginBottom: 10,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default CoolPage;
