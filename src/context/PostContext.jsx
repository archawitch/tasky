import { createContext, useContext, useReducer, useEffect } from "react";

const PostContext = createContext(null);
const PostDispatchContext = createContext(null);
let currentColor = 0;
let postColors = ["#FFFF99", "#F5F6F7", "#DAF7A1", "#FFC000", "#FFCEE1"];
const initialPosts = (() => {
  const savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    return JSON.parse(savedPosts);
  } else {
    return [];
  }
})();

function postReducer(posts, action) {
  switch (action.type) {
    case "ADD_POST":
      return [
        ...posts,
        {
          id: action.id,
          posX: action.posX + 10,
          posY: action.posY,
          width: 240,
          height: 192,
          text: "",
          fontSize: 0.9,
          backgroundColor: currentColor,
          nextBackgroundColor: (currentColor + 1) % postColors.length,
          foreColor: "black",
        },
      ];
    case "EDIT_POST":
      return posts.map((p) => {
        if (p.id === action.post.id) {
          return action.post;
        } else {
          return p;
        }
      });
    case "DELETE_POST":
      return posts.filter((p) => p.id !== action.id);
    case "MOVE_POST":
      return posts.map((p) => {
        if (p.id === action.id) {
          return {
            ...p,
            posX: action.posX,
            posY: action.posY,
          };
        } else {
          return p;
        }
      });
    case "SET_FONT_SIZE":
      return posts.map((p) => {
        if (p.id === action.id) {
          return { ...p, fontSize: action.fontSize };
        } else {
          return p;
        }
      });
    case "CHANGE_COLOR":
      return posts.map((p) => {
        if (p.id === action.id) {
          currentColor = p.nextBackgroundColor;
          const nextColor = (p.nextBackgroundColor + 1) % postColors.length;
          return {
            ...p,
            backgroundColor: p.nextBackgroundColor,
            nextBackgroundColor: nextColor,
          };
        } else {
          return p;
        }
      });
    case "RESIZE_POST":
      return posts.map((p) => {
        if (p.id === action.id) {
          return {
            ...p,
            width: action.newWidth,
            height: action.newHeight,
          };
        } else {
          return p;
        }
      });
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function usePosts() {
  return useContext(PostContext);
}

export function useDispatchPosts() {
  return useContext(PostDispatchContext);
}

export function PostProvider({ children }) {
  const [posts, dispatch] = useReducer(postReducer, initialPosts);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <PostContext.Provider value={posts}>
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostContext.Provider>
  );
}

export function getPostColor(index) {
  return postColors[index];
}
