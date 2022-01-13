import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyB8yc0xlMdEcpdQn9YLFLAcze6M5YWcl3Y",
    authDomain: "fir-practice-ed937.firebaseapp.com",
    projectId: "fir-practice-ed937",
    storageBucket: "fir-practice-ed937.appspot.com",
    messagingSenderId: "173872901549",
    appId: "1:173872901549:web:1498d50012c9d4e16f4524",
    measurementId: "G-YKX9KE6RJP"
};

async function getFruit() {
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('09JltAYodnHgUAPCLypd');
  const doc = await fruitRef.get();
  console.log(doc.data());
}

async function getAllFruits() {
  const db = firebase.firestore();
  const fruitsRef = db.collection('fruit');
  const querySnapshot = await fruitsRef.get();
  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
}

function addFruit() {
  const db = firebase.firestore();
  const fruitsRef = db.collection('fruit');
  const fruit = {
      name: "C**",
      price: 10000,
      onSale: false,
  };
  fruitsRef.add(fruit);
}

function deleteFruit() {
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('MlHZmnhq4YbtWntFWX8d');
  fruitRef.delete();
}
/*
async function switchFruitOnSale() {
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('g2P1ymMGcfXxkbw4WLJX');
  const doc = await fruitRef.get();
  fruitRef.set({'onSale': true,},);
}
*/
async function switchFruitOnSale() {
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('wWO9OVYZ8KAP9LnOWzH8');
  const doc = await fruitRef.get();
  fruitRef.update({
      'onSale': true,
  });

export default {
  getFruit,
  getAllFruits,
  addFruit,
  deleteFruit,
  switchFruitOnSale,
}