import { createContext, useContext, useReducer, useEffect } from "react";

const TimerContext = createContext(null);
const TimerDispatchContext = createContext(null);
const initialTimerSettings = (() => {
  const savedSettings = localStorage.getItem("timerSettings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  } else {
    return {
      isCountdown: false,
      isBreak: false,
      isPause: false,
      countdownMinutes: 30,
      breakMinutes: 5,
      timerStartAt: null,
      timerEndAt: null,
      timerElapsed: 0,
      breakStartAt: null,
      breakEndAt: null,
      breakElapsed: 0,
      pauseTime: 0,
      status: null,
    };
  }
})();

function timerReducer(timer, action) {
  switch (action.type) {
    case "SET_TIME_MINUTES":
      return { ...timer, countdownMinutes: action.countdownMinutes };
    case "SET_BREAK_MINUTES":
      return { ...timer, breakMinutes: action.breakMinutes };
    case "START_TIMER":
      const timerStartAt = Math.floor(Date.now() / 1000);
      const timerEndAt = timerStartAt + timer.countdownMinutes * 60;
      return {
        ...timer,
        isCountdown: true,
        isBreak: false,
        isPause: false,
        countdownMinutes: timer.countdownMinutes,
        breakMinutes: timer.breakMinutes,
        timerStartAt: timerStartAt,
        timerEndAt: timerEndAt,
        timerElapsed: 0,
        breakElapsed: 0,
        pauseTime: 0,
        status: "countdown",
      };
    case "UPDATE_ELAPSED_TIME":
      return { ...timer, timerElapsed: action.timerElapsed };
    case "TIMER_END":
      return {
        ...timer,
        isCountdown: false,
        isPause: true,
        timerStartAt: null,
        status: "countdown ended",
      };
    case "START_BREAK":
      const breakStartAt = Math.floor(Date.now() / 1000);
      const breakEndAt = breakStartAt + timer.breakMinutes * 60;
      return {
        ...timer,
        isBreak: true,
        isPause: false,
        breakStartAt: breakStartAt,
        breakEndAt: breakEndAt,
        status: "break",
      };
    case "UPDATE_BREAK_ELAPSED":
      return { ...timer, breakElapsed: action.breakElapsed };
    case "BREAK_END":
      return {
        ...timer,
        isBreak: false,
        isPause: true,
        pauseTime: 0,
        breakStartAt: null,
        status: "break ended",
      };
    case "END_SESSION":
      return {
        ...timer,
        isCountdown: false,
        isBreak: false,
        isPause: false,
        status: null,
      };
    case "TOGGLE_TIMER_STATE":
      return { ...timer, isPause: !timer.isPause };
    case "RESUME_TIMER":
      return { ...timer, isPause: false };
    case "SET_PAUSE_TIME":
      return { ...timer, pauseTime: action.pauseTime };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function useTimer() {
  return useContext(TimerContext);
}

export function useDispatchTimer() {
  return useContext(TimerDispatchContext);
}

export function TimerProvider({ children }) {
  const [timer, dispatch] = useReducer(timerReducer, initialTimerSettings);

  useEffect(() => {
    localStorage.setItem("timerSettings", JSON.stringify(timer));
  }, [timer]);

  return (
    <TimerContext.Provider value={timer}>
      <TimerDispatchContext.Provider value={dispatch}>
        {children}
      </TimerDispatchContext.Provider>
    </TimerContext.Provider>
  );
}
