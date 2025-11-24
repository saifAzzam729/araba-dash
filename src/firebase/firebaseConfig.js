import {initializeApp} from "firebase/app";
import {onMessage, getMessaging} from "firebase/messaging";

const APP_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY;
const APP_AUTH_DOMAIN = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN;
const APP_PROJECT_ID = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID;
const APP_STORAGE_BUCKET = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET;
const APP_MESSAGING_SENDER_ID = import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID;
const APP_APP_ID = import.meta.env.VITE_APP_FIREBASE_APP_ID;
const APP_MEASUREMENT_ID = import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
    apiKey: APP_API_KEY,
    authDomain: APP_AUTH_DOMAIN,
    projectId: APP_PROJECT_ID,
    storageBucket: APP_STORAGE_BUCKET,
    messagingSenderId: APP_MESSAGING_SENDER_ID,
    appId: APP_APP_ID,
    measurementId: APP_MEASUREMENT_ID
};

export const onMessageListenerFactory = () => {
    let callback = null;
    let error = null;
    let messaging = null;

    try {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        messaging = getMessaging(app);

        callback = () => {
            return new Promise((resolve) => {
                onMessage(messaging, (payload) => {
                    console.log("payload", payload)
                    resolve(payload);
                });
            })
        }
    } catch (e) {
        error = e;
    }
    return [callback, messaging, error];
}

// Messaging service


