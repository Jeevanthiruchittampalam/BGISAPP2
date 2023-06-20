import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firebase } from '../../../config';

const BCSparesList = () => {
  const [spares, setSpares] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('BCSpares')
      .onSnapshot((snapshot) => {
        const sparesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSpares(sparesData);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>CLLI Code:</Text>
      <Text style={styles.value}>{item['CLLI Code']}</Text>

      <Text style={styles.label}>Part Description:</Text>
      <Text style={styles.value}>{item['Part Description']}</Text>

      <Text style={styles.label}>Parent Equipment/System:</Text>
      <Text style={styles.value}>{item['Parent Equipment/System']}</Text>

      <Text style={styles.label}>Notes:</Text>
      <Text style={styles.value}>{item['Notes']}</Text>
    </View>
  );

  return (
    <FlatList
      data={spares}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#D5D5D5',
    marginVertical: 10,
  },
});

export default BCSparesList;
