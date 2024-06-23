import SetTimer from "./SetTimer";
import SetBreak from "./SetBreak";
import StartTimerButton from "./StartTimerButton";
import { useTimer } from "../../context/TimerContext";
import GroupBar from "../post-it/GroupBar";

function TimerSettings({ isTodoVisible }) {
  const isLargeScreen = screen.width >= 640;
  const timer = useTimer();

  if (isLargeScreen) {
    return (
      <>
        {timer.status === null && (
          <div
            id="set-break-start-wrapper"
            className="flex h-14 items-end justify-between"
          >
            <div className="z-10 w-[10rem]">
              <SetTimer></SetTimer>
              <SetBreak></SetBreak>
            </div>
            <GroupBar isTodoVisible={isTodoVisible}></GroupBar>
            <StartTimerButton></StartTimerButton>
          </div>
        )}
      </>
    );
  } else {
    // timer and break settings are in the MiddleWrapper
    return (
      <>
        {timer.status === null && (
          <div
            id="set-break-start-wrapper"
            className="flex h-14 items-end justify-end"
          >
            <StartTimerButton></StartTimerButton>
          </div>
        )}
      </>
    );
  }
}

export default TimerSettings;
