import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ControlPanel({
  handlePlay,
  handlePause,
  handleForward,
  handleBackward,
  isPlaying,
}) {
  return (
    <div className="mt-[0.1rem] flex">
      <button
        onKeyDown={(event) => event.target.blur()}
        onClick={handleBackward}
        className="z-10 mr-7 text-xs"
      >
        <FontAwesomeIcon icon="fa-solid fa-backward" />
      </button>
      {isPlaying ? (
        <button
          className="z-10 w-4 text-lg transition-all delay-150"
          onClick={handlePause}
          onKeyDown={(event) => event.target.blur()}
        >
          <FontAwesomeIcon className="mt-[0.35rem]" icon="fa-solid fa-pause" />
        </button>
      ) : (
        <button
          className="z-10 w-4 text-lg transition-all"
          onClick={handlePlay}
          onKeyDown={(event) => event.target.blur()}
        >
          <FontAwesomeIcon className="mt-[0.35rem]" icon="fa-solid fa-play" />
        </button>
      )}
      <button
        onKeyDown={(event) => event.target.blur()}
        onClick={handleForward}
        className="z-10 ml-7 text-xs"
      >
        <FontAwesomeIcon icon="fa-solid fa-forward" />
      </button>
    </div>
  );
}

export default ControlPanel;
