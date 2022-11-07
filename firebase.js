import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCFbLtV40r9BR67FgPbELuD_TEFxnGWHho",
    authDomain: "mywhatsapp-bd1be.firebaseapp.com",
    projectId: "mywhatsapp-bd1be",
    storageBucket: "mywhatsapp-bd1be.appspot.com",
    messagingSenderId: "849977053142",
    appId: "1:849977053142:web:0380f39bd8ecda278b1e77"
  };

  const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });


  export {db, auth, provider};