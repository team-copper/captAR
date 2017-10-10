import firebase from '../firebase'
import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import { connect } from 'react-redux'
import { Style, TitledInput } from './index';
import { isLoggedIn, addUser } from '../store'

class OAuthLoginForm extends Component {

  state = {
    user: undefined, // user has not logged in yet
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });

    console.log('User: ', this.state.user)

    let userToLogin = this.props.users.filter(user => user.email === this.state.user.email)

    if (userToLogin.length === 1) {
      this.props.isLoggedIn(userToLogin[0]);
    } else if (userToLogin.length === 0) {
      this.props.addUser(this.state.user.email);
    }

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }

    this.props.navigation.navigate('GameView')
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('https://captar.herokuapp.com/auth/facebook/callback');

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('https://captar.herokuapp.com/auth/google/callback');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        {user
          ? // Show user info if already logged in
          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome {user.name}!
              </Text>
            <View style={styles.avatar}>
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            </View>
          </View>
          : // Show Please log in message if not
          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome Stranger!
              </Text>
            <View style={styles.avatar}>
              <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
            </View>
            <Text style={styles.text}>
              Please log in to continue {'\n'}
              to the awesomness
              </Text>
          </View>
        }
        {/* Login buttons */}
        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            Login with Facebook
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Login with Google
          </Icon.Button>
        </View>
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

const OAuthLoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(OAuthLoginForm)

export default OAuthLoginFormContainer

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});
