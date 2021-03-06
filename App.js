import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Tarefa from './screens/Tarefa';
import Sobre from './screens/Sobre';
import Cadastro from './screens/Cadastro';
import Editar from './screens/Editar';
import Faq from './screens/Faq';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login" 
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Tarefa"
          component={Tarefa}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Editar"
          component={Editar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{headerShown: true, title: ""}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
