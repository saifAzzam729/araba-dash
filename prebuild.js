const fs = require('fs');
const _ = require("lodash");

// Define the filename
const envFilePath = './.env';
const serviceWorkersFilePath = './public/firebase-messaging-sw.js';

const checkingForKeys = [
    "VITE_APP_FIREBASE_API_KEY",
    "VITE_APP_FIREBASE_AUTH_DOMAIN",
    "VITE_APP_FIREBASE_PROJECT_ID",
    "VITE_APP_FIREBASE_STORAGE_BUCKET",
    "VITE_APP_FIREBASE_MESSAGING_SENDER_ID",
    "VITE_APP_FIREBASE_APP_ID",
    "VITE_APP_FIREBASE_MEASUREMENT_ID",
    "VITE_APP_FIREBASE_VAPID_KEY"
];


// Read the file asynchronously
fs.readFile(envFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file ${envFilePath}: ${err}`);
        return;
    }

    // Split the file content into lines
    const lines = data.split('\n');
    const variablesArray = [];

    // Iterate through each line
    lines.forEach(line => {
        // Check if the line starts with "VITE_APP_FIREBASE"
        if (line.startsWith('VITE_APP_FIREBASE')) {
            // Extract the variables
            const constLine = `const ${line}`;
            // console.log(constLine)
            variablesArray.push(constLine);
        }
    });

    const keysFromVariablesArrayFound = extractKeysFromEnvVariablesArray(variablesArray);
    checkIfAllKeyExisted(keysFromVariablesArrayFound, checkingForKeys);
    checkIsEmptyVariableValues(variablesArray)

    fs.writeFile(serviceWorkersFilePath, generateServiceWorkerData(variablesArray.join('\n')),
        'utf8', err => {
        if (err) {
            console.error(`Error writing file ${serviceWorkersFilePath}: ${err}`);
            throw new Error('There was an error with file parsing')
            return;
        }
        console.log(`File ${serviceWorkersFilePath} written successfully.`);
    });

});


function extractKeysFromEnvVariablesArray (variablesArray) {
    const keysFound = new Set();
    variablesArray.forEach(variable => {
        const [, keyWithValue] = variable.split('const ');
        const [key] = keyWithValue.split('=');
        const trimmedKey = key.trim();
        keysFound.add(trimmedKey);
    });
    return keysFound;
}

function checkIfAllKeyExisted(keysFromVariablesArrayFound, checkingForKeys) {
    const missingKeys = checkingForKeys.filter(key => !keysFromVariablesArrayFound.has(key));
    if (missingKeys.length > 0) {
        console.log("Missing keys:", missingKeys);
        throw new Error('One or more environment variables are empty.');
    } else {
        console.log("All keys present.");
    }
}

function checkIsEmptyVariableValues (variablesArray){
    variablesArray.forEach(variable => {
        const [, value] = variable.split('=');
        const trimmedValue = value.trim();
        const actualValue = eval(trimmedValue);

        if (_.isEmpty(actualValue)) {
            throw new Error('One or more environment variables are empty.');
        }
    });
}

function generateServiceWorkerData(variablesConfig) {
    return `importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');\n
${variablesConfig}\n
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
const messaging = firebase.messaging();`;
}


