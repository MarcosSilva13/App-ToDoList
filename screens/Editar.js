import React, { useState } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput, 
    TouchableOpacity
} from "react-native";

import firebase from "../config/firebaseconfig.js";

export default function Editar({navigation, route}){
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const idTask = route.params.id
    const database = firebase.firestore()
   
    function editTask(description, id){
      database.collection(route.params.idUser).doc(id).update({
        description: description
      })
      navigation.navigate("Tarefa", { idUser: route.params.idUser })
    }
    return(
        <View style={styles.container}>
          <Text style={styles.label}>Editar Tarefa</Text>
          <View style={styles.header}>

          </View>
          <TextInput
          style={styles.input}
         // placeholder="Ex: estudar javascript"
          maxLength={35}
          onChangeText={setDescriptionEdit}
          value={descriptionEdit}
          />
          <TouchableOpacity 
            style={styles.buttonNewTask}
            onPress={()=>{
              editTask(descriptionEdit, idTask)
            }}
          >
            <Text style={styles.iconButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )
}


const styles = StyleSheet.create({
    container: { 
      flex:1,
      backgroundColor:'#fff',
      paddingHorizontal: 5,
      paddingVertical: 20,
    },
    header: {
        padding: 2,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#000",  
    },
    label:{
      width: "90%",
      marginTop: 50,
      fontSize: 40,
      fontWeight: "bold",
      marginLeft: 0,
      color: "#D95800",
    },
    input:{
     width: "100%",
     marginTop: 10,
     padding: 5,
     height: 50,
     borderBottomWidth: 1,
     borderBottomColor: "#D95800",
     marginLeft: 0,
     fontSize: 16
    },
    buttonNewTask:{
     width: 100,
     height: 50,
     //position: ,
     bottom: -60,
     left: 128,
     backgroundColor: "#D95800",
     borderRadius: 50,
     justifyContent: "center",
     alignItems: "center"
    },
    iconButton:{
     color: "#ffffff",
     fontSize: 20,
     fontWeight: "bold",
    }
   });