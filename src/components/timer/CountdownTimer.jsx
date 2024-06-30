import { useState, useEffect, useRef } from "react";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import {
  useDispatchActivity,
  DateToString,
} from "../../context/ActivityCalendarContext";
import { getAlarmSound } from "../../utils/utils";

function CountdownTimer() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();
  const dispatchActivity = useDispatchActivity();
  const audioRef = useRef(null);
  const refInterval = useRef(null);
  const isLargeScreen = screen.width > 576;

  // handle key event
  useEffect(() => {
    let handleKeydown;
    if (timer.isCountdown) {
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
  }, [timer.isCountdown]);

  // handle timer
  useEffect(() => {
    if (timer.isCountdown) {
      const now = Date.now();
      // elapsed time = now - (the timer was running + pausing)
      let elapsedTime =
        Math.round(now - timer.timerStartAt) / 1000 - timer.pauseTime;
      const isEnded = elapsedTime >= timer.countdownMinutes * 60;

      // handle pause
      if (timer.isPause) {
        // the user open the app and forgot to continue the timer
        // -> the timer reset
        if (isEnded) {
          // end the timer
          dispatch({
            type: "TIMER_END",
          });
          // end the session
          dispatch({
            type: "END_SESSION",
          });
        }
        // increase pause time
        else {
          refInterval.current = setInterval(() => {
            const currentStoppedTime = Date.now();
            dispatch({
              type: "SET_PAUSE_TIME",
              pauseTime:
                timer.pauseTime + Math.round((currentStoppedTime - now) / 1000),
            });
          }, 100);
        }
      }
      // run the timer if no pause
      else {
        // end the timer when the time is up
        if (isEnded) {
          // play the alert sound
          if (elapsedTime <= timer.countdownMinutes * 60 + 2) {
            audioRef.current.play();
          }
          // update focus stats
          dispatchActivity({
            type: "ADD_NEW_ENTRY",
            activity: {
              date: DateToString(new Date(timer.timerStartAt)),
              spent: timer.countdownMinutes,
            },
          });
          // update countdown mins
          dispatch({
            type: "UPDATE_ELAPSED_TIME",
            timerElapsed: timer.countdownMinutes * 60,
          });
          // dispatch to end the timer
          dispatch({
            type: "TIMER_END",
          });
        }
        // continue running the timer
        else {
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
    }

    return () => {
      if (refInterval.current) {
        clearInterval(refInterval.current);
      }
    };
  }, [timer.isCountdown, timer.isPause, timer.timerElapsed]);

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
          className="z-10 mt-1 w-[10rem] cursor-pointer text-4xl tracking-wide"
        >
          {getCountdown(timeLeft)}
        </span>
      )}
      <audio className="hidden" ref={audioRef} src={getAlarmSound(1).url} />
    </>
  );
}

export default CountdownTimer;
