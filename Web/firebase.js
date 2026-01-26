// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAutXPo5qMHK0NYWXjqXCG-WMh5pqmC39Y",
  authDomain: "hipergrafos-cafac.firebaseapp.com",
  projectId: "hipergrafos-cafac",
  storageBucket: "hipergrafos-cafac.firebasestorage.app",
  messagingSenderId: "1031039225075",
  appId: "1:1031039225075:web:1ca0980356cdb696893b86",
  measurementId: "G-SJYZWL22P2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// (opcional) exportar app si lo usarás en otros archivos
export { app };