import { AppRegistry } from 'react-native';
import captAR from './component'
import { registerUserSubscriptions, registerGameSubscriptions } from './subscriptions'

// Firebase setup
registerUserSubscriptions()

AppRegistry.registerComponent('captAR', () => captAR);
