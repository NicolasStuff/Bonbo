//Mise en place de la connection à Firestore de Firebase
import firebase from 'firebase/app'
import "firebase/auth";           //Pour les système d'authentification
import 'firebase/database';       //Database, non utilisé ici
import 'firebase/storage';        //Stockage, des photos par exemple
import 'firebase/firestore';      //Notre SGBD

var firebaseConfig = {
  //FIREBASE CONFIG CONTENT
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const authF = firebase.auth
  const database = firebase.database()
  const storage = firebase.storage()
  const counterRef = firebase.database
  const db = firebase.firestore();

export {auth, authF, database, storage, counterRef, db}     //export des variables récupérables en important dans chaque composant.