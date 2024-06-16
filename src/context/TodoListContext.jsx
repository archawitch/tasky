import { createContext, useContext, useReducer, useEffect } from "react";

const TodoListContext = createContext(null);
const TodoListDispatchContext = createContext(null);
const initialTodoList = (() => {
  const savedTodoList = localStorage.getItem("todoList");
  if (savedTodoList) {
    return JSON.parse(savedTodoList);
  } else {
    return [];
  }
})();

function todoReducer(todoList, action) {
  switch (action.type) {
    case "ADD_TASK":
      const todoId =
        todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
      const lastTodo =
        todoList.length === 0
          ? { order: 0 }
          : todoList.reduce((prev, current) => {
              return prev && prev.order > current.order ? prev : current;
            });
      return [
        ...todoList,
        {
          id: todoId,
          order: lastTodo.order + 1,
          isChecked: false,
          taskName: action.taskName,
          subTasks: [],
        },
      ];
    case "RENAME_TASK":
      return todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, taskName: action.taskName };
        } else {
          return todo;
        }
      });
    case "DELETE_TASK":
      const deletedOrder = action.order;
      return todoList
        .filter((todo) => todo.id !== action.id)
        .map((todo) => {
          if (todo.order > deletedOrder) {
            return { ...todo, order: todo.order - 1 };
          } else {
            return todo;
          }
        });
    case "ADD_SUB_TASK":
      return todoList.map((todo) => {
        if (todo.id === action.id) {
          const subTasks = [...todo.subTasks];
          return {
            ...todo,
            subTasks: [
              ...todo.subTasks,
              {
                id:
                  subTasks.length === 0
                    ? 1
                    : subTasks[subTasks.length - 1].id + 1,
                order: todo.subTasks.length + 1,
                isChecked: false,
                taskName: "",
              },
            ],
          };
        } else {
          return todo;
        }
      });
    case "RENAME_SUB_TASK":
      return todoList.map((todo) => {
        if (todo.id === action.todoId) {
          const subTasks = todo.subTasks.map((subTodo) => {
            if (subTodo.id === action.subId) {
              return {
                ...subTodo,
                taskName: action.taskName,
              };
            } else {
              return subTodo;
            }
          });
          return {
            ...todo,
            subTasks: subTasks,
          };
        } else {
          return todo;
        }
      });
    case "DELETE_SUB_TASK":
      return todoList.map((todo) => {
        if (todo.id === action.todoId) {
          const subTasks = todo.subTasks.filter(
            (subTodo) => subTodo.id !== action.subId,
          );
          return {
            ...todo,
            subTasks: subTasks,
          };
        } else {
          return todo;
        }
      });
    case "TOGGLE_TASK_CHECKED":
      return todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, isChecked: action.isChecked };
        } else {
          return todo;
        }
      });
    case "TOGGLE_SUB_TASK_CHECKED":
      return todoList.map((todo) => {
        if (todo.id === action.todoId) {
          const subTasks = todo.subTasks.map((subTodo) => {
            if (subTodo.id === action.subId) {
              return {
                ...subTodo,
                isChecked: action.isChecked,
              };
            } else {
              return subTodo;
            }
          });
          return {
            ...todo,
            subTasks: subTasks,
          };
        } else {
          return todo;
        }
      });
    case "MOVE_TODO_UP":
      if (todoList.length <= 1 || action.order === 1) {
        return todoList;
      } else {
        return todoList.map((todo) => {
          if (todo.order === action.order) {
            return {
              ...todo,
              order: todo.order - 1,
            };
          } else if (todo.order === action.order - 1) {
            return {
              ...todo,
              order: todo.order + 1,
            };
          } else {
            return todo;
          }
        });
      }
    case "MOVE_TODO_DOWN":
      if (todoList.length <= 1) {
        return todoList;
      } else {
        if (action.order >= todoList[todoList.length - 1].id) {
          return todoList;
        } else {
          return todoList.map((todo) => {
            if (todo.order === action.order) {
              return {
                ...todo,
                order: todo.order + 1,
              };
            } else if (todo.order === action.order + 1) {
              return {
                ...todo,
                order: todo.order - 1,
              };
            } else {
              return todo;
            }
          });
        }
      }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function useTodoList() {
  return useContext(TodoListContext);
}

export function useDispatchTodoList() {
  return useContext(TodoListDispatchContext);
}

export function TodoListProvider({ children }) {
  const [todoList, dispatch] = useReducer(todoReducer, initialTodoList);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoListContext.Provider value={todoList}>
      <TodoListDispatchContext.Provider value={dispatch}>
        {children}
      </TodoListDispatchContext.Provider>
    </TodoListContext.Provider>
  );
}
