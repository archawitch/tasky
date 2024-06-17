import { useTimer, useDispatchTimer } from "../../context/TimerContext";

function Choice() {
  const timer = useTimer();
  const dispatch = useDispatchTimer();

  return (
    <div
      id="choice-wrapper"
      className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black/35"
    >
      {timer.status === "countdown" && (
        <button
          onClick={() => {
            dispatch({
              type: "RESUME_TIMER",
            });
          }}
          className="mb-8 text-2xl"
        >
          Continue
        </button>
      )}
      {timer.status === "countdown ended" && (
        <button
          onClick={() => {
            // start the break
            dispatch({
              type: "START_BREAK",
            });
          }}
          className="mb-8 text-2xl"
        >
          Break
        </button>
      )}
      {(timer.status === "countdown ended" ||
        timer.status === "break ended") && (
        <button
          onClick={() => {
            dispatch({
              type: "START_TIMER",
              countdownMinutes: timer.countdownMinutes,
              breakMinutes: timer.breakMinutes,
            });
          }}
          className="mb-8 text-2xl"
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
