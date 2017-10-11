import { AppRegistry } from 'react-native';
import captAR from './component'
import { registerUserSubscriptions, registerGameSubscriptions } from './subscriptions'

// Firebase setup
registerUserSubscriptions()
// registerGameSubscriptions(`GameArea2/${currentGame}`);
registerGameSubscriptions(`GameArea2/-KwAxZ6fgaAS1YNXXjW9`);

AppRegistry.registerComponent('captAR', () => captAR);
