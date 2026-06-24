import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVJclfpEp9Jo9879C3RfZKiEdBUibwrxI",
  authDomain: "ahmad-662ee.firebaseapp.com",
  projectId: "ahmad-662ee",
  storageBucket: "ahmad-662ee.firebasestorage.app",
  messagingSenderId: "740891153734",
  appId: "1:740891153734:web:58db6d1f6a6b57da618147",
  measurementId: "G-WY2R1ZJDPB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.send = async function(){

let usd = Number(document.getElementById("usd").value);

if(!usd){
alert("أدخل المبلغ");
return;
}

let rate = 14200;

let fee = usd * 0.01;

let net = usd - fee;

let syp = net * rate;

try{

await addDoc(
collection(db,"requests"),
{
usd: usd,
fee: fee,
syp: syp,
status: "pending",
date: new Date().toISOString()
}
);

document.getElementById("msg").innerHTML =
"✅ تم إرسال الطلب بنجاح";

}catch(error){

alert(error.message);

}

}
