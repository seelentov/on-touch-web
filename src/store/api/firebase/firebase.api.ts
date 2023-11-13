import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD-xBJ7T3Q1SUIBifFcRfthXndsE077Mpg",
  authDomain: "intouch-6a1e4.firebaseapp.com",
  projectId: "intouch-6a1e4",
  storageBucket: "intouch-6a1e4.appspot.com",
  messagingSenderId: "339629713786",
  appId: "1:339629713786:web:301bd42219b4ad3cc44ec3"
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const storage = getStorage(app)
