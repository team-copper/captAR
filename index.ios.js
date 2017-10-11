import { AppRegistry } from 'react-native';
import captAR from './component'
import { registerUserSubscriptions, registerGameSubscriptions } from './subscriptions'

// Firebase setup
registerUserSubscriptions()
// registerGameSubscriptions(`GameArea2/${currentGame}`);
registerGameSubscriptions(`GameArea2/-Kw8-Wp9_NtKh-AhcMru`);

AppRegistry.registerComponent('captAR', () => captAR);
