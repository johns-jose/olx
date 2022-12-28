import firebase from  'firebase'
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBuyQlSX1spRRFmS-grb2ip6RcTXEVqDIc",
    authDomain: "reactolx-12f2f.firebaseapp.com",
    projectId: "reactolx-12f2f",
    storageBucket: "reactolx-12f2f.appspot.com",
    messagingSenderId: "360863779092",
    appId: "1:360863779092:web:62bd73787f0de49bbf1a01",
    measurementId: "G-DDEQ3WDDND"
  };

  export default firebase.initializeApp(firebaseConfig);

