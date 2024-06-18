import { useState, useRef, useEffect } from "react";
import { useDispatchPosts, getPostColor } from "../../context/PostContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Resizable } from "react-resizable";

function PostItem({ post }) {
  const fontSize = `${post.fontSize}rem`;
  const refTextarea = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatchPosts();

  useEffect(() => {
    if (isEditing && !isDragging && inputText === post.text) {
      refTextarea.current.focus();
      const length = refTextarea.current.value.length;
      refTextarea.current.setSelectionRange(length, length);
    }
    // adjusts height of the textarea automatically
    if (refTextarea.current) {
      refTextarea.current.style.height = "auto";
      refTextarea.current.style.height = `${refTextarea.current.scrollHeight}px`;
    }
  }, [isEditing, isDragging, inputText]);

  function dragStart(e) {
    setIsDragging(true);
    setOffset({
      x: e.clientX - post.posX,
      y: e.clientY - post.posY,
    });
  }

  function dragPost(e) {
    if (isDragging) {
      dispatch({
        type: "MOVE_POST",
        id: post.id,
        posX: e.clientX - offset.x,
        posY: e.clientY - offset.y,
      });
    }
  }

  let postContent;
  if (isEditing) {
    postContent = (
      <>
        <div className="m-1 flex w-auto flex-grow flex-col flex-wrap items-center justify-center">
          <textarea
            ref={refTextarea}
            onBlur={(event) => {
              setIsEditing(false);
              event.stopPropagation();
              const newText = event.target.value;
              dispatch({
                type: "EDIT_POST",
                post: {
                  ...post,
                  text: newText,
                },
              });
            }}
            onFocus={(event) => {
              setInputText(post.text);
            }}
            onChange={(event) => setInputText(event.target.value)}
            value={inputText}
            onKeyDown={(event) => event.stopPropagation()}
            className="mb-2 w-full resize-none overflow-hidden text-wrap break-words bg-transparent outline-none"
            style={{
              fontSize: fontSize,
            }}
            rows="3"
            spellCheck="false"
          />
        </div>
      </>
    );
  } else {
    postContent = (
      <>
        <div className="m-1 flex w-auto flex-grow flex-col flex-wrap items-center justify-center">
          <span
            className="mb-2 w-full whitespace-pre-wrap text-wrap break-words"
            onClick={() => setIsEditing(true)}
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
  return (
    <>
      <Resizable
        height={post.height}
        width={post.width}
        handle={
          <span className="absolute bottom-0 right-0 h-2 w-2 cursor-se-resize"></span>
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
        <div
          draggable={isDragging}
          onDragStart={(event) => {
            dragStart(event);
          }}
          onDrag={(event) => {
            dragPost(event);
          }}
          onDragEnd={(event) => {
            dragPost(event);
            setIsDragging(false);
          }}
          onClick={() => {
            if (!isEditing && post.text === "") {
              setIsEditing(true);
            }
          }}
          style={{
            backgroundColor: getPostColor(post.backgroundColor),
            color: post.foreColor,
            left: post.posX,
            top: post.posY,
            minHeight: `${post.height}px`,
            maxHeight: "480px",
            width: `${post.width}px`,
          }}
          className="absolute z-0 flex flex-col overflow-clip px-3 pb-3 pt-2 font-normal leading-snug opacity-90"
        >
          <div className="mb-2 flex w-full items-center">
            <button
              onClick={() => {
                dispatch({
                  type: "CHANGE_COLOR",
                  id: post.id,
                });
              }}
              style={{
                width: "0.85rem",
                height: "0.85rem",
                borderRadius: "100%",
                border: "1px solid gray",
                backgroundColor: getPostColor(post.nextBackgroundColor),
              }}
              className="m-0 mr-1 p-0"
            ></button>
            <button
              className="mt-[0.2rem] pl-[0.3rem] pr-[0.2rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:text-gray-700"
              onClick={() => {
                dispatch({
                  type: "SET_FONT_SIZE",
                  id: post.id,
                  fontSize: post.fontSize * 1.25,
                });
              }}
            >
              A
            </button>
            <button
              className="mt-[0.2rem] px-[0.2rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:text-gray-700"
              onClick={() => {
                dispatch({
                  type: "SET_FONT_SIZE",
                  id: post.id,
                  fontSize: post.fontSize * 0.8,
                });
              }}
            >
              a
            </button>
            <div
              className="grabbable pointer-events-auto flex h-[1rem] flex-grow"
              onMouseDown={() => {
                setIsDragging(true);
              }}
              onMouseUp={() => setIsDragging(false)}
            ></div>
            <button
              className="ml-auto text-sm text-gray-500"
              onClick={() => {
                dispatch({
                  type: "DELETE_POST",
                  id: post.id,
                });
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
          {postContent}
          {!isEditing && (
            <div className="absolute bottom-[0.22rem] right-2 opacity-0 transition-all duration-200 hover:opacity-100">
              <button
                className="mt-[0.2rem] px-[0.33rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:text-gray-700"
                onClick={() => {
                  dispatch({
                    type: "SET_ALIGNMENT",
                    id: post.id,
                    align: "left",
                  });
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-align-left" />
              </button>
              <button
                className="mt-[0.2rem] px-[0.33rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:text-gray-700"
                onClick={() => {
                  dispatch({
                    type: "SET_ALIGNMENT",
                    id: post.id,
                    align: "center",
                  });
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-align-center" />
              </button>
              <button
                className="mt-[0.2rem] px-[0.33rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:text-gray-700"
                onClick={() => {
                  dispatch({
                    type: "SET_ALIGNMENT",
                    id: post.id,
                    align: "right",
                  });
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-align-right" />
              </button>
            </div>
          )}
        </div>
      </Resizable>
    </>
  );
}

export default PostItem;
