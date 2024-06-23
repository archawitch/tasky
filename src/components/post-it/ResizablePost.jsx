import { Resizable } from "react-resizable";

function ResizablePost({ post, dispatch, setDrag, children }) {
  return (
    <Resizable
      height={post.height}
      width={post.width}
      handle={
        <span
          onMouseMove={(event) => {
            setDrag(false);
            event.stopPropagation();
          }}
          onTouchMove={(event) => {
            setDrag(false);
            event.stopPropagation();
          }}
          className="absolute bottom-0 right-0 h-2 w-2 cursor-se-resize"
        ></span>
      }
      onResize={(event, { node, size, handle }) => {
        if (
          size.width >= 240 &&
          size.width <= 720 &&
          size.height >= 192 &&
          size.height <= 560
        ) {
          dispatch({
            type: "RESIZE_POST",
            id: post.id,
            newWidth: size.width,
            newHeight: size.height,
          });
        }
      }}
    >
      {children}
    </Resizable>
  );
}

export default ResizablePost;
