import { createContext, useContext, useReducer, useEffect } from "react";

const SettingsContext = createContext(null);
const SettingsDispatchContext = createContext(null);
const initialSettings = (() => {
  const savedSettings = localStorage.getItem("settings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  } else {
    return {
      selectedBackground: 0, // -1 means the user is using his own bg
      userBackground: null,
      backgroundFrom: "system",
      todoColor: [null, null, null, null, null, null],
      selectedTodoColor: 0,
      isEng: true,
    };
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
