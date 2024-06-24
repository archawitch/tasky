import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ShowStatsButton({ isTimerCountdown, openStats }) {
  return (
    <>
      {screen.width > 640 && (
        <button
          onClick={openStats}
          className="material-symbols-outlined mr-6 mt-[0.2rem] text-[1.7rem]"
          disabled={isTimerCountdown}
        >
          <FontAwesomeIcon icon="fa-solid fa-square-poll-vertical" />
        </button>
      )}
    </>
  );
}

export default ShowStatsButton;
