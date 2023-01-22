import { Avatar, Text, XStack, YStack } from 'tamagui';
import { GetPosts_posts as Post } from '../graphql/__generated__/GetPosts';

type Props = {
  post: Post;
};

export function PostItem(props: Props) {
  const { post } = props;
  const { author } = post;
  return (
    <XStack
      space="$3"
      padding="$3"
      borderBottomColor="$gray5Light"
      borderBottomWidth="1"
      backgroundColor="white"
    >
      <Avatar circular size="$6">
        <Avatar.Image src={author.profilePhoto} />
        <Avatar.Fallback bc="red" />
      </Avatar>
      <YStack flex={1}>
        <XStack space="$2">
          <Text>{author.name}</Text>
          <Text>@{author.username}</Text>
        </XStack>
        <Text>{post.content}</Text>
      </YStack>
    </XStack>
  );
}
