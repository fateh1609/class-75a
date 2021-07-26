import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
//import * as Permissions from 'expo-permissions';
//import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase'
import react from 'react';
import { async } from 'q';
//import db from '../config.js'
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: ''
        }
    }
    Login = async (email, password) => {
        if (email && password) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(email, password)
                if (response) {
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        Alert.alert("user doesn't exist")
                        console.log("doesen't exist")
                        break
                    case 'auth/invaled-email':
                        Alert.alert("incorrecr email or password")
                        console.log("invalid")
                        break

                }
            }
        }
        else {
            Alert.alert("enter email and password");
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={{ alignItems: 'center', marginTop: 20 }}>
                <View>
                    <Image
                        source={require("../assests/booklogo.jpg")}
                        style={{ width: 200, height: 200 }} />
                    <Text style={{ textAlign: 'center', fontSize: 20 }} WILY APP />
                </View>
                <View>
                    <TextInput
                        style={styles.loginBox}
                        placeholder="abc@example.com"
                        keyboardType="email-address"
                        onChangeText={(Text) => {
                            this.setState({
                                emailId: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.loginBox}
                        placeholder="enter a password"
                        secureTextEntry={true}
                        onChangeText={(Text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity style={{ height: 30, width: 90 }}
                        onPress={() => { this.Login(this.state.emailId, this.state.password) }}>
                        <Text style={{ textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 2,
        fontSize: 25,
        margin: 15,
        paddingLeft: 25
    }
})