import firestore from '@react-native-firebase/firestore';

const db = firestore();

// Function to fetch data from the Firestore collection
export const fetchInventoryData = async () => {
  try {
    const snapshot = await db.collection('inventory').get();
    const inventoryData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return inventoryData;
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    return [];
  }
};

// Function to add or update an item in the Firestore collection
export const saveInventoryItem = async (item) => {
  try {
    if (item.id) {
      // Item already exists, update it
      await db.collection('inventory').doc(item.id).update(item);
    } else {
      // Item is new, add it
      await db.collection('inventory').add(item);
    }
    console.log('Inventory item saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving inventory item:', error);
    return false;
  }
};

// Function to delete an item from the Firestore collection
export const deleteInventoryItem = async (itemId) => {
  try {
    await db.collection('inventory').doc(itemId).delete();
    console.log('Inventory item deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return false;
  }
};
