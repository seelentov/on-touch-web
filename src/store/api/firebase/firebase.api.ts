

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// Оставлю свои токены для вашего теста
const firebaseConfig = {
  apiKey: "AIzaSyBtAjMwwHrjYe_kO-1c3zizoxIjh6Zqq2U",
  authDomain: "in-touch-dc505.firebaseapp.com",
  projectId: "in-touch-dc505",
  storageBucket: "in-touch-dc505.appspot.com",
  messagingSenderId: "47676391604",
  appId: "1:47676391604:web:9b01861896343b2e1cd7e1"
};

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

