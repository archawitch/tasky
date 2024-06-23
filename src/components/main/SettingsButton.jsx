import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SettingsButton({ isTimerCountdown, openSettings }) {
  return (
    <button
      onClick={openSettings}
      className="material-symbols-outlined order-2 text-2xl"
      disabled={isTimerCountdown}
    >
      <FontAwesomeIcon icon="fa-solid fa-gear" />
    </button>
  );
}

export default SettingsButton;
