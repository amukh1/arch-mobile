import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react';
import KeyboardShift from './kbs'

export default function Input({styles, number, onChangeNumber, setMsgs, msgs, ws, room, route, token}) {
    return (
    <View style={styles.container}>

      {/* <Text style={styles.loginTitle}>User: {route.params.user}</Text>
      <Text style={styles.loginTitle}>Password: {route.params.password}</Text> */}
        {/* <Text>Home</Text> */}
  
        <View style={styles.inpBox}>
            {/* input for msg  */}


            <TextInput
        style={styles.input2}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Message"
        keyboardType="name"
        placeholderTextColor="white" 
      />
      

<Pressable style={styles.button2} onPress={async ()=> {
//   Alert.alert(`Message: ${number}`)
setMsgs([...msgs , {msg: number, time: new Date().toLocaleTimeString(), user: route.params.user}])
// let xt = await fetch(`https://api.arch.amukh1.dev/login?username=${route.params.user}&password=${route.params.password}`)
// let x = await xt.json()
// if(x.authenticated == true){
ws.send(JSON.stringify({
    type: 'msg',
    room: route.params.room,
    user: route.params.user,
    token: token,
    msg: {user:route.params.user, time: new Date().toLocaleTimeString(), msg:number }
})
);

// }else {
//     Alert.alert('Error', 'Not authenticated')
// }

onChangeNumber(null)
//   navigation.navigate('Home', {user: number, password: number})
}}>
      <Text>{'>'}</Text>
    </Pressable>

        </View>
       
    </View>
    )
}

 