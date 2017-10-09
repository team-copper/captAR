import { AppRegistry } from 'react-native';
import captAR from './component'
import { registerUserSubscriptions, registerGameSubscriptions } from './subscriptions'

// Firebase setup
registerUserSubscriptions()
registerGameSubscriptions('GameArea2/-Kw1Z8cX8ygT1EvdUyww')

AppRegistry.registerComponent('captAR', () => captAR);
