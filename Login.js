import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    
    const emailTeste = "marcos@gmail.com";
    const senhaTeste = "123456789";

   function checkLogin() {

        if (email !== emailTeste) {
            Alert.alert("Atenção", "Email incorreto!"); // no android

            alert("Email incorreto!"); // na web
        } else if(senha !== senhaTeste){
            Alert.alert("Atenção", "Senha incorreta!"); // no android

            alert("Senha incorreta!"); // na web
        } else {
            navigation.navigate("Tarefa");
        }
    }
  
    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.container} 
    >
        <Text style={style.title}>Tarefas</Text>
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

        {errorLogin === true 
        ?
            <View style={style.contentAlert}>
                <MaterialCommunityIcons 
                    name="alert-circle"
                    size={24}
                    color="#bdbdbd"
                />
                <Text style={style.warningAlert}>Email ou senha inválido!</Text>
            </View>    
        :
            <View/>
        }

        
        {email === "" || senha === ""
        ?
        <TouchableOpacity    //botão de login
            disabled={true}
            style={style.buttonLoginDisable}
        >
            <Text style={style.textButtonLogin}>Login</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
            style={style.buttonLogin}
            onPress={() => checkLogin()}
            
        >
            <Text style={style.textButtonLogin}>Login</Text>
        </TouchableOpacity>
        }
    
        <Text style={style.registration}> 
            Ainda não tem uma conta ?    
            <Text 
            style={style.linkSubscribe}
            //onPress={() => navigation.navigate("Cadastro")}
            >
                <Text/> Cadastre-se...    
            </Text>      
        </Text>
        <View style={{height: 100}}/>

      <TouchableOpacity
        style={style.Button}
        onPress={() => navigation.navigate("Tarefa")}
        //onPress={() => checkLogin()}
      >
        <Text style={style.Texto}>Logar</Text>
      </TouchableOpacity>
    
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50
  },

  title:{
    fontSize: 48,
    color: "#f92e6a",
    marginBottom: 10,
    fontWeight: "bold"
  },

  input: {
    width: 300,
    marginTop: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#f92e6a",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#000",
  },

  buttonLogin: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f92e6a",
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
    backgroundColor: "#1c6cce",
    borderRadius: 15,
    margin: 10
    //marginLeft: 10
  },
});