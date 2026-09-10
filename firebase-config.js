// ==========================================
// FIREBASE CONFIGURATION
// ==========================================

let db = null;

const firebaseConfig = {
    apiKey: "AIzaSyCUfGLL3aNrcc8gpikhMFhiJJ7BDSWEKvY",
    authDomain: "cyberhygieneapp-80d86.firebaseapp.com",
    projectId: "cyberhygieneapp-80d86",
    storageBucket: "cyberhygieneapp-80d86.firebasestorage.app",
    messagingSenderId: "419036618237",
    appId: "1:419036618237:web:a2796ae36fdc9eeea64d94"
};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

try {

    if (typeof firebase === "undefined") {
        throw new Error("Firebase SDK is not loaded.");
    }

    // Firebase ko sirf ek baar initialize karo
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Firestore database
    db = firebase.firestore();

    console.log("✅ Firebase connected successfully.");
    console.log("✅ Firestore is ready.");

} catch (error) {

    console.error(
        "❌ Firebase initialization failed:",
        error
    );

    db = null;
}
