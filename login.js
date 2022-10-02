import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import KeyboardShift from './kbs'

export default function App({navigation}) {
  const [number, onChangeNumber] = React.useState(null);
  const [numberdos, onChangeNumberdos] = React.useState(null);
  const [roomid, sroomid] = React.useState(null);
  return (
    <KeyboardShift>
       <StatusBar style="dark" />
    <View style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.loginSubtitle}>Please enter your credentials to continue</Text>
      <View style={{height:10}}/>
      {/* input (2) */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Username"
        keyboardType="name"
      />

<TextInput
        style={styles.input}
        onChangeText={onChangeNumberdos}
        value={numberdos}
        placeholder="Password"
        keyboardType="name"
      />

<View style={{height:10}}/>

<TextInput
        style={styles.input}
        onChangeText={sroomid}
        value={roomid}
        placeholder="Room"
        keyboardType="name"
      />

<View style={{height:10}}/>

<Pressable style={styles.button} onPress={()=> {
//   Alert.alert(`username: ${number} password: ${numberdos}`)
var ws = new WebSocket('wss://api.arch.amukh1.dev')
  navigation.navigate('Home', {user: number, password: numberdos, room: roomid, ws:ws})
}}>
      <Text style={{...styles.tex, fontWeight: 'bold'}}>Join</Text>
    </Pressable>

      <StatusBar style="auto" />
    </View>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
