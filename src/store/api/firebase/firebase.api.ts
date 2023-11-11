import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCB-bAiet9EvDsHqXoT9JMXAyaU5P6g2dM',
	authDomain: 'intouch-1fbfc.firebaseapp.com',
	projectId: 'intouch-1fbfc',
	storageBucket: 'intouch-1fbfc.appspot.com',
	messagingSenderId: '565680801038',
	appId: '1:565680801038:web:d553fe66580116f474035f',
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const storage = getStorage(app)
