import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";

function FullScreen({ children }) {
  const ref = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const requestFullScreen = () => {
    if (ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen();
      } else if (ref.current.mozRequestFullScreen) {
        /* Firefox */
        ref.current.mozRequestFullScreen();
      } else if (ref.current.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        ref.current.webkitRequestFullscreen();
      } else if (ref.current.msRequestFullscreen) {
        /* IE/Edge */
        ref.current.msRequestFullscreen();
      }
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement === ref.current);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange,
      );
    };
  }, []);

  return (
    <div id="background" className="h-full" ref={ref}>
      <div className="absolute right-0 hidden text-[0.6rem] opacity-0 transition-all delay-75 sm:block sm:hover:opacity-100">
        {!isFullScreen ? (
          <button onClick={requestFullScreen}>
            <FontAwesomeIcon icon="fa-solid fa-up-right-and-down-left-from-center" />
          </button>
        ) : (
          <button onClick={exitFullScreen}>
            <FontAwesomeIcon icon="fa-solid fa-down-left-and-up-right-to-center" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export default FullScreen;
