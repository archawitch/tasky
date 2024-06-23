import { useState, useEffect, useRef } from "react";
import { useTimer } from "../../context/TimerContext";
import ControlPanel from "./ControlPanel";
import ChangeVolume from "./ChangeVolume";
import Radios from "./Radios";

function MusicPlayer() {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(selectedRadio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRadioChanging, setIsRadioChanging] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [lastTimerStatus, setLastTimerStatus] = useState(null);
  const [isVolumeNormal, setIsVolumeNormal] = useState(true);
  const [isRadioOpened, setIsRadioOpened] = useState(false);
  const [radios, setRadios] = useState(getRadios());
  const timer = useTimer();

  // handle player manipulation
  useEffect(() => {
    if (isFirstRender || (isRadioChanging && radios.length >= 1)) {
      const createPlayer = () => {
        if (player) {
          player.destroy();
        }
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: "360",
          width: "640",
          videoId: radios[currentIndex].id,
          events: {
            onReady: (event) => {
              setPlayer(newPlayer);
              if (isRadioChanging) {
                event.target.playVideo();
                event.target.videoId = radios[currentIndex].id;
                setIsPlaying(true);
                setIsRadioChanging(false);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.seekTo(0);
                event.target.playVideo();
              }
            },
          },
        });
      };

      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        window.onYouTubeIframeAPIReady = createPlayer;
      }
    }

    // Clean up the player on unmount
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [currentIndex]);

  // handle selected radio changed
  useEffect(() => {
    if (currentIndex >= 0) {
      localStorage.setItem("selectedRadio", currentIndex);
    }
  }, [currentIndex]);

  // handle timer alarm
  useEffect(() => {
    // handle timer alarm
    if (timer.status !== lastTimerStatus) {
      if (
        timer.status === "countdown ended" ||
        timer.status === "break ended"
      ) {
        // if there is a player playing on the background then pause for a sec
        if (player && isPlaying) {
          player.pauseVideo();
          intervalRef.current = setInterval(() => {
            player.playVideo();
          }, 8000);
        }
      }
      setLastTimerStatus(timer.status);
    }

    if (isFirstRender) {
      setLastTimerStatus(timer.status);
      setIsFirstRender(false);
    }

    // Clean up the player on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.status]);

  // play the player
  const handlePlay = () => {
    if (player) {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  // pause the player
  const handlePause = () => {
    if (player) {
      player.pauseVideo();
      setIsPlaying(false);
    }
  };

  // move to next radio
  const handleForward = () => {
    if (player && radios.length > 1 && !isRadioChanging) {
      setCurrentIndex(
        currentIndex === radios.length - 1 ? 0 : currentIndex + 1,
      );
      setIsRadioChanging(true);
      setIsPlaying(false);
    }
  };

  // move to previous radio
  const handleBackward = () => {
    if (player && radios.length > 1 && !isRadioChanging) {
      setCurrentIndex(
        currentIndex === 0 ? radios.length - 1 : currentIndex - 1,
      );
      setIsRadioChanging(true);
      setIsPlaying(false);
    }
  };

  // change the radio to the selected radio
  const changeRadio = (index) => {
    if (player && !isRadioChanging) {
      setCurrentIndex(index);
      setIsRadioChanging(true);
      setIsPlaying(false);
    }
  };

  // handle volume changed
  const toggleVolumeMode = () => {
    if (player && !isRadioChanging) {
      setIsVolumeNormal(!isVolumeNormal);
    }
  };
  useEffect(() => {
    if (player) {
      player.setVolume(isVolumeNormal ? "100" : "25");
    }
  }, [isVolumeNormal, player]);

  // handle add/delete radio
  const addNewRadio = (id, name) => {
    const found = radios.filter((radio) => radio.id === id);
    if (found.length === 0) {
      setRadios(() => [
        ...radios,
        {
          id: id,
          name: name,
        },
      ]);
    }
  };
  const deleteRadio = (deletedIndex) => {
    setRadios(() => {
      return radios.filter((radio, index) => {
        return index !== deletedIndex;
      });
    });
    if (deletedIndex < currentIndex) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  useEffect(() => {
    if (radios) {
      localStorage.setItem("radios", JSON.stringify(radios));
    }
  }, [radios]);

  return (
    <>
      <div
        onMouseEnter={() => {
          setIsHover(true);
          clearTimeout(transitionTimeoutRef.current);
        }}
        onMouseLeave={() => {
          setIsHover(false);
          transitionTimeoutRef.current = setTimeout(() => {
            setIsRadioOpened(false);
          }, 2000);
        }}
        onClick={() => setIsRadioOpened(!isRadioOpened)}
        style={{
          zIndex: isHover || isRadioOpened ? "50" : "0",
          opacity: isHover ? "1" : "0",
          transitionDelay: isHover ? "0ms" : null,
          transitionDuration: isRadioOpened ? "500ms" : "315ms",
          width: isRadioOpened ? "15rem" : "10rem",
        }}
        className="relative mr-12 max-w-52 cursor-pointer items-center justify-center rounded-xl bg-neutral-700/80 bg-cover px-6 pb-1 pt-2 transition-all duration-500 [transition-delay:7s,0ms] [transition-property:opacity,width]"
      >
        <div className="hidden" ref={playerRef} id="player"></div>
        <div
          style={{
            opacity: isHover ? "1" : "0",
            transitionDelay: isHover ? "0ms" : "7000ms",
            transitionDuration: isRadioOpened ? "500ms" : "300ms",
          }}
          className="flex w-full flex-col items-center transition-all delay-200 duration-200"
        >
          <div className="flex w-full justify-center text-center font-mono text-[0.6rem]">
            <span className="overflow-hidden text-ellipsis text-nowrap">
              {radios[currentIndex].name}
            </span>
            {isPlaying && (
              <ChangeVolume
                isNormal={isVolumeNormal}
                toggleVolume={toggleVolumeMode}
              ></ChangeVolume>
            )}
          </div>
          <ControlPanel
            handlePlay={handlePlay}
            handlePause={handlePause}
            handleForward={handleForward}
            handleBackward={handleBackward}
            isPlaying={isPlaying}
          ></ControlPanel>
        </div>
        <hr
          style={{
            opacity: isRadioOpened ? "1" : "0",
            marginTop: isRadioOpened ? "0.25rem" : "0",
            transitionDelay: isRadioOpened ? "150ms" : "0ms",
            transitionDuration: isRadioOpened ? "150ms" : "0ms",
          }}
          className="border-neutral-200 transition-opacity"
        />
        <Radios
          visible={isRadioOpened}
          radios={radios}
          selectedRadio={currentIndex}
          changeRadio={changeRadio}
          addNewRadio={addNewRadio}
          deleteRadio={deleteRadio}
        ></Radios>
      </div>
    </>
  );
}

export default MusicPlayer;

// RADIOS
const getRadios = () => {
  const radios = localStorage.getItem("radios");
  if (radios) {
    return JSON.parse(radios);
  } else {
    localStorage.setItem("radios", JSON.stringify(providedRadios));
    return providedRadios;
  }
};
const selectedRadio = () => {
  const selectedIndex = localStorage.getItem("selectedRadio");
  if (selectedIndex) {
    return Number(selectedIndex);
  } else {
    return 0;
  }
};
const providedRadios = [
  {
    id: "xU6MdIBl2uI",
    name: "The Summer We Fell In Love",
  },
  {
    id: "2NWJexn0kRs",
    name: "Just The Two Of Us",
  },
  {
    id: "jfKfPfyJRdk",
    name: "Lofi",
  },
  {
    id: "3tQs6l4d8hM",
    name: "Classical",
  },
  {
    id: "0vSifZ4jprA",
    name: "Jazz",
  },
  {
    id: "TUd0g6Zz0Ho",
    name: "Olivia Rodrigo",
  },
  {
    id: "YS8Vi_chlxc",
    name: "Taylor Swift",
  },
  {
    id: "-SEJBvptqug",
    name: "King of Convenience",
  },
  {
    id: "imSE0ItyRFc",
    name: "Japanese Folk",
  },
  {
    id: "Oh9VcdqC5Ok",
    name: "Japanese Indie",
  },
  {
    id: "LGK3NSrpIVk",
    name: "summer like bubble gum ‧₊˚",
  },
];
