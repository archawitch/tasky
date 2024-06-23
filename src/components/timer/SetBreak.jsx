import { useState } from "react";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SetBreak() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();
  const initialBreakMinutes = timer.breakMinutes ?? 5;
  const initialIndex = breakTime.findIndex(
    (time) => time === initialBreakMinutes,
  );
  const [index, setIndex] = useState(initialIndex);

  function increaseIndex() {
    if (index < breakTime.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      dispatch({
        type: "SET_BREAK_MINUTES",
        breakMinutes: breakTime[nextIndex],
      });
    }
  }

  function decreaseIndex() {
    if (index > 0) {
      const nextIndex = index - 1;
      setIndex(nextIndex);
      dispatch({
        type: "SET_BREAK_MINUTES",
        breakMinutes: breakTime[nextIndex],
      });
    }
  }

  return (
    <div className="z-10 flex items-center">
      <span onClick={increaseIndex} className="cursor-pointer pr-3 text-lg">
        <FontAwesomeIcon icon="fa-solid fa-plus" />
      </span>
      <span
        onClick={increaseIndex}
        className="ml-[0.1em] cursor-pointer text-2xl"
      >
        <FontAwesomeIcon icon="fa-solid fa-hourglass" className="mr-[0.2em]" />
        &ensp;{breakTime[index]}
      </span>
      <span onClick={decreaseIndex} className="cursor-pointer px-3 text-lg">
        <FontAwesomeIcon icon="fa-solid fa-minus" />
      </span>
    </div>
  );
}

export default SetBreak;

const breakTime = [1, 2, 3, 4, 5, 10, 15, 20, 30];
