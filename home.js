import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, AppState} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useEffect, useRef } from 'react';
import KeyboardShift from './kbs'
import InputBox from './inputBox'
import Msg from './msg'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App({navigation, route}) {
  const [number, onChangeNumber] = React.useState(null);
  const [msgs, setMsgs] = useState([{msg: 'hello (2)', time: '12:01', user: 'amukh1'},{msg: 'hello', time: '12:00', user: 'amukh1'}])
let user = route.params.user
let password = route.params.password
let room = route.params.room
let ws = route.params.ws

const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {

    const subscription = AppState.addEventListener("change",async nextAppState => {
      console.log('change')
      console.log(AppState.currentState)
      if(AppState.currentState != 'active'){
        // console.log('no')
        await fetch(`https://api.arch.amukh1.dev/switch?token=${encodeURIComponent(expoPushToken)}&room=${room}&state=false`)
      }else {
        console.log('yes')
        // console.log(ws)
        await fetch(`https://api.arch.amukh1.dev/switch?token=${encodeURIComponent(expoPushToken)}&room=${room}&state=true`)
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      subscription.remove();
    };
    
  }, []);
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

    ws.onmessage = async function(e) {
        let data = JSON.parse(e.data)
        console.log("Received: ");
        console.log(data);


        if(data.type == 'msg'){
            if(data.user == user){
                console.log('same user msg rte?')
            }else if(data.room == room){
                console.log('same room msg rte?')
                console.log(AppState.currentState)
                // await sendPushNotification(expoPushToken, `ARCH - ${room}`, data.msg.msg);
                // if(AppState.currentState !== 'active'){
                //   await sendPushNotification(expoPushToken, `ARCH - ${room}`, data.msg.msg);
                //     console.log('app is active')
                // }
                
            setMsgs(data.msgs)
        }else {
            console.log('not same room')
            console.log(data.room+'e')
            console.log(room+'e')
            }
        }
        else if(data.type == 'ready'){
                setMsgs(data.msgs)
            
        }
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

    <InputBox styles={styles} number={number} onChangeNumber={onChangeNumber} setMsgs={setMsgs} msgs={msgs} ws={ws} room={room} route={route} token={route.params.token}/>
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

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken, titlee, bodyy) {
  console.log(bodyy)
  const message = {
    // ExponentPushToken[Xpss79GhqNCCKb7CTWpqQp]
    to: expoPushToken,
    sound: 'default',
    title: titlee,
    body: bodyy,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      console.log('granted')
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


const storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return 'success'
  } catch (e) {
    // saving error
    return null
  }
}

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      // value previously stored
      return value
    }
  } catch(e) {
    // error reading value
    return null
  }
}
