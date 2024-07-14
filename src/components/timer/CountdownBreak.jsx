import { useEffect, useRef } from "react";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { getAlarmSound } from "../../utils/utils";

function CountdownBreak() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();
  const refInterval = useRef(null);
  const audioRef = useRef(null);

  // handle key event
  useEffect(() => {
    let handleKeydown;
    if (timer.isBreak) {
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
  }, [timer.isBreak]);

  useEffect(() => {
    if (timer.isBreak) {
      const now = Date.now();
      let breakElapsed = Math.floor(now - timer.breakStartAt) / 1000;
      // handle the timer if the timer is up
      const isEnded = breakElapsed >= timer.breakMinutes * 60;
      if (isEnded) {
        // play the alarm
        if (breakElapsed <= timer.breakMinutes * 60 + 2) {
          audioRef.current.play();
        }
        // update the break elapsed
        dispatch({
          type: "UPDATE_BREAK_ELAPSED",
          breakElapsed: timer.breakMinutes * 60,
        });
        // end the timer
        dispatch({
          type: "BREAK_END",
        });
      } else {
        refInterval.current = setInterval(() => {
          breakElapsed += 0.1;
          dispatch({
            type: "UPDATE_BREAK_ELAPSED",
            breakElapsed: breakElapsed,
          });
        }, 100);
      }
    }
    return () => {
      if (refInterval.current) {
        clearInterval(refInterval.current);
      }
    };
  }, [timer.isBreak, timer.breakElapsed]);

  const breakLeft = Math.ceil(timer.breakMinutes * 60 - timer.breakElapsed);
  const remainingMinutes = Math.floor(breakLeft / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (breakLeft % 60).toString().padStart(2, "0");

  return (
    <>
      {
        <div className="flex w-[10rem] items-center justify-end">
          <div
            onClick={() => {
              dispatch({
                type: "TOGGLE_TIMER_STATE",
                isPause: !timer.isPause,
              });
            }}
            className="z-10 cursor-pointer text-center"
          >
            <h3 className="text-xl leading-snug tracking-wider">
              {remainingMinutes}
            </h3>
            <h3 className="text-xl leading-snug tracking-wider">
              {remainingSeconds}
            </h3>
          </div>
        </div>
      }
      <audio className="hidden" ref={audioRef} src={getAlarmSound(2).url} />
    </>
  );
}

export default CountdownBreak;
