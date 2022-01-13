import React from 'react';
import {
  StyleSheet, Text, Button, View,
} from 'react-native';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import {
  Text, Button, ScrollView, RefreshControl,
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
export default function App() {
  const [item, setItems] = useState([]);
  useEffect(() => {
    fruit.getAllFruits().then((res) => {
      setItems(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fruit.getAllFruits().then((res) => {
      setItems(res);
      setRefreshing(false);
    });
  };

  const [text, onChangeText] = React.useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  return (
    <ScrollView
      refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />)}
    >
      { item.map(({
        id, name, price,
      }) => (
        <Card
          key={id}
          style={{
            flex: 1, padding: 10, margin: 4,
          }}
        >
          <Card.Content>
            <Title>{name}</Title>
            <Text>{`價錢:${price}`}</Text>
          </Card.Content>
        </Card>
      ))}
      <Button
        onPress={() => fruit.getAllFruits()}
        title="get all fruit"
        color="#007FFF"
      />
      <Button
        onPress={() => {
          fruit.deleteNotApple().then(() => { onRefresh(); });
        }}
        title="delete not apple"
        color="#007FFF"
      />
      <Text>
        fruit
        {'\n'}
        name:
      </Text>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="input"
      />
      <Button
        onPress={() => {
          fruit.addFruit();
          onRefresh();
        }}
        title="add fruit"
        color="#007FFF"
      />
    </ScrollView>
  );
}