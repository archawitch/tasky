import CountdownTimer from "./CountdownTimer";
import CountdownBreak from "./CountdownBreak";
import { useTimer } from "../../context/TimerContext";

function Timer() {
  const isLargeScreen = screen.width >= 640;
  const timer = useTimer();

  if (isLargeScreen) {
    return (
      <>
        {timer.status !== null && (
          <div
            id="timer-wrapper"
            className="flex h-14 items-end justify-between"
          >
            <CountdownTimer></CountdownTimer>
            <CountdownBreak></CountdownBreak>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {timer.status !== null && (
          <div id="timer-wrapper" className="flex h-14 items-end justify-end">
            {(timer.status === "break" || timer.status === "break ended") && (
              <CountdownBreak></CountdownBreak>
            )}
          </div>
        )}
      </>
    );
  }
}

export default Timer;
