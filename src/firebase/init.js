import firebaseConfig from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';

//initialiser firebase
export const instanceFirebase = initializeApp(firebaseConfig);

//Aller chercher le module Auth de google depuis firebase
export const authFirebase = getAuth();

// initialiser l'authentification fédéré de google
export const authGoogle = new GoogleAuthProvider




//initialiser firestore
 export const bdFirestore = getFirestore();


