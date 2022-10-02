import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


import Login from './login'
import Home from './home'

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    {/* <Login /> */}
    <Stack.Screen
          name="Login"
          component={Login}
          options={{
            // headerStyle: {
            //   backgroundColor: 'rgb(18,18,18)',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            //   color: 'white',
            // },
          }}
        />
        
        <Stack.Screen
          name="Home"
          options={({route})=>{
            return {
            headerStyle: {
              backgroundColor: 'rgb(18,18,18)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            title: `ARCH - ${route.params.room}`,
          }
          }}
          component={Home}
        />
    </Stack.Navigator>
    </NavigationContainer>

//     <View style={styles.container}>
//       <Text style={styles.loginTitle}>Login</Text>
//       <Text style={styles.loginSubtitle}>Please enter your credentials to continue</Text>
//       {/* input (2) */}
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeNumber}
//         value={number}
//         placeholder="Username"
//         keyboardType="name"
//       />

// <TextInput
//         style={styles.input}
//         onChangeText={onChangeNumberdos}
//         value={numberdos}
//         placeholder="Password"
//         keyboardType="name"
//       />


// <Pressable style={styles.button} onPress={()=> {
//   Alert.alert(`username: ${number} password: ${numberdos}`)
// }}>
//       <Text style={styles.tex}>title</Text>
//     </Pressable>

//       <StatusBar style="auto" />
//     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(18,18,18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inp: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginHorizontal: 100,
    color: "white"
  },
  tex: {
    color: "white"
  }
});
