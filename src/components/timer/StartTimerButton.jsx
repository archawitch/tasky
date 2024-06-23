import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { useEffect } from "react";

function StartTimerButton() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();

  useEffect(() => {
    const handleKeydown = (event) => {
      event.stopPropagation();
      if (event.code === "Space") {
        dispatch({
          type: "START_TIMER",
          countdownMinutes: timer.countdownMinutes,
          breakMinutes: timer.breakMinutes,
        });
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <>
      <button
        className="z-10"
        onClick={() => {
          dispatch({
            type: "START_TIMER",
            countdownMinutes: timer.countdownMinutes,
            breakMinutes: timer.breakMinutes,
          });
        }}
      >
        <span className="pr-3 text-2xl">start</span>
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
      </button>
    </>
  );
}

export default StartTimerButton;
