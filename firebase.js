import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// ================== Firebase Config ==================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ================== Init (Prevent duplicate app) ==================
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ================== Services ==================
const db = getFirestore(app);
const auth = getAuth(app);

// ================== Settings System ==================

// 💱 جلب الإعدادات (مثل سعر الصرف)
async function getSettings() {
  const ref = doc(db, "settings", "rates");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  // إذا غير موجود → ننشئه افتراضي
  const defaultData = {
    SYP: 14000
  };

  await setDoc(ref, defaultData);
  return defaultData;
}

// 💱 جلب سعر الصرف مباشرة
async function getRate() {
  const settings = await getSettings();
  return settings.SYP || 14000;
}

// ================== Exports ==================
export { db, auth, getSettings, getRate };
