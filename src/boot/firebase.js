// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAvtAshBr8F2X8UAaPALJTw3puc-FeXZKc',
  authDomain: 'quasar-demo-96aea.firebaseapp.com',
  databaseURL: 'https://quasar-demo-96aea.firebaseio.com',
  projectId: 'quasar-demo-96aea',
  storageBucket: 'quasar-demo-96aea.appspot.com',
  messagingSenderId: '697422680429',
  appId: '1:697422680429:web:b7fbab8ba49f5bd537ca64',
  measurementId: 'G-PCXKCCEVB9',
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
export const firestore = firebaseApp.firestore();
