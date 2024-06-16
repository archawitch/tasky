import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { useDispatchTodoList } from "../../context/TodoListContext";

function AddTodoItem() {
  const placeholder = "Add a task";
  const [text, setText] = useState(placeholder);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatchTodoList();

  function addNewTask() {
    if (inputRef.current.value !== placeholder) {
      dispatch({
        type: "ADD_TASK",
        taskName: inputRef.current.value.trim(),
      });
      setText("");
      inputRef.current.focus();
    }
  }

  return (
    <div className="absolute bottom-0 mb-[2.4rem] flex w-full px-6">
      <div className="flex w-full rounded-lg border-[3px] border-white">
        <input
          style={{
            color:
              !isFocused && text.trim() === placeholder
                ? "rgb(212 212 212)"
                : "white",
          }}
          ref={inputRef}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (
              isFocused &&
              event.code === "Enter" &&
              event.target.value.trim() !== ""
            ) {
              addNewTask();
            }
          }}
          onFocus={() => {
            if (text.trim() === placeholder) {
              setText("");
            }
            setIsFocused(true);
          }}
          onBlur={() => {
            if (text.trim() === "") {
              setText(placeholder);
            }
            setIsFocused(false);
          }}
          onChange={(event) => setText(event.target.value)}
          value={text}
          className="flex-grow bg-transparent px-4 py-[0.35rem] focus:outline-none"
        />
        <button
          onClick={() => {
            if (inputRef.current.value.trim() !== "") {
              addNewTask();
            }
          }}
          className="mr-3 mt-[0.125rem] text-lg"
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
        </button>
      </div>
    </div>
  );
}

export default AddTodoItem;
