// Firebase configuration setup connected directly to your active project
const firebaseConfig = {
    apiKey: "AIzaSyCUfGLL3aNrcc8gpikhMFhiJJ7BDSWEKvY",
    authDomain: "://firebaseapp.com",
    projectId: "cyberhygieneapp-80d86",
    storageBucket: "cyberhygieneapp-80d86.firebasestorage.app",
    messagingSenderId: "419036618237",
    appId: "1:419036618237:web:a2796ae36fdc9eeea64d94"
};

// Safely initialize the application
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
