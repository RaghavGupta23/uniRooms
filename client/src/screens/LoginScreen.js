import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

import { loginUser } from '../actions';

class LoginScreen extends Component {
    state = {
        email: '',
        password: ''
    };

    onLogin() {
        this.props.loginUser(this.state);
    }

	render() {
		return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                         <Image
                            style={{ width: 100, height: 100 }}
                            source={require('../resources/logo.svg_.png')}
                        />
                        <Text style={styles.logoText}>UniRooms</Text>
                </View>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="#ffffff"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    ref={(input) => { this.password = input; }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onLogin.bind(this)}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Dont have an account?</Text>
                    <TouchableOpacity onPress={this.onLogin}>
                        <Text style={styles.signupButton}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    logoContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

const Login = connect(null, { loginUser })(LoginScreen);
export { Login };