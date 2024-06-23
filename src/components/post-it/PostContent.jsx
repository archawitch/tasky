import { useEffect, useState, useRef } from "react";

function PostContent({ post, dispatch, isEditing, setEdit }) {
  const fontSize = `${post.fontSize}rem`;
  const refTextarea = useRef(null);
  const [isFirstEditing, setIsFirstEditing] = useState(true);
  const [inputText, setInputText] = useState(post.text);

  useEffect(() => {
    // adjusts height of the textarea automatically
    if (refTextarea.current) {
      refTextarea.current.style.height = "auto";
      refTextarea.current.style.height = `${refTextarea.current.scrollHeight}px`;
      // set the cursor to the end
      if (isFirstEditing) {
        refTextarea.current.focus();
        const length = refTextarea.current.value.length;
        refTextarea.current.setSelectionRange(length, length);
        setIsFirstEditing(false);
      }
    }
  }, [isEditing, inputText]);

  let postContent;
  if (isEditing) {
    postContent = (
      <>
        <div className="m-1 flex w-auto flex-grow flex-col flex-wrap items-center justify-center">
          <textarea
            ref={refTextarea}
            onBlur={(event) => {
              event.stopPropagation();
              setEdit(false);
              setIsFirstEditing(true);
              const newText = event.target.value;
              dispatch({
                type: "EDIT_POST",
                post: {
                  ...post,
                  text: newText,
                },
              });
            }}
            onChange={(event) => {
              setInputText(event.target.value);
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onMouseMove={(event) => {
              event.stopPropagation();
            }}
            onTouchStart={(event) => {
              event.stopPropagation();
            }}
            onTouchMove={(event) => {
              event.stopPropagation();
            }}
            value={inputText}
            onKeyDown={(event) => event.stopPropagation()}
            className="mb-2 w-full resize-none overflow-hidden text-wrap break-words bg-transparent outline-none"
            style={{
              fontSize: fontSize,
            }}
            rows="1"
          />
        </div>
      </>
    );
  } else {
    postContent = (
      <>
        <div className="m-1 flex w-auto flex-grow flex-col flex-wrap items-center justify-center">
          <span
            className="mb-2 w-full cursor-default whitespace-pre-wrap text-wrap break-words"
            onClick={() => setEdit(true)}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onMouseMove={(event) => {
              event.stopPropagation();
            }}
            onTouchStart={(event) => {
              event.stopPropagation();
            }}
            onTouchMove={(event) => {
              event.stopPropagation();
            }}
            style={{
              fontSize: fontSize,
              textAlign: post.align,
            }}
          >
            {post.text}
          </span>
        </div>
      </>
    );
  }

  return <>{postContent}</>;
}

export default PostContent;
