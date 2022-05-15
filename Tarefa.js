import React, { useState, useEffect } from "react";
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

export default function Tarefa({ navigation }) {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");


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

    Keyboard.dismiss();
  }

  //função que remove uma tarefa
  async function removeTask(item) {
    Alert.alert(
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
          onPress: () => setTask(task.filter((tasks) => tasks !== item)),
        },
      ],
      { cancelable: false }
    );
  }

  // carrega os dados que foram salvos 
 /* useEffect(() => {
    async function loadData() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }

    loadData();
  }, []);*/

  // salva os dados localmente
  useEffect(() => {
    async function saveData() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }

    saveData();
  }, [task]);

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        //enabled={Platform.OS === "ios"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}> Tarefas</Text>
            <TouchableOpacity > 
                    <MaterialIcons
                      name="delete"
                      size={25}
                      color="#f64c75"
                    />
                  </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <FlatList
              style={styles.flatList}
              data={task}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.containerView}>
                  <Text style={styles.text}>{item}</Text>
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color="#f64c75"
                    />
                  </TouchableOpacity>
                </View>
              )}
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
            <TouchableOpacity style={styles.button} onPress={() => addTask()}>
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
    marginTop: 20,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "#eee",

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