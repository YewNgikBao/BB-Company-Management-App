import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyAHmlUT6WBh_lVrMOirhY9Z18xc57fSFZ8",

  authDomain: "yb1-ae18e.firebaseapp.com",

  projectId: "yb1-ae18e",

  storageBucket: "yb1-ae18e.firebasestorage.app",

  messagingSenderId: "278406966206",

  appId: "1:278406966206:web:3dbf470d1a0c63a8dbe7ef",

  measurementId: "G-YZQGS7NTME"

};

const app =
initializeApp(firebaseConfig);

export const db =
getFirestore(app);