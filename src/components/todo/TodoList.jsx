import "../../styles/todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTodoList } from "../../context/TodoListContext";
import AddTodoItem from "./AddTodoItem";
import TodoItem from "./TodoItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";

function TodoList({ isVisible, closeTodoList }) {
  const todoList = useTodoList();

  const [width, setWidth] = useState(0);

  useEffect(() => {
    let panelWidth;
    if (isVisible) {
      panelWidth = screen.width > 576 ? "20rem" : "100%";
    } else {
      panelWidth = 0;
    }
    setWidth(panelWidth);
  }, [isVisible]);

  return (
    <>
      <div
        style={{
          width: width,
        }}
        className="absolute z-50 flex h-full overflow-clip bg-[#66676B] text-[0.8rem] font-medium transition-all duration-500 sm:relative sm:bg-[#66676B]/90"
      >
        {isVisible && (
          <>
            <TransitionGroup className="todo-list scrollable mb-24 mt-[2.4rem] flex w-full flex-col px-6 sm:mb-24">
              {todoList.map((todo) => {
                return (
                  <CSSTransition
                    key={todo.id}
                    timeout={500}
                    nodeRef={todo.nodeRef}
                    classNames="todo"
                  >
                    <TodoItem key={todo.id} todo={todo}></TodoItem>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
            <AddTodoItem></AddTodoItem>
            <button
              onClick={closeTodoList}
              className="absolute left-[0.4rem] top-[0.2rem] text-lg text-neutral-200"
            >
              <FontAwesomeIcon icon="fa-solid fa-caret-right" />
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default TodoList;
