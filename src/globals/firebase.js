import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCKMEGqe00kcO5tevlJdH7jg0u346cb5Z8",
  authDomain: "quizapp-5e873.firebaseapp.com",
  databaseURL: "https://quizapp-5e873.firebaseio.com",
  projectId: "quizapp-5e873",
  storageBucket: "quizapp-5e873.appspot.com",
  messagingSenderId: "273997501494"
};
firebase.initializeApp(config);


export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
