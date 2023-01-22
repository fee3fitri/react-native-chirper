/* eslint-disable react/style-prop-object */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types/navigation';
// Screens
import { ComposerScreen } from './screens/ComposerScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Composer"
        component={ComposerScreen}
        options={{ title: 'Compose New' }}
      />
    </Stack.Navigator>
  );
}
