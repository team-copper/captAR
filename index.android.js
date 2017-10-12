import { AppRegistry } from 'react-native';
import captAR from './component'
import { registerUserSubscriptions } from './subscriptions'

// Firebase setup
registerUserSubscriptions()

console.disableYellowBox = true;

AppRegistry.registerComponent('captAR', () => captAR);
