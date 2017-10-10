import { AppRegistry } from 'react-native';
import captAR from './component'
import { registerUserSubscriptions, registerGameSubscriptions } from './subscriptions'

// Firebase setup
registerUserSubscriptions()
registerGameSubscriptions(`GameArea2/-Kw707DYaLU5_pZ2BPpr`);

AppRegistry.registerComponent('captAR', () => captAR);
