import OpenTodoButton from "../todo/OpenTodoButton";
import AddPostButton from "../post-it/AddPostButton";
import SetTimer from "../timer/SetTimer";
import SetBreak from "../timer/SetBreak";
import CountdownTimer from "../timer/CountdownTimer";
import { useTimer } from "../../context/TimerContext";

function MiddleWrapper({ isTodoVisible, openTodoList }) {
  const timer = useTimer();
  const isLargeScreen = screen.width >= 640;
  if (isLargeScreen) {
    return (
      <div className="hidden items-center justify-between md:flex">
        <AddPostButton></AddPostButton>
        <div>
          {!isTodoVisible && (
            <OpenTodoButton openTodoList={openTodoList}></OpenTodoButton>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <>
        {timer.status === null && (
          <div className="z-10 flex flex-col items-center justify-center gap-2">
            <SetTimer></SetTimer>
            <SetBreak></SetBreak>
          </div>
        )}
        {timer.status !== null && (
          <div
            id="timer-wrapper"
            className="flex h-14 items-end justify-center"
          >
            {(timer.status === "countdown" ||
              timer.status === "countdown ended") && (
              <CountdownTimer></CountdownTimer>
            )}
          </div>
        )}
      </>
    );
  }
}

export default MiddleWrapper;
