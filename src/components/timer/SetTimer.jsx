import { useState } from "react";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SetTimer() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();
  const initialMinutes = () => {
    return timer.countdownMinutes;
  };
  const [minutes, setMinutes] = useState(initialMinutes());

  function increaseMinutes() {
    const newMinutes = (minutes % 120) + 5;
    setMinutes(newMinutes);
    dispatch({
      type: "SET_TIME_MINUTES",
      countdownMinutes: newMinutes,
    });
  }

  function decreaseMinutesChange() {
    const newMinutes = minutes === 5 ? 120 : minutes - 5;
    setMinutes(newMinutes);
    dispatch({
      type: "SET_TIME_MINUTES",
      countdownMinutes: newMinutes,
    });
  }

  return (
    <div id="set-timer-wrapper" className="mb-1 flex items-center">
      <span onClick={increaseMinutes} className="cursor-pointer pr-3">
        <FontAwesomeIcon icon="fa-solid fa-plus" />
      </span>
      <span className="cursor-pointer text-2xl tracking-wider">
        <FontAwesomeIcon icon="fa-solid fa-clock" />
        &ensp;
        {minutes}
      </span>
      <span onClick={decreaseMinutesChange} className="cursor-pointer pl-3">
        <FontAwesomeIcon icon="fa-solid fa-minus" />
      </span>
    </div>
  );
}

export default SetTimer;
