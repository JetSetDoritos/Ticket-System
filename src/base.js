import * as firebase from 'firebase';
require('firebase/auth');

var config = {
    apiKey: "AIzaSyBKTvYuchVUVMBETWFvRsO56eP_7yIWqCs",
    authDomain: "ticket-system-d1de5.firebaseapp.com",
    databaseURL: "https://ticket-system-d1de5.firebaseio.com",
    projectId: "ticket-system-d1de5",
    storageBucket: "ticket-system-d1de5.appspot.com",
    messagingSenderId: "441428437256"
  };

  const app = firebase.initializeApp(config);

  export default app;