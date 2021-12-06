import React from 'react';
import {
  StyleSheet, Text, Button, View,
} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const firebaseConfig = {
    apiKey: "AIzaSyB8yc0xlMdEcpdQn9YLFLAcze6M5YWcl3Y",
    authDomain: "fir-practice-ed937.firebaseapp.com",
    projectId: "fir-practice-ed937",
    storageBucket: "fir-practice-ed937.appspot.com",
    messagingSenderId: "173872901549",
    appId: "1:173872901549:web:1498d50012c9d4e16f4524",
    measurementId: "G-YKX9KE6RJP"
};

function possessTime() {
  let currentTime = new Date();
  let currentYear = currentTime.getUTCFullYear();
  let currentMonth = currentTime.getUTCMonth();
  let currentDay = currentTime.getUTCDay();
  let currentHours = currentTime.getUTCHours();
  let currentMinutes = currentTime.getUTCMinutes();
  let currentSeconds = currentTime.getUTCSeconds();
  let output = currentYear + '年' + currentMonth.toString().padStart(2, '0') + '月' + currentDay.toString().padStart(2, '0') + '日';
  if (currentHours >= 12) {
    output = output + ' 下午'+ currentHours.toString().padStart(2, '0') + ':' + currentMinutes.toString().padStart(2, '0') + ':' + currentSeconds.toString().padStart(2, '0') + ' [UTC+8]';
  }
  else {
    output = output + ' 上午'+ currentHours.toString().padStart(2, '0') + ':' + currentMinutes.toString().padStart(2, '0') + ':' + currentSeconds.toString().padStart(2, '0') + ' [UTC+8]';
  }
  return output;
}

function toDateString(time) {
  const date = new Date(time*1000);
  const dateString = `${date.getFullYear().toString()}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}  ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}:${
    date.getSeconds().toString().padStart(2, '0')}`;

  return dateString;
}

function addCurrentTime() {
  const db = firebase.firestore();
  const timesRef = db.collection('time');
  const currenttime = {
    time: new Date(),
  }
  timesRef.add(currenttime);
}

async function getAllTimes() {
  const db = firebase.firestore();
  const fruitsRef = db.collection('time');
  const querySnapshot = await fruitsRef.get();
  if (querySnapshot.empty) {
    console.log("Time queue is empty");
  }
  querySnapshot.forEach((doc) => {
    console.log(toDateString(doc.data()["time"]["seconds"]));
    
  });
}

async function deleteEarliestTime() {
  const db = firebase.firestore();
  const fruitsRef = db.collection('time');
  const querySnapshot = await fruitsRef.get();
  let EarliestTime = 9999999999;
  let timeID;
  querySnapshot.forEach((doc) => {
    if (doc.data()["time"]["seconds"] < EarliestTime) {
      timeID = doc.id;
      EarliestTime = doc.data()["time"]["seconds"];
    }
  });
  const fruitRef = db.collection('time').doc(timeID);
  fruitRef.delete();

}

async function getLastestTime() {
  const db = firebase.firestore();
  const fruitsRef = db.collection('time');
  const querySnapshot = await fruitsRef.get();
  let LastestTime = 0;
  querySnapshot.forEach((doc) => {
    if (doc.data()["time"]["seconds"] > LastestTime) {
      
      LastestTime = doc.data()["time"]["seconds"];
    }
  });
  console.log(toDateString(LastestTime));
}

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  return (
    <View style={styles.container}>
      <Button onPress={getLastestTime} title="get lastest time" color="#FFBF00" />
      <Text>{'\n'}</Text>
      <Button onPress={getAllTimes} title="get all time" color="#007FFF" />
      <Text>{'\n'}</Text>
      <Button onPress={addCurrentTime} title="add current time" color="#00FF00" />
      <Text>{'\n'}</Text>
      <Button onPress={deleteEarliestTime} title="delete earliest time" color="#FF0000" />
    </View>
  );
}
/*
import React from 'react';
import {
  StyleSheet, Text, Button, View,
} from 'react-native';
import firebase from 'firebase';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
  const fruitRef = db.collection('fruit').doc('lxGd4O5mzGYUPRzDUV3p');
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

async function switchFruitOnSale() {
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('g2P1ymMGcfXxkbw4WLJX');
  const doc = await fruitRef.get();
  fruitRef.set({'onSale': true,},);
}

async function switchFruitOnSale() {
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('wWO9OVYZ8KAP9LnOWzH8');
  const doc = await fruitRef.get();
  fruitRef.update({
      'onSale': true,
  });
}

async function getAllFruits(){
  const fruiitArray = [];
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('wWO9OVYZ8KAP9LnOWzH8');
  const doc = await fruitRef.get();
  
}

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  return (
    <View style={styles.container}>
      <Button onPress={getFruit} title="get fruit" color="#007FFF" />
      <Text>{'\n'}</Text>
      <Button onPress={getAllFruits} title="get all fruits" color="#0000FF" />
      <Text>{'\n'}</Text>
      <Button onPress={addFruit} title="add fruit" color="#00FF00" />
      <Text>{'\n'}</Text>
      <Button onPress={deleteFruit} title="delete fruit" color="#FF0000" />
      <Text>{'\n'}</Text>
      <Button onPress={switchFruitOnSale} title="switch on sale" color="#FFBF00" />  
      
    
    </View>
  );
}
*/