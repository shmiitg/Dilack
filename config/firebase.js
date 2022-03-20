import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDzGw11hvkH_1j8DoPQYlStEKKkoqop-KU",
    authDomain: "dilack-38324.firebaseapp.com",
    projectId: "dilack-38324",
    storageBucket: "dilack-38324.appspot.com",
    messagingSenderId: "240705607312",
    appId: "1:240705607312:web:4f23e65d28025452c1aa15",
    measurementId: "G-GB6S2M32NW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
