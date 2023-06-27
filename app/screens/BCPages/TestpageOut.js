import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { firebase } from '../../../config';

const CalcPage = () => {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchTotalCost = async () => {
      try {
        const db = firebase.firestore();
        const collectionRef = db.collection('JEEVY');

        const snapshot = await collectionRef.get();
        let sum = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const lastCost = parseFloat(data['Last Cost']) || 0;

          sum += lastCost;
        });

        setTotalCost(sum);
      } catch (error) {
        console.log('Error calculating total cost:', error);
      }
    };

    fetchTotalCost();
  }, []);

  return (
    <View>
      <Text>Total Cost: {totalCost}</Text>
    </View>
  );
};

export default CalcPage;
