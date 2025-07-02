// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMZGDaY_nRE5mBZN0wvA8XgWfEq_YIIzg",
  authDomain: "indiyase-50c7a.firebaseapp.com",
  projectId: "indiyase-50c7a",
  storageBucket: "indiyase-50c7a.appspot.com",
  messagingSenderId: "172845577570",
  appId: "1:172845577570:web:f5169a29b924083375e83b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
