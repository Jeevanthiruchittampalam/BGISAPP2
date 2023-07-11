import React from 'react';
import { firebase } from '../../config';

const ClearPage = () => {
  const clearCollection = async () => {
    try {
      const db = firebase.firestore();
      const collectionRef = db.collection('HVAC');

      // Retrieve all documents in the collection
      const querySnapshot = await collectionRef.get();

      // Delete each document in the collection
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });

      console.log('Collection cleared successfully!');
    } catch (error) {
      console.error('Error clearing collection:', error);
    }
  };

  return (
    <div>
      <h1>Clear Page</h1>
      <button onClick={clearCollection}>Clear Collection</button>
    </div>
  );
};

export default ClearPage;
