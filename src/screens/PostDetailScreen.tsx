import { useQuery, gql } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { Spinner, Text } from "tamagui";

const GET_POST = gql`
query GetPost($postId: String) {
  post(id: @postId) {
    id
    author {
      id
      username
      name
    }
    content
  }
}
`;

export function PostDetailScreen() {
  const route = useRoute();
  const id = route.params.id;

  const {data, loading, error} = useQuery(GET_POST, {
    variables: { postId: id }
  })

  if (error) {
    return <Text>Error: {String(error)}</Text>
  }

  if (loading) {
    return <Spinner />
  }

  return <Text>{data.post.content}</Text>

}