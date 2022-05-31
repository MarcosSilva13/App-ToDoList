import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    SafeAreaView, 
    SectionList,
    StatusBar
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const DATA = [
    {
      title: "Logout",
      data: ["Pare efetuar o logout, na tela de tarefas clique no icone de sair: ", <MaterialIcons name="logout" size={25} color="#000"/>]
    },
    {
      title: "Editar tarefa",
      data: ["Para editar uma tarefa, basta clicar no texto da tarefa que logo em seguida será aberta uma tela para edita-la."]
    },
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
  const Faq = () => (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 14,
     
    },
    item: {
      backgroundColor: "#D96800",
      padding: 20,
      marginVertical: 8,
      color: "#fff"
    },
    header: {
      padding: 2,  
      fontSize: 32,
      fontWeight: "bold",
      backgroundColor: "#444",
      color: "#fff",
    },
    title: {
      fontSize: 24,
    }
  });
  
  export default Faq;