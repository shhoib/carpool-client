import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBr_7FIfOERXj74AO_OSFyl0AByorfG4OE",
  authDomain: "carpool-a2783.firebaseapp.com",
  projectId: "carpool-a2783",
  storageBucket: "carpool-a2783.appspot.com",
  messagingSenderId: "1025380260879",
  appId: "1:1025380260879:web:eb5d0b3cc4694ce3d7177a",
  measurementId: "G-6N0JMMH9BC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const analytics = getAnalytics(app);
export {auth,provider}
