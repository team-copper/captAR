import { AppRegistry } from 'react-native';
import captAR from './component'
import { registerUserSubscriptions, registerGameSubscriptions } from './subscriptions'

// Firebase setup
registerUserSubscriptions()
registerGameSubscriptions(`GameArea3/-Kw5kOK5-vXMLrT7R6rp`);

AppRegistry.registerComponent('captAR', () => captAR);
