// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZQPV8byQ_tski3_KLJrXM3-c0q23ReM8",
  authDomain: "camera-050.firebaseapp.com",
  projectId: "camera-050",
  storageBucket: "camera-050.appspot.com",
  messagingSenderId: "824207918537",
  appId: "1:824207918537:web:cab3e99868014770245418"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};