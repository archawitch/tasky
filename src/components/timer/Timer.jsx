import CountdownTimer from "./CountdownTimer";
import CountdownBreak from "./CountdownBreak";
import { useTimer } from "../../context/TimerContext";
import GroupBar from "../post-it/GroupBar";

function Timer({ isTodoVisible }) {
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
            <GroupBar isTodoVisible={isTodoVisible}></GroupBar>
            <CountdownBreak></CountdownBreak>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {(timer.status === "break" || timer.status === "break ended") && (
          <div id="timer-wrapper" className="flex h-14 items-end justify-end">
            <CountdownBreak></CountdownBreak>
          </div>
        )}
        {(timer.status === "countdown" ||
          timer.status === "countdown ended") && (
          <div
            id="timer-wrapper"
            className="flex h-14 items-end justify-center"
          >
            <CountdownTimer></CountdownTimer>
          </div>
        )}
      </>
    );
  }
}

export default Timer;
