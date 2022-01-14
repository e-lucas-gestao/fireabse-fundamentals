import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import firestore from '@react-native-firebase/firestore';

import App from './App';

// if (__DEV__) {
//   firestore().useEmulator('192.168.1.62', 8080)
//   //machine ip
// }

// const db = firestore();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
