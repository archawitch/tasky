import SetTimer from "./SetTimer";
import SetBreak from "./SetBreak";
import StartTimerButton from "./StartTimerButton";
import { useTimer } from "../../context/TimerContext";

function TimerSettings() {
  const timer = useTimer();

  return (
    <>
      {!(timer.isCountdown || timer.isBreak || timer.isPause) && (
        <div
          id="set-break-start-wrapper"
          className="flex items-end justify-between"
        >
          <div>
            <SetTimer></SetTimer>
            <SetBreak></SetBreak>
          </div>
          <StartTimerButton></StartTimerButton>
        </div>
      )}
    </>
  );
}

export default TimerSettings;
