import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";

import IconUser from "../Icons/IconUser.js";
import firebase from "../config/firebaseconfig.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  const register = () => {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {

        let user = userCredential.user;

        navigation.navigate("Tarefa", {idUser: user.uid})
        
        setEmail("");
        setSenha("");

      })
      .catch((error) => {
        setErrorRegister(true);
        let errorcode = error.code;
        let errorMessage = error.message;
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={style.container}
    >
    <IconUser/>
    <Text style={style.title}>Crie sua conta</Text>
    
      <TextInput
        style={style.input}
        placeholder="Digite um email"
        type="text"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={style.input}
        secureTextEntry={true}
        placeholder="Digite uma senha"
        type="text"
        onChangeText={(text) => setSenha(text)}
        value={senha}
      />

    {errorRegister === true ? (
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
        <TouchableOpacity //botão de Cadastrar
          disabled={true}
          style={style.buttonRegisterDisable}
        >
          <Text style={style.textButtonRegister}>Cadastrar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={style.buttonRegister}
          onPress={() => register()}
        >
          <Text style={style.textButtonRegister}>Cadastrar</Text>
        </TouchableOpacity>
      )}

        <Text style={style.login}>

            Já tem uma conta ?
        <Text
            style={style.linkLogin}
            onPress={() => navigation.navigate("Login")}
        >
        <Text/> Login...

            </Text>
        </Text>

      <View style={{ height: 100 }} />

    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 30,
    },
    
    title: {
        fontSize: 48,
        color: "#D96800", //#f92e6a //#f92eca
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
    
    buttonRegister: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D96800",
        borderRadius: 50,
        marginTop: 30,
    },
    
    buttonRegisterDisable: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bdbdbd",
        borderRadius: 50,
        marginTop: 30,
    },
    
    textButtonRegister: {
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
    
    login: {
        marginTop: 20,
        color: "#4d5156",
    },
    
    linkLogin: {
        color: "#1877f2",
        fontSize: 16,
    },
});
