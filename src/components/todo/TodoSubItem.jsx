import Checkbox from "./Checkbox";
import { useState, useEffect, useRef } from "react";
import { useDispatchTodoList } from "../../context/TodoListContext";
import TodoContent from "./TodoContent";

function TodoSubItem({ todoId, subTodo }) {
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef(null);
  const checkboxRef = useRef(null);
  const dispatch = useDispatchTodoList();

  function handleSubTodoClick(e) {
    if (subTodo.taskName === "") {
      e.stopPropagation();
      setIsEditing(true);
    }
  }

  function changeMode(mode) {
    setIsEditing(mode);
  }

  function deleteSubTodo() {
    dispatch({
      type: "DELETE_SUB_TASK",
      todoId: todoId,
      subId: subTodo.id,
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
      <TodoContent
        todoId={todoId}
        todo={subTodo}
        dispatch={dispatch}
        isEditing={isEditing}
        setIsEditing={changeMode}
        todoType="subTodo"
      ></TodoContent>
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
