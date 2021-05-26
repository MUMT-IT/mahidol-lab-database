// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDggk_VGPS5qjZ-AuXoA37nPeR5QS-UFAc",
  authDomain: "mahidol-lab-database.firebaseapp.com",
  projectId: "mahidol-lab-database",
  storageBucket: "mahidol-lab-database.appspot.com",
  messagingSenderId: "716880250869",
  appId: "1:716880250869:web:c577886288e7dd94fa82bc",
  measurementId: "G-L96R9YCWTF"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export {
  firebase as fb,
  db
}