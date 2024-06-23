import { useState } from "react";
import { getPostColor } from "../../context/PostContext";

function DraggablePost({
  post,
  dispatch,
  isDragging,
  isEditing,
  setDrag,
  setEdit,
  children,
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function dragStart(x, y) {
    setDrag(true);
    setOffset({
      x: x - post.posX,
      y: y - post.posY,
    });
  }

  function dragPost(x, y) {
    if (isDragging) {
      dispatch({
        type: "MOVE_POST",
        id: post.id,
        posX: x - offset.x,
        posY: y - offset.y,
      });
    }
  }

  function dragEnd() {
    setDrag(false);
  }

  return (
    <div
      onMouseDown={(event) => {
        dragStart(event.clientX, event.clientY);
      }}
      onMouseMove={(event) => {
        dragPost(event.clientX, event.clientY);
      }}
      onMouseUp={() => {
        dragEnd();
      }}
      onMouseLeave={() => {
        dragEnd();
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        dragStart(touch.clientX, touch.clientY);
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        dragPost(touch.clientX, touch.clientY);
      }}
      onTouchEnd={() => {
        dragEnd();
      }}
      onTouchCancel={() => {
        dragEnd();
      }}
      onClick={() => {
        if (!isEditing && post.text === "") {
          setEdit(true);
        }
      }}
      style={{
        backgroundColor: getPostColor(post.backgroundColor),
        color: post.foreColor,
        left: post.posX,
        top: post.posY,
        minHeight: `${post.height}px`,
        maxHeight: "560px",
        width: `${post.width}px`,
      }}
      className="grabbable absolute z-0 flex flex-col overflow-clip px-3 pb-3 pt-2 font-normal leading-snug opacity-90"
    >
      {children}
    </div>
  );
}

export default DraggablePost;
