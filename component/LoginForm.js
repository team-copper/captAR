import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from '../firebase';
import TitledInput from './TitledInput';
import Style from './Style';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };
    onLoginPress() {
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;
        console.log('email: pwd', email + password)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
            })
            .catch(() => {
                //Login was not successful, let's create a new account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => { this.setState({ error: '', loading: false }); })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', loading: false });
                    });
            });
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
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    {this.renderButtonOrSpinner()}
            </View>
        );
    }
}
const styles = {
    errorTextStyle: {
        color: '#E64A19',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export default LoginForm;
