import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChangeVolume({ isNormal, toggleVolume }) {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        toggleVolume(event);
      }}
      className="ml-2 w-[1rem]"
    >
      {isNormal ? (
        <FontAwesomeIcon icon="fa-solid fa-volume-high" />
      ) : (
        <FontAwesomeIcon icon="fa-solid fa-volume-low" />
      )}
    </button>
  );
}

export default ChangeVolume;
