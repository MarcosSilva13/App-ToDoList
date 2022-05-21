import React, { useState } from "react";
import {StyleSheet, View, Text, TextInput, TouchableOpacity}  from "react-native";

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
          <Text style={styles.label}>Description</Text>
          <TextInput
          style={styles.input}
          placeholder="Ex: estudar javascript"
          onChangeText={setDescriptionEdit}
          value={descriptionEdit}
          />
          <TouchableOpacity 
            style={styles.buttonNewTask}
            onPress={()=>{
              editTask(descriptionEdit, idTask)
            }}
          >
            <Text style={styles.iconButton}>Save</Text>
          </TouchableOpacity>
        </View>
      )
}


const styles = StyleSheet.create({
    container: { 
      flex:1,
      backgroundColor:'#fff'
    },
    label:{
      width:"90%",
      marginTop: 20,
      fontSize:16,
      marginLeft: 20,
      color:"#F92E6A"
    },
    input:{
     width:"90%",
     marginTop:10,
     padding:10,
     height:50,
     borderBottomWidth: 1,
     borderBottomColor:"#F92E6A",
     marginLeft:"auto",
     marginRight:"auto"
    },
    buttonNewTask:{
     width:60,
     height:60,
     position:"absolute",
     bottom: 30,
     left:20,
     backgroundColor:"#F92e6a",
     borderRadius:50,
     justifyContent:"center",
     alignItems: "center"
    },
    iconButton:{
     color:"#ffffff",
     fontSize:16,
     fontWeight:"bold",
    }
    
   });