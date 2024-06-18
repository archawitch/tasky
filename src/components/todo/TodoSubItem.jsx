import Checkbox from "./Checkbox";
import { useState, useEffect, useRef } from "react";
import { useDispatchTodoList } from "../../context/TodoListContext";

function TodoSubItem({ todoId, subTodo }) {
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef(null);
  const checkboxRef = useRef(null);
  const dispatch = useDispatchTodoList();

  const deleteSubTodo = () => {
    dispatch({
      type: "DELETE_SUB_TASK",
      todoId: todoId,
      subId: subTodo.id,
    });
  };

  function handleSubTodoClick(e) {
    if (subTodo.taskName === "") {
      e.stopPropagation();
      setIsEditing(true);
    }
  }

  function addSubTask() {
    dispatch({
      type: "ADD_SUB_TASK",
      id: todoId,
    });
  }

  const handleCheckbox = () => {
    dispatch({
      type: "TOGGLE_SUB_TASK_CHECKED",
      todoId: todoId,
      subId: subTodo.id,
      isChecked: checkboxRef.current.checked,
    });
  };

  let subTodoContent;
  if (isEditing) {
    subTodoContent = (
      <input
        ref={inputRef}
        onBlur={(event) => {
          setIsEditing(false);
          const newTaskName = event.target.value;
          dispatch({
            type: "RENAME_SUB_TASK",
            todoId: todoId,
            subId: subTodo.id,
            taskName: newTaskName,
          });
        }}
        onFocus={(event) => {
          event.target.value = subTodo.taskName;
        }}
        onKeyDown={(event) => {
          event.stopPropagation();
          if (event.code === "Enter" && event.target.value.trim() !== "") {
            addSubTask();
          }
        }}
        className="w-full bg-transparent outline-none"
        spellCheck="false"
      />
    );
  } else {
    subTodoContent = (
      <span
        onClick={(event) => {
          setIsEditing(true);
          event.stopPropagation();
        }}
      >
        {subTodo.taskName}
      </span>
    );
  }

  useEffect(() => {
    if (isEditing && inputRef.current.value === "") {
      inputRef.current.focus();
    } else {
      if (subTodo.taskName === "") {
        deleteSubTodo();
      }
    }
  }, [isEditing]);

  return (
    <div
      ref={subTodo.nodeRef}
      onClick={(event) => {
        handleSubTodoClick(event);
      }}
      className={`z-10 mb-3 flex w-full cursor-pointer rounded-lg  border-[3px] border-white bg-white/10 px-3 py-[0.4rem] transition-all`}
    >
      <Checkbox
        ref={checkboxRef}
        onChange={handleCheckbox}
        isChecked={subTodo.isChecked}
        todoId={todoId}
        subTodoId={subTodo.id}
        id={`${todoId}-${subTodo.id}`}
      />
      <span className="ml-[1.5rem] mr-4 overflow-hidden text-ellipsis">
        {subTodoContent}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteSubTodo();
        }}
        className="ml-auto text-xs"
      >
        X
      </button>
    </div>
  );
}

export default TodoSubItem;
