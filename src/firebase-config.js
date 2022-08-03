import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCmY_pOMJKpz8tBnqZAx3Q6_O1crWJRZzo",
  // authDomain: "tfood-phone-auth.firebaseapp.com",
  // projectId: "tfood-phone-auth",
  // storageBucket: "tfood-phone-auth.appspot.com",
  // messagingSenderId: "316063034781",
  // appId: "1:316063034781:web:27a59f6581c9a904969374"

  // apiKey: "AIzaSyC_gCy4ju0ujXZ326TMwYOdvdXjo-zN5AA",
  // authDomain: "tfood-phone-authen2.firebaseapp.com",
  // projectId: "tfood-phone-authen2",
  // storageBucket: "tfood-phone-authen2.appspot.com",
  // messagingSenderId: "834761928108",
  // appId: "1:834761928108:web:eeb7a0ae1163bd95535e09",
  // measurementId: "G-KE9YG0SBZH"

  // Tfood
  apiKey: "AIzaSyB9-j2Y5m0ZpxPfcwWqKsulVZZfsCyorSg",
  authDomain: "tfood-8c050.firebaseapp.com",
  projectId: "tfood-8c050",
  storageBucket: "tfood-8c050.appspot.com",
  messagingSenderId: "259876305288",
  appId: "1:259876305288:web:0f624678a3976ba595a23d"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);