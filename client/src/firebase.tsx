// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-740a2.firebaseapp.com",
  projectId: "mern-estate-740a2",
  storageBucket: "mern-estate-740a2.appspot.com",
  messagingSenderId: "660723839448",
  appId: "1:660723839448:web:8cfe12c93abdf144f102ad",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
