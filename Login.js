import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Login({ navigation }){

    return (
        <View style={style.container}>
            <TouchableOpacity 
                style={style.Button}
                onPress={() => (navigation.navigate('Tarefa'))}    
            >
                <Text style={style.Texto}>Logar</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Texto: {
        fontSize: 20,
        color: "#fff",
    },
    Button: {
        height: 30,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c6cce",
        borderRadius: 15,
        //marginLeft: 10
    }
});
