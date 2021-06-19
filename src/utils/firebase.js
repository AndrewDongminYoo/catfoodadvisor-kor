import firebase from 'firebase/app'
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAP4wrhL3SbVhBWklK0V6fpevLiURej0jw",
  authDomain: "myhoneytip-yudongmin.firebaseapp.com",
  databaseURL: "https://myhoneytip-yudongmin-default-rtdb.firebaseio.com",
  projectId: "myhoneytip-yudongmin",
  storageBucket: "myhoneytip-yudongmin.appspot.com",
  messagingSenderId: "407346613841",
  appId: "1:407346613841:web:dbfebf7c7c741c14d7b270",
  measurementId: "G-94TER37FP1"
};

firebase.initializeApp(firebaseConfig);

export const firebase_db = firebase.database()