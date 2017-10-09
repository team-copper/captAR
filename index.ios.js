import { AppRegistry } from 'react-native';
import captAR from './component'
import registerSubscriptions from './subscriptions'

// Firebase setup
registerSubscriptions()

AppRegistry.registerComponent('captAR', () => captAR);
