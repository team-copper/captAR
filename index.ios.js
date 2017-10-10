import { AppRegistry } from 'react-native';
import captAR from './component'
import { registerUserSubscriptions, registerGameSubscriptions } from './subscriptions'

// Firebase setup
registerUserSubscriptions()
// registerGameSubscriptions('GameArea2/-Kw1qsIZq4juv2u00OXs')

AppRegistry.registerComponent('captAR', () => captAR);
