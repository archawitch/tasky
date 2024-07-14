import CountdownTimer from "./CountdownTimer";
import CountdownBreak from "./CountdownBreak";
import GroupBar from "../post-it/GroupBar";
import { useEffect, useState } from "react";
import { useTimer } from "../../context/TimerContext";
import { useSettings } from "../../context/SettingsContext";

function Timer({ isTodoVisible }) {
  const isLargeScreen = screen.width >= 640;
  const timer = useTimer();
  const lang = useSettings().lang;
  const front = lang === "EN" ? "" : "เหลือ";
  const back = lang === "EN" ? "mins left" : "นาที";
  const [timeLeft, setTimeLeft] = useState(0);

  const setTitle = () => {};

  useEffect(() => {
    if (timer.isCountdown || timer.isBreak) {
      let tm;
      // calculate mins left
      if (timer.isCountdown) {
        tm = Math.floor(
          (timer.countdownMinutes * 60 - timer.timerElapsed) / 60,
        );
      } else if (timer.isBreak) {
        tm = Math.floor((timer.breakMinutes * 60 - timer.breakElapsed) / 60);
      }
      // set the title if mins left changes
      if (tm !== timeLeft) {
        setTimeLeft(tm);
        document.title = `${front} ${timeLeft} ${back}`.trim();
      }
    } else {
      document.title = "Tasky";
    }
  }, [timer.timerElapsed, timer.breakElapsed, timer.status]);

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
