import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth, db} from './../firebase';
import Login from './login';
import firebase from 'firebase';
import Loading from '../components/Loading';
import { useEffect } from 'react';
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(), // getting db timestamp and change it later for the client depending on his location
        photoURL: user.photoURL 
      }, {merge: true}) // only change the specified fields
    }
  }, [user]);

  if(loading) return <Loading/>
  if(!user) return <Login />
  return <Component {...pageProps} />
}

export default MyApp
