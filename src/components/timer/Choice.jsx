import { useContext } from "react";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { useSettings } from "../../context/SettingsContext";

function Choice() {
  const lang = useSettings().lang;
  const timer = useTimer();
  const dispatch = useDispatchTimer();

  useContext(() => {
    const handleKeydown = (event) => {
      event.stopPropagation();
      if (event.code === "Space") {
        if (timer.status === "countdown") {
          dispatch({
            type: "RESUME_TIMER",
          });
        } else if (timer.status === "countdown ended") {
          dispatch({
            type: "START_BREAK",
          });
        } else if (timer.status === "break ended") {
          dispatch({
            type: "START_TIMER",
          });
        }
      }
    };
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div
      id="choice-wrapper"
      onClick={(event) => {
        event.stopPropagation();
        if (timer.status === "countdown" || timer.status === "break") {
          dispatch({
            type: "TOGGLE_TIMER_STATE",
          });
        }
      }}
      className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black/35"
    >
      {timer.status === "countdown" && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            dispatch({
              type: "RESUME_TIMER",
            });
          }}
          className="mb-8 text-2xl"
        >
          {lang === "EN" ? "Continue" : "ต่อไป"}
        </button>
      )}
      {timer.status === "countdown ended" && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            // start the break
            dispatch({
              type: "START_BREAK",
            });
          }}
          className="mb-8 text-2xl"
        >
          {lang === "EN" ? "Break" : "พัก"}
        </button>
      )}
      {timer.status !== "countdown" && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            dispatch({
              type: "START_TIMER",
              countdownMinutes: timer.countdownMinutes,
              breakMinutes: timer.breakMinutes,
            });
          }}
          className="mb-8 text-2xl"
        >
          {lang === "EN" ? "Again" : "เริ่มใหม่"}
        </button>
      )}
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch({
            type: "END_SESSION",
          });
        }}
        className="text-2xl"
      >
        {lang === "EN" ? "End" : "จบ"}
      </button>
    </div>
  );
}

export default Choice;
