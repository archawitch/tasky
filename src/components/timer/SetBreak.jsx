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

  function handleIndexChange() {
    const nextIndex = (index + 1) % breakTime.length;
    setIndex(nextIndex);
    dispatch({ type: "SET_BREAK_MINUTES", breakMinutes: breakTime[nextIndex] });
  }

  return (
    <>
      <span
        onClick={handleIndexChange}
        className="ml-[0.1em] cursor-pointer text-2xl"
      >
        <FontAwesomeIcon icon="fa-solid fa-hourglass" className="mr-[0.2em]" />
        &ensp;{breakTime[index]}
      </span>
    </>
  );
}

export default SetBreak;

const breakTime = [1, 2, 3, 4, 5, 10, 15, 20, 30];
