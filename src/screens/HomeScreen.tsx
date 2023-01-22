import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { Spinner, Text, YStack } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PostList } from '../components/PostList';
import { GET_POSTS } from '../graphql/GetPosts';
import { GetPosts } from '../graphql/__generated__/GetPosts';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../support/useAuth';

type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<HomeNavigation>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            user
              ? navigation.navigate('Composer')
              : navigation.navigate('Login');
          }}
        >
          <Plus />
        </Pressable>
      ),
    });
  }, [navigation, user]);

  const { data, error } = useQuery<GetPosts>(GET_POSTS);
  if (error) {
    return <Text>{String(error)}</Text>;
  }
  if (!data) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner />
      </YStack>
    );
  }
  return <PostList posts={data.posts} />;
}
