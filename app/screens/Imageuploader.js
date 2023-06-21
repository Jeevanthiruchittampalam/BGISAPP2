import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput, ScrollView, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageUploaderPage = () => {
  const [images, setImages] = useState([]);
  const [partName, setPartName] = useState('');
  const [parentEquipment, setParentEquipment] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  useEffect(() => {
    retrieveSavedImages();
  }, []);

  const retrieveSavedImages = async () => {
    try {
      const savedImages = await AsyncStorage.getItem('uploadedImages');
      if (savedImages !== null) {
        setImages(JSON.parse(savedImages));
      }
    } catch (error) {
      console.log('Error retrieving saved images:', error);
    }
  };

  useEffect(() => {
    saveImages(images);
  }, [images]);

  const saveImages = async (updatedImages) => {
    try {
      await AsyncStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
    } catch (error) {
      console.log('Error saving images:', error);
    }
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const updatedImages = [
        ...images,
        {
          uri: result.uri,
          partName: partName,
          parentEquipment: parentEquipment,
          manufacturer: manufacturer,
          model: model,
        },
      ];
      setImages(updatedImages);
      resetForm();
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const resetForm = () => {
    setPartName('');
    setParentEquipment('');
    setManufacturer('');
    setModel('');
  };

  const renderImages = () => {
    return images.map((item, index) => (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          style={{ width: 100, height: 100, marginRight: 10 }}
          onPress={() => handleImageUpload()}
        >
          {item.uri ? (
            <Image source={{ uri: item.uri }} style={{ flex: 1 }} />
          ) : (
            <Text>No Image</Text>
          )}
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text>Part Name: {item.partName}</Text>
          <Text>Parent Equipment/System: {item.parentEquipment}</Text>
          <Text>Manufacturer: {item.manufacturer}</Text>
          <Text>Model: {item.model}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => removeImage(index)}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <TextInput
            placeholder="Part Name"
            value={partName}
            onChangeText={setPartName}
            style={styles.input}
          />
          <TextInput
            placeholder="Parent Equipment/System"
            value={parentEquipment}
            onChangeText={setParentEquipment}
            style={styles.input}
          />
          <TextInput
            placeholder="Manufacturer"
            value={manufacturer}
            onChangeText={setManufacturer}
            style={styles.input}
          />
          <TextInput
            placeholder="Model"
            value={model}
            onChangeText={setModel}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleImageUpload}
          >
            <Text style={styles.buttonText}>Add Image</Text>
          </TouchableOpacity>
        </View>
        {renderImages()}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = {
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
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
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default ImageUploaderPage;
