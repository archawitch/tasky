import "../../styles/todo.css";
import Checkbox from "./Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatchTodoList } from "../../context/TodoListContext";
import { useState, useEffect, useRef } from "react";
import TodoSubItem from "./TodoSubItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TodoContent from "./TodoContent";

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const checkboxRef = useRef(null);
  const dispatch = useDispatchTodoList();
  const marginBottom = isFocused ? "2.6rem" : "0.75rem";
  const bgOpacity = isFocused ? 0.2 : 0.1;

  const deleteTodo = () => {
    dispatch({
      type: "DELETE_TASK",
      id: todo.id,
      order: todo.order,
    });
  };

  function handleTodoClick() {
    if (todo.taskName === "") {
      setIsEditing(true);
    } else if (!isEditing) {
      setIsFocused(!isFocused);
    }
  }

  function changeMode(mode) {
    setIsEditing(mode);
  }

  function addSubTask() {
    dispatch({
      type: "ADD_SUB_TASK",
      id: todo.id,
    });
  }

  const handleCheckbox = () => {
    dispatch({
      type: "TOGGLE_TASK_CHECKED",
      id: todo.id,
      isChecked: checkboxRef.current.checked,
    });
  };

  useEffect(() => {
    // check if its sub tasks are finished
    if (todo.subTasks.length > 0) {
      let count = 0;
      todo.subTasks.forEach((sub) => {
        if (!sub.isChecked) {
          count++;
        }
      });
      const done = count === 0;
      dispatch({
        type: "TOGGLE_TASK_CHECKED",
        id: todo.id,
        isChecked: done,
      });
    }
  }, [todo.subTasks]);

  return (
    <div
      style={{
        order: todo.order,
      }}
      className="relative w-full transition-all"
    >
      <div
        style={{
          marginBottom: marginBottom,
        }}
        className="relative flex w-full transition-all"
      >
        <div
          onClick={() => {
            handleTodoClick();
          }}
          style={{
            backgroundColor: `rgb(255, 255, 255, ${bgOpacity})`,
          }}
          className={`z-10 flex w-full cursor-pointer rounded-lg  border-[3px] border-white px-3 py-[0.4rem] transition-all`}
        >
          <Checkbox
            ref={checkboxRef}
            isChecked={todo.isChecked}
            onChange={handleCheckbox}
            id={todo.id}
          />
          <TodoContent
            todo={todo}
            dispatch={dispatch}
            isEditing={isEditing}
            setIsEditing={changeMode}
            todoType="todo"
          ></TodoContent>
          {!isFocused ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo();
              }}
              className="ml-auto text-xs"
            >
              X
            </button>
          ) : (
            <div className="ml-auto flex">
              <button
                onClick={(event) => {
                  dispatch({
                    type: "MOVE_TODO_UP",
                    order: todo.order,
                  });
                  event.stopPropagation();
                }}
                className="mr-[0.35rem]"
              >
                <FontAwesomeIcon
                  className=" text-xs"
                  icon="fa-solid fa-arrow-up-long"
                />
              </button>
              <button
                onClick={(event) => {
                  dispatch({
                    type: "MOVE_TODO_DOWN",
                    order: todo.order,
                  });
                  event.stopPropagation();
                }}
              >
                <FontAwesomeIcon
                  className=" text-xs"
                  icon="fa-solid fa-arrow-down-long"
                />
              </button>
            </div>
          )}
        </div>
        <div
          style={{
            height: isFocused ? "4rem" : "2.2rem",
          }}
          className={`absolute flex w-full flex-col rounded-lg border-[3px] border-white bg-white/10 transition-all`}
        >
          {isFocused && (
            <div className="mt-[2.1rem] grid w-full flex-grow grid-cols-2">
              <button
                onClick={() => {
                  addSubTask();
                  setIsFocused(false);
                }}
                className="flex items-center justify-center border-r-[3px] text-[0.65rem]"
              >
                Add sub task
              </button>
              <button
                onClick={() => {
                  deleteTodo();
                  setIsFocused(false);
                }}
                className="flex items-center justify-center text-[0.65rem]"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <TransitionGroup
        style={{
          order: todo.order,
        }}
        className="ml-8"
      >
        {todo.subTasks.map((subTodo) => {
          return (
            <CSSTransition
              key={subTodo.id}
              timeout={500}
              classNames="todo"
              nodeRef={subTodo.nodeRef}
            >
              <TodoSubItem
                key={subTodo.id}
                todoId={todo.id}
                subTodo={subTodo}
              ></TodoSubItem>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}

export default TodoItem;
