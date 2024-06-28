import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SettingsButton({ openSettings }) {
  return (
    <button
      onClick={openSettings}
      className="material-symbols-outlined text-2xl"
    >
      <FontAwesomeIcon icon="fa-solid fa-gear" />
    </button>
  );
}

export default SettingsButton;
