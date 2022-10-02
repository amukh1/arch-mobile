import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useEffect } from 'react';
import KeyboardShift from './kbs'
import InputBox from './inputBox'
import Msg from './msg'

export default function App({navigation, route}) {
  const [number, onChangeNumber] = React.useState(null);
  const [msgs, setMsgs] = useState([{msg: 'hello (2)', time: '12:01', user: 'amukh1'},{msg: 'hello', time: '12:00', user: 'amukh1'}])
let user = route.params.user
let password = route.params.password
let room = route.params.room
let ws = route.params.ws
// let room = route.params.room

// if(!ws){
//     var ws = new WebSocket('wss://api.arch.amukh1.dev')
// }


    // if(!ws){
    //     var ws = new WebSocket('wss://api.arch.amukh1.dev')
    // }
   

    ws.onopen = function() {
        console.log('WebSocket Client Connected');
        ws.send(JSON.stringify({
            type: 'join',
            room: room,
            user: user,
        }));
    };

    ws.onmessage = function(e) {
        let data = JSON.parse(e.data)
        console.log("Received: ");
        console.log(data);
        

        if(data.type == 'msg'){
            if(data.user == user){
                console.log('same user msg rte?')
            }else if(data.room == room){
                console.log('same room msg rte?')
            setMsgs(data.msgs)
        }else {
            console.log('not same room')
            console.log(data.room+'e')
            console.log(room+'e')
            }
        }
        // else if(data.type == 'ready'){
        //     if(data.user == user){
        //         console.log('same user join rte?')
        //         setMsgs(data.msgs)
        //     }
        // }
      };
  return (
    <KeyboardShift>
       <StatusBar style="light" />

    <ScrollView style={styles.mainM}>
    {/* <Msg message="Hello (2)" time="12:01" user="user"/>
    <Msg message="Hello" time="12:00" user="user"/> */}
    {msgs.map((msg, index) => {
        return (
            <Msg message={msg.msg} time={msg.time} user={msg.user}/>
        )
    })
}

    </ScrollView>

    <InputBox styles={styles} number={number} onChangeNumber={onChangeNumber} setMsgs={setMsgs} msgs={msgs} ws={ws} room={room} route={route}/>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(18,18,18)',
  },
  mainM: {
height: '85%',
// marginBottom: 10,
paddingBottom: 20,
backgroundColor: 'rgb(18,18,18)',
display: 'flex',
flexDirection: 'column-reverse',
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
  input2: {
    height: 40,
    // margin: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: 10,
    width: '75%',
    color: 'white'
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
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "white",
    // marginHorizontal: 100,
    color: "black",
    width: '20%'
  },
  tex: {
    color: "white"
  },
  texd: {
    color: "black"
  },
  inpBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '90%',
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    backgroundColor: "rgb(0,0,0)",
    position: "absolute",
    bottom: 0,
    borderColor: 'white',
    borderWidth: 1,
  },
  containerd: {
    flexGrow: 1,
  },
  message: {
    color: 'rgb(37,37,37)',
  }
});
