import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header'
import ToDoItem from './components/ToDoItem'
import AddToDo from './components/addToDo'

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'buy coffee', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play on the switch', key: '3'}
  ])

  const pressHandler = (key) => {
    setTodos((prevToDos) => {
      console.log("todo.key")
      return prevToDos.filter(todo => todo.key !== key);
    });
  }

  const submitHandler = (text) => {
    if(text.length >= 4){
      setTodos((prevToDos) => {
        return [
          ...prevToDos,
          { text: text, key: Math.random().toString() }
        ]
      })
    }else{
      Alert.alert('OOPS!', 'ToDos must be at least 4 characters long', [
        {text: 'Okay', onPress: () => console.log('alert closed')}
      ])
    }
    
  }
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddToDo submitHandler = { submitHandler} />
          <View style={styles.list}>
            <FlatList 
              data = {todos}
              renderItem={({ item }) => (
                <ToDoItem item={item} pressHandler={pressHandler} />
              )}
              />
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  }
});