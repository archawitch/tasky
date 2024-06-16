import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePosts, useDispatchPosts } from "../../context/PostContext";
import { useState, useEffect, useRef } from "react";

function AddPostButton() {
  const [nextPostId, setNextPostId] = useState(0);
  const refAddPost = useRef(null);
  const posts = usePosts();
  const dispatch = useDispatchPosts();

  useEffect(() => {
    if (posts.length > 0) {
      const lastId = posts[posts.length - 1].id;
      setNextPostId(lastId + 1);
    }
  }, [posts.length]);

  return (
    <button
      ref={refAddPost}
      onClick={() => {
        // set the position of a new post to near the add button
        const position = refAddPost.current.getBoundingClientRect();
        // add the post
        dispatch({
          type: "ADD_POST",
          id: nextPostId,
          posX: position.right,
          posY: position.top,
        });
      }}
    >
      <FontAwesomeIcon className="text-2xl" icon="fa-solid fa-square-plus" />
    </button>
  );
}

export default AddPostButton;
