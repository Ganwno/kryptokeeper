// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7mAloh2JfDsmMHQnp-0MbeLGh86ASunA",
  authDomain: "kryptoking-e1b35.firebaseapp.com",
  databaseURL: "https://kryptoking-e1b35-default-rtdb.firebaseio.com",
  projectId: "kryptoking-e1b35",
  storageBucket: "kryptoking-e1b35.appspot.com",
  messagingSenderId: "309168270490",
  appId: "1:309168270490:web:653e8e9c2b0a0497ae4323"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;