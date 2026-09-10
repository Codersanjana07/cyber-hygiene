let db = null;

const firebaseConfig = {
    apiKey: "AIzaSyCUfGLL3aNrcc8gpikhMFhiJJ7BDSWEKvY",
    authDomain: "cyberhygieneapp-80d86.firebaseapp.com",
    projectId: "cyberhygieneapp-80d86",
    storageBucket: "cyberhygieneapp-80d86.firebasestorage.app",
    messagingSenderId: "419036618237",
    appId: "1:419036618237:web:a2796ae36fdc9eeea64d94"
};

try {

    if (typeof firebase === "undefined") {
        throw new Error("Firebase SDK was not loaded.");
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    db = firebase.firestore();

    console.log("Firebase initialized successfully.");

} catch (error) {

    console.error("Firebase initialization failed:", error);

    db = null;
}
