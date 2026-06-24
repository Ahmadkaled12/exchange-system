
// 1) إعداد Firebase (نملأه بعد قليل)
const firebaseConfig = {
  apiKey: "PUT_KEY",
  authDomain: "PUT_DOMAIN",
  projectId: "PUT_ID",
  storageBucket: "PUT_BUCKET",
  messagingSenderId: "PUT_ID",
  appId: "PUT_APP"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2) تحويل الأموال
function send(){

let usd = Number(document.getElementById("usd").value);

let rate = 13500;
let fee = usd * 0.05;
let net = usd - fee;
let syp = net * rate;

db.collection("requests").add({
usd,
fee,
syp,
date: new Date().toLocaleString()
});

document.getElementById("msg").innerHTML =
"تم إرسال الطلب ✔️";
}
