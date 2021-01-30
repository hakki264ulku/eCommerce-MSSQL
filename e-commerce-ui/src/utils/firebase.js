import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBPYf8e6WiVaMbWVZ5Z81I1lXoZ7Zqbkh4",
    authDomain: "ecommercesql.firebaseapp.com",
    projectId: "ecommercesql",
    storageBucket: "ecommercesql.appspot.com",
    messagingSenderId: "373967858219",
    appId: "1:373967858219:web:db39af6206fca1d613586e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase