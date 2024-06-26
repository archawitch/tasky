import { useEffect, useRef } from "react";

function TodoContent({
  todoId = null, // for sub todo to indicate its parent
  todo,
  todoType,
  dispatch,
  isEditing,
  setIsEditing,
}) {
  const inputRef = useRef(null);

  function renameTask(newTaskName) {
    dispatch({
      type: "RENAME_TASK",
      id: todo.id,
      taskName: newTaskName,
    });
  }

  function renameSubTask(newTaskName) {
    dispatch({
      type: "RENAME_SUB_TASK",
      todoId: todoId,
      subId: todo.id,
      taskName: newTaskName,
    });
  }

  function addSubTask() {
    dispatch({
      type: "ADD_SUB_TASK",
      id: todoId,
    });
  }

  function deleteSubTodo() {
    dispatch({
      type: "DELETE_SUB_TASK",
      todoId: todoId,
      subId: todo.id,
    });
  }

  let todoContent;
  if (isEditing) {
    todoContent = (
      <input
        ref={inputRef}
        onBlur={(event) => {
          setIsEditing(false);
          const newTaskName = event.target.value;
          // rename task
          if (todoType === "todo") {
            renameTask(newTaskName);
          } else if (todoType === "subTodo") {
            renameSubTask(newTaskName);
          }
        }}
        onFocus={(event) => {
          event.target.value = todo.taskName;
        }}
        onKeyDown={(event) => {
          event.stopPropagation();
          if (event.code === "Enter" && event.target.value.trim() !== "") {
            setIsEditing(false);
            const newTaskName = event.target.value;
            if (todoType === "todo") {
              renameTask(newTaskName);
            } else if (todoType === "subTodo") {
              renameSubTask(newTaskName);
              addSubTask();
            }
          }
        }}
        className="w-full bg-transparent outline-none"
        spellCheck="false"
      />
    );
  } else {
    todoContent = (
      <span
        onClick={(event) => {
          setIsEditing(true);
          event.stopPropagation();
        }}
      >
        {todo.taskName}
      </span>
    );
  }

  useEffect(() => {
    if (isEditing && inputRef.current && inputRef.current.value === "") {
      inputRef.current.focus();
    } else {
      if (todo.taskName === "") {
        deleteSubTodo();
      }
    }
  }, [isEditing]);

  return (
    <span className="ml-[1.5rem] mr-4 overflow-hidden text-ellipsis">
      {todoContent}
    </span>
  );
}

export default TodoContent;
