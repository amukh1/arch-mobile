import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, Button, AsyncStorage  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import KeyboardShift from './kbs'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
// import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App({navigation}) {
  const [number, onChangeNumber] = React.useState(null);
  const [numberdos, onChangeNumberdos] = React.useState(null);
  const [roomid, sroomid] = React.useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // let loggedIn = AsyncStorage.getItem('logged in')
  // console.log(loggedIn)
  useEffect(() => {
  //   if(loggedIn == 'true'){
  // //     var ws = new WebSocket('wss://api.arch.amukh1.dev')
  // // navigation.navigate('Home', {user: number, password: numberdos, room: '', ws:ws, token: getData('token')})
  // onChangeNumber(getData('user'))
  // onChangeNumberdos(getData('password'))
  //   }


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
    };
  }, []);

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

      <Button
        title="Press to Send Notification"
        onPress={async () => {
          console.log('click')
          console.log(expoPushToken)
          await sendPushNotification(expoPushToken);
        }}
      />

<View style={{height:10}}/>

<Pressable style={styles.button} onPress={async ()=> {
//   Alert.alert(`username: ${number} password: ${numberdos}`)
let xt = await fetch(`https://api.arch.amukh1.dev/login?username=${number}&password=${numberdos}&room=${roomid}`)
let x = await xt.json()
if(x.authenticated == true){
  // console.log(x.token)
var ws = new WebSocket('wss://api.arch.amukh1.dev')
// storeData('LoggedIn', 'true')
// storeData('user', number)
// storeData('password', numberdos)
let xt2 = await fetch(`https://api.arch.amukh1.dev/notif?token=${encodeURIComponent(expoPushToken)}&room=${roomid}`)
  navigation.navigate('Home', {user: number, password: numberdos, room: roomid, ws:ws, token: x.token})
}else {
  alert(x.reason)
}
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



// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
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

const storeData = async (value) => {
  try {
    await AsynStorage.setItem("user", JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

// getting data
const getData = async () => {
  try {
    const userData = JSON.parse(await AsynStorage.getItem("user"))
  } catch (error) {
   console.log(error); 
  }
};


// const value = await AsyncStorage.setItem(key, value)

// const value = await AsyncStorage.getItem(key)