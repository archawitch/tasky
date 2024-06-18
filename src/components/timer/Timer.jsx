import CountdownTimer from "./CountdownTimer";
import CountdownBreak from "./CountdownBreak";
import { useTimer } from "../../context/TimerContext";

function Timer() {
  const timer = useTimer();

  return (
    <>
      {(timer.isCountdown || timer.isBreak || timer.isPause) && (
        <div
          id="timer-wrapper"
          className="flex h-14 items-end justify-center sm:justify-between"
        >
          <CountdownTimer></CountdownTimer>
          <CountdownBreak></CountdownBreak>
        </div>
      )}
    </>
  );
}

export default Timer;
