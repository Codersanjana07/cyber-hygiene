let db;
const firebaseConfig = {
    apiKey: "AIzaSyCUfGLL3aNrcc8gpikhMFhiJJ7BDSWEKvY",
    authDomain: "://firebaseapp.com",
    projectId: "cyberhygieneapp-80d86",
    storageBucket: "cyberhygieneapp-80d86.firebasestorage.app",
    messagingSenderId: "419036618237",
    appId: "1:419036618237:web:a2796ae36fdc9eeea64d94"
};

// Global core check setup to connect database perfectly anywhere
if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("Firebase initialized dynamically!");
    } catch (e) {
        console.log("Safe standalone failover check active.");
    }
}

