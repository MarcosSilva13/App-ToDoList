import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";

import firebase from "../config/firebaseconfig.js";
import IconTask from "../Icons/IconTask.js";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const loginFirebase = () => {
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {

      let user = userCredential.user;
      
      navigation.navigate("Tarefa", {idUser: user.uid})

      setEmail("");
      setSenha("");
      setErrorLogin(false)
    })
    .catch((error) => {
      setErrorLogin(true)
      let errorcode = error.code;
      let errorMessage = error.message;
    });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        navigation.navigate("Tarefa", { idUser: user.uid })
      }
    });
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={style.container}
    >
      <Text style={style.title}>Tarefas<IconTask/> </Text>
      <TextInput
        style={style.input}
        placeholder="Digite seu email"
        type="text"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={style.input}
        secureTextEntry={true}
        placeholder="Digite sua senha"
        type="text"
        onChangeText={(text) => setSenha(text)}
        value={senha}
      />

      {errorLogin === true ? (
        <View style={style.contentAlert}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={24}
            color="#bdbdbd"
          />
          <Text style={style.warningAlert}>Email ou senha inválido!</Text>
        </View>
      ) : (
        <View />
      )}

      {email === "" || senha === "" ? (
        <TouchableOpacity
          disabled={true}
          style={style.buttonLoginDisable}
        >
          <Text style={style.textButtonLogin}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={style.buttonLogin}
          onPress={() => loginFirebase()}
        >
          <Text style={style.textButtonLogin}>Login</Text>
        </TouchableOpacity>
      )}

      <Text style={style.registration}>
        Ainda não tem uma conta ?
        <Text
          style={style.linkSubscribe}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text/> Cadastre-se...

        </Text>
      </Text>

        <TouchableOpacity
          style={style.buttonAbout}
          onPress={() => navigation.navigate("Sobre")}
        >
          <MaterialCommunityIcons 
            name="information-variant"
            size={30}
            color="#D96800"
          />

          <Text style={style.textAbout}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.buttonFaq}
          onPress={() => navigation.navigate("Faq")}
        >
          <FontAwesome 
            name="question-circle" 
            size={30} 
            color="#D96800" 
          />
          <Text style={style.textFaq}>FAQ</Text>

        </TouchableOpacity>

      <View style={{ height: 5 }} />
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },

  title: {
    fontSize: 54,
    color: "#D96800",
    marginBottom: 10,
    fontWeight: "bold",
  },

  input: {
    width: 300,
    marginTop: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#D96800",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#000",
  },

  buttonLogin: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D96800",
    borderRadius: 50,
    marginTop: 30,
  },

  buttonLoginDisable: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bdbdbd",
    borderRadius: 50,
    marginTop: 30,
  },

  textButtonLogin: {
    color: "#fff",
    fontSize: 22
  },

  contentAlert: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  warningAlert: {
    paddingLeft: 10,
    color: "#bdbdbd",
    fontSize: 16,
  },

  registration: {
    marginTop: 20,
    color: "#4d5156",
  },

  linkSubscribe: {
    color: "#1877f2",
    fontSize: 16,
  },

  Button: {
    height: 30,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  buttonAbout: {
    width: 40,
    height: 40,
    top: 10,
    left: -50,
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20
  },

  textAbout: {
    marginTop: 1,
    color: "#D96800",
  },

  buttonFaq: {
    width: 40,
    height: 40,
    top: -49,
    left: 50,
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
  },
  
  textFaq: {
    marginTop: 1,
    color: "#D96800",
  }
});
