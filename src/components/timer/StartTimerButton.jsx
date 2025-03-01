import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { useSettings } from "../../context/SettingsContext";

function StartTimerButton() {
  const settings = useSettings();
  const timer = useTimer();
  const dispatch = useDispatchTimer();

  return (
    <div className="flex w-[10rem] items-center justify-end">
      <button
        className="z-10"
        onClick={() => {
          dispatch({
            type: "START_TIMER",
            countdownMinutes: timer.countdownMinutes,
            breakMinutes: timer.breakMinutes,
          });
        }}
      >
        <span className="pr-3 text-2xl">
          {settings.lang === "EN" ? "start" : "เริ่ม"}
        </span>
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
      </button>
    </div>
  );
}

export default StartTimerButton;
