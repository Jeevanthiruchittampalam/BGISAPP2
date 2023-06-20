import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageUploaderPage = () => {
  const [images, setImages] = useState([]);

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

  const saveImages = async (updatedImages) => {
    try {
      await AsyncStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
    } catch (error) {
      console.log('Error saving images:', error);
    }
  };

  const handleImageUpload = async (index) => {
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
      const updatedImages = [...images];
      updatedImages[index] = result.uri;
      setImages(updatedImages);
      saveImages(updatedImages); // Save the updated images
    }
  };

  const renderImageBoxes = () => {
    const imageBoxes = [];

    for (let i = 0; i < 4; i++) {
      imageBoxes.push(
        <TouchableOpacity
          key={i}
          style={{ width: 100, height: 100, margin: 10 }}
          onPress={() => handleImageUpload(i)}
        >
          {images[i] ? (
            <Image source={{ uri: images[i] }} style={{ flex: 1 }} />
          ) : (
            <Text>No Image</Text>
          )}
        </TouchableOpacity>
      );
    }

    return imageBoxes;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row' }}>{renderImageBoxes()}</View>
    </View>
  );
};

export default ImageUploaderPage;
