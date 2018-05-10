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


export const signedIn = () => {
  firebase.auth().onAuthStateChanged(function(user) {

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    } else {
      console.log("Noone is logged in atm!")
    }
  })
}


export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
