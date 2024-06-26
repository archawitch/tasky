import { createContext, useContext, useReducer, useEffect } from "react";

const SettingsContext = createContext(null);
const SettingsDispatchContext = createContext(null);

const defaultSettings = {
  selectedBackground: 0, // -1 means the user is using their own bg
  userBackground: null,
  backgroundFrom: "system",
  todoColor: ["transparent", "#F99898", "#273b5d", "#66676B", null, null],
  selectedTodoColor: "#273b5d",
  lang: "EN",
};
const initialSettings = (() => {
  const savedSettings = localStorage.getItem("settings");
  if (savedSettings) {
    let settings = JSON.parse(savedSettings);
    if (!settings.todoColor || !settings.todoColor[0] || !settings.lang) {
      settings.todoColor = defaultSettings.todoColor;
    }
    return settings;
  } else {
    return defaultSettings;
  }
})();

function settingsReducer(settings, action) {
  switch (action.type) {
    case "CHANGE_BACKGROUND":
      return {
        ...settings,
        selectedBackground: action.selectedBackground,
        userBackground: null,
        backgroundFrom: "system",
      };
    case "CHANGE_BACKGROUND_FROM_USER":
      return {
        ...settings,
        userBackground: action.userBackground,
        backgroundFrom: "user",
      };
    case "CHANGE_TODO_COLOR":
      return {
        ...settings,
        selectedTodoColor: action.selectedColor,
      };
    case "ADD_TODO_COLOR":
      return {
        ...settings,
        todoColor: settings.todoColor.map((color, index) => {
          if (index === action.index) {
            return action.newColor;
          } else {
            return color;
          }
        }),
      };
    case "CHANGE_LANGUAGE":
      return {
        ...settings,
        lang: action.lang,
      };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useDispatchSettings() {
  return useContext(SettingsDispatchContext);
}

export function SettingsProvider({ children }) {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

export function getBackground(n) {
  if (screen.width >= 640) {
    return `url("/images/bg/bg-${n + 1}.jpg")`;
  } else {
    return `url("/images/bg/mobile-bg-${n + 1}.jpg")`;
  }
}
