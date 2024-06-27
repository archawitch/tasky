import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useDispatchTodoList } from "../../context/TodoListContext";
import { useSettings } from "../../context/SettingsContext";

function AddTodoItem() {
  const settings = useSettings();
  const [placeholder, setPlaceholder] = useState(
    settings.lang === "EN" ? "Add a task" : "เพิ่มงาน",
  );
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

  useEffect(() => {
    setPlaceholder(settings.lang === "EN" ? "Add a task" : "เพิ่มงาน");
    if (settings.lang === "TH" && text === "Add a task") {
      setText("เพิ่มงาน");
    } else if (settings.lang === "EN" && text === "เพิ่มงาน") {
      setText("Add a task");
    }
  }, [settings.lang]);

  return (
    <div className="absolute bottom-0 mb-7 flex w-full px-6 sm:mb-[2.4rem]">
      <div className="flex w-full rounded-lg border-[3px] border-white">
        <input
          style={{
            color:
              !isFocused && text.trim() === placeholder
                ? "rgb(245 245 245)"
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
          className="w-full flex-grow bg-transparent px-4 py-[0.35rem] focus:outline-none"
          spellCheck="false"
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
