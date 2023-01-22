import { FlatList } from 'react-native';
import { GetPosts_posts as Post } from '../graphql/__generated__/GetPosts';

import { PostItem } from './PostItem';

type Props = {
  posts: Array<Post>;
};

export function PostList(props: Props) {
  const { posts } = props;
  return (
    <FlatList
      style={{ backgroundColor: 'white' }}
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item: post }) => <PostItem key={post.id} post={post} />}
    />
  );
}
