importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const VITE_APP_FIREBASE_API_KEY="AIzaSyCs224Jsjcn0cP6xQyaXf4DFENX9JBqRMM"
const VITE_APP_FIREBASE_AUTH_DOMAIN="sheen-core.firebaseapp.com"
const VITE_APP_FIREBASE_PROJECT_ID="sheen-core"
const VITE_APP_FIREBASE_STORAGE_BUCKET="sheen-core.appspot.com"
const VITE_APP_FIREBASE_MESSAGING_SENDER_ID="769555123164"
const VITE_APP_FIREBASE_APP_ID="1:769555123164:web:54e10a28159e2e1eccdd19"
const VITE_APP_FIREBASE_MEASUREMENT_ID="G-ZZQRXC52WK"
const VITE_APP_FIREBASE_VAPID_KEY="BMxUq2lji7jie1hj_EfAmfXEHHblKhosj3iELCPYPi8sDDZDsIeRPZe6bk6nQ36b294H4eR90H5_s-wAdw-A0VU"

const firebaseConfig = {
    apiKey: VITE_APP_FIREBASE_API_KEY,
    authDomain: VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: VITE_APP_FIREBASE_APP_ID,
    measurementId: VITE_APP_FIREBASE_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();