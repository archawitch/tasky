import "../../styles/todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTodoList } from "../../context/TodoListContext";
import { useSettings } from "../../context/SettingsContext";
import AddTodoItem from "./AddTodoItem";
import TodoItem from "./TodoItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import { hexToRgba } from "../../utils/utils";
import CloseTodoListButton from "./CloseTodoListButton";

function TodoList({ isVisible, closeTodoList }) {
  const todoList = useTodoList();
  const settings = useSettings();
  const todoColor = settings.selectedTodoColor;

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
          backgroundColor:
            screen.width >= 640
              ? hexToRgba(todoColor, 0.9)
              : hexToRgba(todoColor, 1),
        }}
        className="absolute z-50 flex h-full overflow-clip text-[0.8rem] font-medium transition-all duration-500 sm:relative"
      >
        <div
          style={{
            width: screen.width > 576 ? "20rem" : "100%",
          }}
        >
          <TransitionGroup className="todo-list scrollable mb-24 mt-[2.4rem] flex w-full flex-col px-6 sm:mb-24">
            {todoList.map((todo) => {
              return (
                <CSSTransition key={todo.id} timeout={500} classNames="todo">
                  <TodoItem key={todo.id} todo={todo}></TodoItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          <AddTodoItem></AddTodoItem>
          <CloseTodoListButton
            closeTodoList={closeTodoList}
          ></CloseTodoListButton>
        </div>
      </div>
    </>
  );
}

export default TodoList;
