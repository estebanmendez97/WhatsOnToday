import React, {Conponent} from 'react';
import FireBase from 'firebase';

const config = {
    apiKey: "AIzaSyC1j4Ez2vrtzE9AsgVZxLBcNJOAXsUZZ1U",
    authDomain: "whats-on-today.firebaseapp.com",
    databaseURL: "https://whats-on-today.firebaseio.com",
    projectId: "whats-on-today",
    storageBucket: "whats-on-today.appspot.com",
    messagingSenderId: "831775207487"
  };

  const fire = FireBase.initializeApp(config);
  export default fire;
