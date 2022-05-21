import React, { useState, useEffect, useReducer, useId } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../config/firebaseconfig.js";

import storage from '../config/storage';

export default function Tarefa({ navigation, route }) {
  const database = firebase.firestore();
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  const user = firebase.auth().currentUser;
  const email = user.email;
  const displayName = user.displayName;

    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getIdToken() instead.
      const uid = user.uid;
}


    function logout(){
      firebase.auth().signOut().then(() => {
        navigation.navigate("Login");
      }).catch((error) => {

      });
    }
  
    function deleteTask(id){
      /*Alert.alert(
        "Deletar tarefa",
        "Tem certeza que deseja deletar essa tarefa ?",
        [
          {
            text: "Cancel",
            onPress: () => {
              return;
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => database.collection("Tarefas").doc(id).delete(),
          },
        ],
        { cancelable: false }
      ); */
      database.collection(route.params.idUser).doc(id).delete();
        
    }

    //carrega dados do banco
    useEffect(() => {
        database.collection(route.params.idUser).onSnapshot((query) => {
            const list = [];
            query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id})
            })
            setTask(list);
        })
    }, []);

  //função que adiciona nova tarefa
  async function addTask() {
    if (newTask == "") {
      Alert.alert("Atenção", "Não pode adicionar tarefa vazia!");
      alert("Não pode adicionar tarefa vazia!");
      return;
    }

    //pesquisa se tem uma tarefa igual
    const search = task.filter((task) => task === newTask);

    if (search.length != 0) {
      Alert.alert("Atenção", "Nome da tarefa repetido!");
      alert("Tarefa repetida!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");

    database.collection(route.params.idUser).add({
      description: newTask,
    })

    //navigation.navigate("Task");

    Keyboard.dismiss();
  }

  async function removeAllTasks() {
    setTask([]);

  /*  Alert.alert(
      "Confirmação",
      "Tem certeza que deseja deletar todas as tarefas ?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => setTask([]),
        },
      ],
      { cancelable: false }
    ); */
  }

  //função que remove uma tarefa
  async function removeTask(item) {
    deleteTask(item.id);

    setTask(task.filter((tasks) => tasks !== item));
    
  }

  // carrega os dados que foram salvos 
  useEffect(() => {
    async function loadData() {
      const tasks = await AsyncStorage.getItem("task");

      if (tasks) {
        setTask(JSON.parse(tasks));
      }
    }

    loadData();
  }, []);

  // salva os dados localmente
  useEffect(() => {
    async function saveData() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }

    saveData();
  }, [task]);

  
  /*useEffect(() => {
    storage.save({
      key: 'Tarefass',
      data:  task,
      expires: null
    })
    .catch(err => {
      alert("Não salvou!");
    });
  },[]);
  
  useEffect(() => {
    storage.load({
      key: 'Tarefass'
    })
    .then(obj => {
      setTask(obj);
    })
    .catch(err => {
        alert("Não recuperou nada viu!");
    });
  },[]);*/

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{ flex: 1 }}
        //enabled={Platform.OS === "ios"}
      >
        <View style={styles.container}>
          <Text>Logado como: {email} {displayName}</Text>
          <View style={styles.header}>
            <Text style={styles.title}> Tarefas</Text>
              <TouchableOpacity 
                style={styles.buttonLogout}
                onPress={() => logout()}
                > 
                  <MaterialIcons
                    name="logout"
                    size={25}
                    color="#f64c75"
                  />
              </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <FlatList
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
              data={task}
              renderItem={({ item }) => {
                return(
                <View style={styles.containerView}>
                  <Text style={styles.text}>{item.description}</Text>
                
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color="#f64c75"
                    />
                  </TouchableOpacity>
                </View>
                )
              }}
            />
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#999"
              autoCorrect={true}
              placeholder="Adicione uma tarefa"
              maxLength={25} //aumentar isso depois talvez
              onChangeText={(text) => setNewTask(text)}
              value={newTask}
            />
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => addTask()}
            >
              <Ionicons name="ios-add" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
  },
  header: {
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  body: {
    flex: 1,
  },
  form: {
    padding: 0,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#000",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 4,
    marginLeft: 10,
  },
  flatList: {
    flex: 1,
    marginTop: 5,
  },
  containerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#bdbdbd",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee",
  },
  text: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
});
