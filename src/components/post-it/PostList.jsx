import PostItem from "./PostItem";
import { usePosts } from "../../context/PostContext";

function PostList() {
  const posts = usePosts();

  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostItem key={post.id} post={post}></PostItem>)}
    </>
  );
}

export default PostList;
