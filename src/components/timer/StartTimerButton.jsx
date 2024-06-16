import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTimer, useDispatchTimer } from "../../context/TimerContext";
import { getAlarmSound } from "../../utils/utils";
import { useEffect, useRef } from "react";

function StartTimerButton() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();
  const timerAudioRef = useRef(null);
  const breakAudioRef = useRef(null);

  useEffect(() => {
    if (timer.isCountdown && timer.timeLeft === 0) {
      console.log("timer alarm played!");
      timerAudioRef.current.play();
    } else if (timer.isBreak && timer.breakLeft === 0) {
      console.log("break alarm played!");
      breakAudioRef.current.play();
    }
  }, [timer.isCountdown, timer.timeLeft, timer.isBreak, timer.breakLeft]);

  return (
    <>
      <button
        onClick={() => {
          timerAudioRef.current.muted = false;
          breakAudioRef.current.muted = false;
          dispatch({
            type: "START_TIMER",
            countdownMinutes: timer.countdownMinutes,
            breakMinutes: timer.breakMinutes,
          });
        }}
      >
        <span className="pr-3 text-2xl">start</span>
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
      </button>
      <audio
        className="hidden"
        ref={timerAudioRef}
        src={getAlarmSound(0).url}
        muted
      />
      <audio
        className="hidden"
        ref={breakAudioRef}
        src={getAlarmSound(0).url}
        muted
      />
    </>
  );
}

export default StartTimerButton;
