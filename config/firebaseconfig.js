import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyAc_2oUWInbt6nRIFtd5XZBk46lXEHu2Ko",
    authDomain: "apptarefa-38a0a.firebaseapp.com",
    projectId: "apptarefa-38a0a",
    storageBucket: "apptarefa-38a0a.appspot.com",
    messagingSenderId: "729654935129",
    appId: "1:729654935129:web:ea231d2ab3c58f3c857b48"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.firestore();
  
  export default database;