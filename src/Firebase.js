// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv6U8VxQW7woSo5Zc2G-pmXlslPX0RxQc",
  authDomain: "quranquiz-9bf12.firebaseapp.com",
  projectId: "quranquiz-9bf12",
  storageBucket: "quranquiz-9bf12.appspot.com",
  messagingSenderId: "702101550068",
  appId: "1:702101550068:web:fe334dd73bd4169654bfa1",
  measurementId: "G-XPX90D2NT1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
