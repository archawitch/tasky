import Countdown from "./Countdown";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { useEffect, useRef } from "react";

function Timer() {
  const timer = useTimer();
  // const dispatch = useDispatchTimer();
  // const refDocument = useRef(document);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.code === "Space") {
  //       if (timer.isCountdown || timer.isBreak) {
  //         dispatch({
  //           type: "TOGGLE_TIMER_STATE",
  //           isPause: !timer.isPause,
  //         });
  //       } else {
  //         dispatch({
  //           type: "START_TIMER",
  //           countdownMinutes: timer.countdownMinutes,
  //           breakMinutes: timer.breakMinutes,
  //         });
  //       }
  //     }
  //   };
  //   refDocument.current.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [
  //   timer.isBreak,
  //   timer.isCountdown,
  //   timer.isPause,
  //   timer.countdownMinutes,
  //   timer.breakMinutes,
  // ]);

  return (
    <>
      {(timer.isCountdown || timer.isBreak || timer.isPause) && (
        <div
          id="timer-wrapper"
          className="mt-3 flex items-end justify-center sm:justify-between"
        >
          <Countdown></Countdown>
        </div>
      )}
    </>
  );
}

export default Timer;
