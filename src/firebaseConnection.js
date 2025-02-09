import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtWnQnTGmZPvcEkMK-vRKph3s3TF-M7Ks",
  authDomain: "devcursoreactnative.firebaseapp.com",
  projectId: "devcursoreactnative",
  storageBucket: "devcursoreactnative.firebasestorage.app",
  messagingSenderId: "586360312922",
  appId: "1:586360312922:web:8694904494a120210ef463"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db;