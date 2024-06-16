import { useState, useEffect, useRef } from "react";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { getAlarmSound } from "../../utils/utils";

function CountdownTimer() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();
  const audioRef = useRef(null);
  const refInterval = useRef(null);
  const isLargeScreen = screen.width > 576;

  useEffect(() => {
    let handleKeydown;
    if (timer.isCountdown) {
      const now = Math.floor(new Date(Date.now()) / 1000);
      let elapsedTime = now - (timer.timerStartAt + timer.pauseTime);
      // pause
      if (timer.isPause) {
        // increase pause time
        refInterval.current = setInterval(() => {
          const currentStoppedTime = Math.floor(Date.now() / 1000);
          dispatch({
            type: "SET_PAUSE_TIME",
            pauseTime: timer.pauseTime + (currentStoppedTime - now),
          });
        }, 100);
      }
      // no pause
      else {
        // end the timer when the time is up
        const isEnded = elapsedTime >= timer.countdownMinutes * 60;
        if (isEnded) {
          // play the alert sound
          if (elapsedTime <= timer.countdownMinutes * 60 + 2) {
            audioRef.current.play();
          }
          // update
          dispatch({
            type: "UPDATE_ELAPSED_TIME",
            timerElapsed: timer.countdownMinutes * 60,
          });
          // dispatch to end the timer
          dispatch({
            type: "TIMER_END",
          });
          // dispatch to start the break
          dispatch({
            type: "START_BREAK",
          });
        } else {
          refInterval.current = setInterval(() => {
            // update time left
            elapsedTime += 0.1;
            dispatch({
              type: "UPDATE_ELAPSED_TIME",
              timerElapsed: elapsedTime,
            });
          }, 100);
        }
      }
      handleKeydown = (event) => {
        if (event.code === "Space") {
          dispatch({
            type: "TOGGLE_TIMER_STATE",
          });
        }
      };
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      if (refInterval.current) {
        clearInterval(refInterval.current);
      }
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [timer.isCountdown, timer.isPause, timer.timerElapsed, timer.pauseTime]);

  function getCountdown(seconds) {
    const remainingHours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const remainingMinutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${remainingHours}:${remainingMinutes}:${remainingSeconds}`;
  }

  const timeLeft = Math.ceil(timer.countdownMinutes * 60 - timer.timerElapsed);

  return (
    <>
      {(isLargeScreen || timer.isCountdown) && (
        <span
          style={{ lineHeight: "3rem" }}
          onClick={() => {
            dispatch({
              type: "TOGGLE_TIMER_STATE",
            });
          }}
          className="cursor-pointer text-4xl tracking-wide"
        >
          {getCountdown(timeLeft)}
        </span>
      )}
      <audio className="hidden" ref={audioRef} src={getAlarmSound(1).url} />
    </>
  );
}

export default CountdownTimer;
