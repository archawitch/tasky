import { useTimer, useDispatchTimer } from "../../context/TimerContext";

function Choice() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();

  return (
    <div
      id="choice-wrapper"
      className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black/35"
    >
      {timer.isCountdown && (
        <button
          onClick={() => {
            dispatch({
              type: "RESUME_TIMER",
            });
          }}
          className="mb-6 text-2xl"
        >
          Continue
        </button>
      )}
      {!timer.isCountdown && (
        <button
          onClick={() => {
            dispatch({
              type: "START_TIMER",
              countdownMinutes: timer.countdownMinutes,
              breakMinutes: timer.breakMinutes,
            });
          }}
          className="mb-6 text-2xl"
        >
          Again
        </button>
      )}
      <button
        onClick={() => {
          dispatch({
            type: "END_SESSION",
          });
        }}
        className="text-2xl"
      >
        End
      </button>
    </div>
  );
}

export default Choice;
