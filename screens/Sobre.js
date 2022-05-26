import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Sobre({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Aplicativo desenvolvido por: Marcos</Text>
            <TouchableOpacity
                style={styles.buttonBack}
                onPress={() => navigation.navigate("Login")}
            >
                <MaterialCommunityIcons
                    name="backburger"
                    size={25}
                    color="#fff"
                />
                <Text style={styles.textButton}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    textTitle: {
        fontSize: 32,
        color: "#000",
        justifyContent: "center",
        marginLeft: 20,
        marginRight: 20,
        //borderWidth: 2,
        //borderColor: "#000",
        //backgroundColor: "#D96800"
    },
    textButton: {
        fontSize: 21,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 8,
        marginBottom: 1

    },
    buttonBack: {
        width: 130,
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D96800",
        borderRadius: 50,
        marginTop: 30,
    },
});