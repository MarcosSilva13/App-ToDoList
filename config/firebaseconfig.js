import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpX2xLmlG3TN_DFEepCarqjByBdRS3c4c",
  authDomain: "authentication-a9734.firebaseapp.com",
  projectId: "authentication-a9734",
  storageBucket: "authentication-a9734.appspot.com",
  messagingSenderId: "610788136360",
  appId: "1:610788136360:web:042f6d791043375d41f99d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
export default firebase;

  