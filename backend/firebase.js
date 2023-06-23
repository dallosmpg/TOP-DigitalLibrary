// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBT5lN2inc4kwT6R6YxCMm3KJmfbpWeeP4',
  authDomain: 'library-tracker-38804.firebaseapp.com',
  projectId: 'library-tracker-38804',
  storageBucket: 'library-tracker-38804.appspot.com',
  messagingSenderId: '400206353120',
  appId: '1:400206353120:web:9384be578f4c564e743685',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
