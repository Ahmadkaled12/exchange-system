// firebase.js

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT"
};

firebase.initializeApp(firebaseConfig);

// خدمات جاهزة للاستخدام في كل المشروع
const auth = firebase.auth();
const db = firebase.database();
