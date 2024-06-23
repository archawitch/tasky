import { useEffect, useRef } from "react";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { getAlarmSound } from "../../utils/utils";

function CountdownBreak() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();
  const refInterval = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    let handleKeydown;
    if (timer.isBreak) {
      const now = Math.floor(new Date(Date.now()) / 1000);
      let breakElapsed = now - (timer.breakStartAt + timer.pauseTime);
      const isEnded = breakElapsed >= timer.breakMinutes * 60;
      if (isEnded) {
        if (breakElapsed <= timer.breakMinutes * 60 + 2) {
          audioRef.current.play();
        }
        dispatch({
          type: "UPDATE_BREAK_ELAPSED",
          breakElapsed: timer.breakMinutes * 60,
        });
        dispatch({
          type: "BREAK_END",
        });
        clearInterval(refInterval.current);
      } else {
        refInterval.current = setInterval(() => {
          breakElapsed += 0.1;
          dispatch({
            type: "UPDATE_BREAK_ELAPSED",
            breakElapsed: breakElapsed,
          });
        }, 100);
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
  }, [timer.isBreak, timer.breakElapsed, dispatch]);

  const breakLeft = Math.ceil(timer.breakMinutes * 60 - timer.breakElapsed);
  const remainingMinutes = Math.floor(breakLeft / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (breakLeft % 60).toString().padStart(2, "0");

  return (
    <>
      {
        <div className="flex w-[5rem] items-center justify-end">
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
      <audio className="hidden" ref={audioRef} src={getAlarmSound(1).url} />
    </>
  );
}

export default CountdownBreak;
