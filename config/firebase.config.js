// Importing the required functions from the SDKs
const { initializeApp } = require("firebase/app");

const { getAuth } = require("firebase/auth");


// web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

module.exports = {
  auth
} //Authentication service available for use in other files or modules.