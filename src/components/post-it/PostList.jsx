import PostItem from "./PostItem";
import { usePosts } from "../../context/PostContext";
import { useGroup } from "../../context/GroupOfPostContext";

function PostList() {
  const posts = usePosts();
  const groups = useGroup();

  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts
          .filter((post) => {
            return post.groupId === groups.currentGroup;
          })
          .map((post) => <PostItem key={post.id} post={post}></PostItem>)}
    </>
  );
}

export default PostList;
