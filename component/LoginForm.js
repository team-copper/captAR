'use strict';

import firebase from '../firebase';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'
import { Style, TitledInput } from './index';
import { isLoggedIn, addUser } from '../store'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '', error: '', loading: false };
    }

    onLoginPress() {
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;
        console.log('logging in with ', email)
        let userToLogin = this.props.users.filter(user => user.email === email)
        console.log('users', this.props.users)
        console.log('user to login', userToLogin)

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ email: '', password: '', error: '', loading: false });
                if (userToLogin.length === 1) {
                    this.props.isLoggedIn(userToLogin[0]);
                } else if (userToLogin.length === 0){
                    this.props.addUser(email);
                }

                this.props.navigation.navigate('SelectGameView')
            })
            .catch((error) => {
                this.setState({ error: 'Authentication failed. ', loading: false });
                console.log("login error: ", error)
            })

    }

    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Text>Loading</Text>;
        }
        return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
    }
    render() {
        return (
            <View style={Style.body}>
                <TitledInput
                    label='Email Address'
                    placeholder='you@domain.com                          '
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TitledInput
                    label='Password'
                    autoCorrect={false}
                    placeholder='**********                 '
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <Text style={Style.loginErrorText}>{this.state.error}</Text>
                {this.renderButtonOrSpinner()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.authenticated.users
    }
}

const mapDispatchToProps = { isLoggedIn, addUser }

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default LoginFormContainer
