import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {getAuth} from 'firebase/auth'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyD7UFlaQmSfaXg4IV0jAMmXuUiBTIiTNMw",
  authDomain: "teranga-cargo.firebaseapp.com",
  projectId: "teranga-cargo",
  storageBucket: "teranga-cargo.firebasestorage.app",
  messagingSenderId: "603665623756",
  appId: "1:603665623756:web:f2c0ac48668fea7c0bb069"
  });


// used for the firestore refs
export const db = getFirestore(firebaseApp)


const storage = getStorage(firebaseApp)

// here we can export reusable database reference
export const auth = getAuth()
export { storage  }