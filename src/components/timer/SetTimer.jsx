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

  function handleMinutesChange() {
    const newMinutes = (minutes % 120) + 5;
    setMinutes(newMinutes);
    dispatch({
      type: "SET_TIME_MINUTES",
      countdownMinutes: newMinutes,
    });
  }

  return (
    <div id="set-timer-wrapper" className="mb-1">
      <span
        onClick={handleMinutesChange}
        className="cursor-pointer text-2xl tracking-wider"
      >
        <FontAwesomeIcon icon="fa-solid fa-clock" />
        &ensp;
        {minutes}
      </span>
    </div>
  );
}

export default SetTimer;
