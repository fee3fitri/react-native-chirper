import { useState } from 'react';
import { Button, Input, ScrollView, Spinner, Text, XStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../graphql/Login';
import { useAuth } from '../support/useAuth';
import { Login, LoginVariables } from '../graphql/__generated__/Login';
import { Alert } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigation>();
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation<Login, LoginVariables>(
    LOGIN,
    {
      onCompleted: (data) => {
        const result = data.login;
        if (result) {
          const { token, user } = result;
          setUser({ id: user.id, authToken: token });
          navigation.replace('Home');
        } else {
          Alert.alert('Login Failed', 'Invalid username or password.');
        }
      },
    },
  );
  return (
    <ScrollView space="$3" padding="$3" backgroundColor="white">
      {error ? <Text color="$red8Light">{String(error)}</Text> : null}
      <Input
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder="Enter your username"
        autoCapitalize="none"
      />
      <Input
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <XStack justifyContent="flex-end">
        {loading ? (
          <Spinner />
        ) : (
          <Button
            onPress={() => {
              login({ variables: { username, password } });
            }}
          >
            Login
          </Button>
        )}
      </XStack>
    </ScrollView>
  );
}
