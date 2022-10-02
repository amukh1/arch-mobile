import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react';

export default function msg({message, time, user}) {
    return (
    <View style={styl.chatMessage}>

        <View style={styl.chatMessageTexth}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{user} - </Text>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{time}</Text>
        </View>

        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{message}</Text>
        </View>
    )
}


let styl = StyleSheet.create({
    chatMessage: {
        backgroundColor: 'hsla(0, 0%, 16%, 0.8);',
        borderRadius: 25,
        padding: 25,
        margin: 15,
        display: 'flex',
        cursor: 'pointer',
        
    },
    chatMessageTexth: {
        display: 'flex',
        flexDirection: 'row',
    }
})


/*
.chat-message {
    background-color: hsla(0, 0%, 16%, 0.8);
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    cursor: pointer;
}

.msgh {
    font-size: 1.1rem;
    font-family: 'Oswald', sans-serif;
    margin-left: 5px;
    margin-right: 5px;
    text-align: center;
}

.chat-message-content {
    margin-left: 5px;
    font-size: 1.5rem;
}
*/