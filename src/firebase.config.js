// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABzxuWaWd2kfkFWq2wMI0ykfhJITpRak4",
  authDomain: "otpproject998866.firebaseapp.com",
  projectId: "otpproject998866",
  storageBucket: "otpproject998866.appspot.com",
  messagingSenderId: "90938663240",
  appId: "1:90938663240:web:5921bce0b75614e960137d",
  measurementId: "G-PDKKS3KFX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
