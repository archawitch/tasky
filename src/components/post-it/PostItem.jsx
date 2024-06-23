import { useState } from "react";
import { useDispatchPosts } from "../../context/PostContext";
import ResizablePost from "./ResizablePost";
import DraggablePost from "./DraggablePost";
import TopContent from "./TopContent";
import BottomContent from "./BottomContent";
import PostContent from "./PostContent";

function PostItem({ post }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(post.text === "");
  const dispatch = useDispatchPosts();

  function setDrag(val) {
    setIsDragging(val);
  }

  function setEdit(val) {
    setIsEditing(val);
  }

  return (
    <>
      <ResizablePost post={post} dispatch={dispatch} setDrag={setDrag}>
        <DraggablePost
          post={post}
          dispatch={dispatch}
          isDragging={isDragging}
          isEditing={isEditing}
          setDrag={setDrag}
          setEdit={setEdit}
        >
          <TopContent post={post} dispatch={dispatch}></TopContent>
          <PostContent
            post={post}
            dispatch={dispatch}
            isEditing={isEditing}
            setEdit={setEdit}
          ></PostContent>
          <BottomContent post={post} dispatch={dispatch}></BottomContent>
        </DraggablePost>
      </ResizablePost>
    </>
  );
}

export default PostItem;
