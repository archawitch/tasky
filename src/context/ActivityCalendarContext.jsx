import { createContext, useContext, useReducer, useEffect } from "react";

const ActivityContext = createContext(null);
const ActivityDispatchContext = createContext(null);
const initialValue = (() => {
  const savedValue = localStorage.getItem("activity-calendar");
  if (savedValue) {
    return JSON.parse(savedValue);
  } else {
    return [];
  }
})();

function activityReducer(activities, action) {
  switch (action.type) {
    case "ADD_NEW_ENTRY":
      return [...activities, action.activity];
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function useActivity() {
  return useContext(ActivityContext);
}

export function useDispatchActivity() {
  return useContext(ActivityDispatchContext);
}

export function ActivityProvider({ children }) {
  const [activities, dispatch] = useReducer(activityReducer, initialValue);

  useEffect(() => {
    localStorage.setItem("activity-calendar", JSON.stringify(activities));
  }, [activities]);

  return (
    <ActivityContext.Provider value={activities}>
      <ActivityDispatchContext.Provider value={dispatch}>
        {children}
      </ActivityDispatchContext.Provider>
    </ActivityContext.Provider>
  );
}

export function DateToString(d) {
  const year = String(d.getFullYear());
  const month = String(d.getMonth() + 1);
  const date = String(d.getDate());
  return `${year}-${month.padStart(2, "0")}-${date.padStart(2, "0")}`;
}
