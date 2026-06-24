import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ================== Firebase Config ==================
const firebaseConfig = {
  apiKey: "AIzaSyCVJclfpEp9Jo9879C3RfZKiEdBUibwrx",
  authDomain: "ahmad-662ee.firebaseapp.com",
  projectId: "ahmad-662ee",
  storageBucket: "ahmad-662ee.firebasestorage.app",
  messagingSenderId: "740891153734",
  appId: "1:740891153734:web:58db6d1f6a6b57da618147",
  measurementId: "G-WY2R1ZJDPB"
};

// ================== Init ==================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================== Get Rate from Firebase ==================
async function getRate() {
  try {
    const ref = doc(db, "settings", "rates");
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data().SYP || 14200;
    } else {
      return 14200; // fallback
    }
  } catch (e) {
    console.log("Rate error:", e);
    return 14200;
  }
}

// ================== Send Request ==================
window.send = async function () {

  let usd = Number(document.getElementById("usd").value);
  let name = document.getElementById("name")?.value || "";
  let whatsapp = document.getElementById("whatsapp")?.value || "";

  if (!usd || usd <= 0) {
    alert("أدخل المبلغ بشكل صحيح");
    return;
  }

  // 💱 جلب السعر من Firebase
  let rate = await getRate();

  // 💰 حسابات
  let fee = usd * 0.01;
  let net = usd - fee;
  let syp = net * rate;

  try {

    await addDoc(collection(db, "requests"), {
      usd: usd,
      fee: fee,
      syp: syp,
      rate: rate,
      name: name,
      whatsapp: whatsapp,
      status: "pending",
      date: new Date().toISOString()
    });

    document.getElementById("msg").innerHTML =
      "✅ تم إرسال الطلب بنجاح";

  } catch (error) {
    alert(error.message);
  }
};
