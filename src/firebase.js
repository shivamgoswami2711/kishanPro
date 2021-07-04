import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'; /*<--############*/

const firebaseConfig = {
    apiKey: "AIzaSyDVgzvCzkzlkU5Tj45QhAAw8jUy0neX87Y",
    authDomain: "kishanpro.firebaseapp.com",
    projectId: "kishanpro",
    storageBucket: "kishanpro.appspot.com",
    messagingSenderId: "939420644171",
    appId: "1:939420644171:web:e2995f38a552b51ed06ece"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;