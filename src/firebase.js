import firebase from 'firebase/app';
import 'firebase/database';
require('firebase/auth');

var firebaseConfig = {
  apiKey: "AIzaSyCmtwYuY8W4Rd24vJeEoMMj2dD6HC-YZ3o",
  authDomain: "meuapp-292f5.firebaseapp.com",
  databaseURL: "https://meuapp-292f5.firebaseio.com",
  projectId: "meuapp-292f5",
  storageBucket: "meuapp-292f5.appspot.com",
  messagingSenderId: "543981244708",
  appId: "1:543981244708:web:905bf434e5688f9a18a3b1",
  measurementId: "G-97LY176L0J"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;