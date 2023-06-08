import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCNXpNHzB1EkafgQFStQ9WeAe4a63O-QJE",
    authDomain: "bgisapp1.firebaseapp.com",
    projectId: "bgisapp1",
    storageBucket: "bgisapp1.appspot.com",
    messagingSenderId: "456116842485",
    appId: "1:456116842485:web:e0c276a9ad3eed4a64babc",
    measurementId: "G-ZRL8V6Z928"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export { firebase };