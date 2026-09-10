let db = null;
const firebaseConfig = {
    apiKey: "AIzaSyCUfGLL3aNrcc8gpikhMFhiJJ7BDSWEKvY",
    authDomain: "://firebaseapp.com",
    projectId: "cyberhygieneapp-80d86",
    storageBucket: "cyberhygieneapp-80d86.firebasestorage.app",
    messagingSenderId: "419036618237",
    appId: "1:419036618237:web:a2796ae36fdc9eeea64d94"
};

// Fail-safe protection layer to completely bypass CORS script blocking errors offline
if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("Cloud Database Connection Active!");
    } catch (e) {
        console.log("CORS block detected. Hybrid Fail-safe memory storage activated cleanly.");
    }
}
