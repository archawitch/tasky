import { useState, useEffect, useRef } from "react";
import { useTimer } from "../../context/TimerContext";
import ControlPanel from "./ControlPanel";

function MusicPlayer() {
  const isVisible = screen.width > 576 ? true : false;
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(selectedRadio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRadioChanging, setIsRadioChanging] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [lastTimerStatus, setLastTimerStatus] = useState(null);
  const timer = useTimer();

  useEffect(() => {
    if (isVisible) {
      if (isFirstRender || isRadioChanging) {
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

        localStorage.setItem("selectedRadio", currentIndex);
      }

      // handle timer alarm
      let handleTimer = false;
      if (!isFirstRender || timer.status !== lastTimerStatus) {
        handleTimer = true;
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
        if (player && !handleTimer) {
          player.destroy();
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [currentIndex, timer.status]);

  const handlePlay = () => {
    if (player) {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (player) {
      player.pauseVideo();
      setIsPlaying(false);
    }
  };

  const handleForward = () => {
    if (player && !isRadioChanging) {
      setCurrentIndex(
        currentIndex === radios.length - 1 ? 0 : currentIndex + 1,
      );
      setIsRadioChanging(true);
      setIsPlaying(false);
    }
  };

  const handleBackward = () => {
    if (player && !isRadioChanging) {
      setCurrentIndex(
        currentIndex === 0 ? radios.length - 1 : currentIndex - 1,
      );
      setIsRadioChanging(true);
      setIsPlaying(false);
    }
  };

  return (
    <>
      {isVisible && (
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{
            opacity: isHover ? "1" : "0",
            transitionDelay: isHover ? "0ms" : "7000ms",
          }}
          className="relative mr-12 flex max-w-52 cursor-pointer items-center justify-center rounded-xl bg-neutral-200/50 bg-cover px-6 pb-1 pt-2 transition-all duration-200"
        >
          <div className="hidden" ref={playerRef} id="player"></div>
          <div
            style={{
              opacity: isHover ? "1" : "0",
              transitionDelay: isHover ? "0ms" : "7000ms",
            }}
            className="flex w-full flex-col items-center transition-all delay-200 duration-200"
          >
            <span className="w-full overflow-hidden text-ellipsis text-nowrap text-center font-mono text-[0.6rem]">
              <span>{radios[currentIndex].name}</span>
            </span>
            <ControlPanel
              handlePlay={handlePlay}
              handlePause={handlePause}
              handleForward={handleForward}
              handleBackward={handleBackward}
              isPlaying={isPlaying}
            ></ControlPanel>
          </div>
        </div>
      )}
    </>
  );
}

export default MusicPlayer;

const radios = [
  {
    id: "xU6MdIBl2uI",
    name: "The Summer We Fell In Love",
  },
  {
    id: "2NWJexn0kRs",
    name: "Just The Two Of Us",
  },
  {
    id: "bQJCD93Im7s",
    name: "Lovewave -`♡´-",
  },
  {
    id: "imSE0ItyRFc",
    name: "Japanese Folk 1",
  },
  {
    id: "Doa-QlSAvLg",
    name: "Japanese Folk 2",
  },
  {
    id: "vBUhgkMD5kc",
    name: "Japanese Folk 3",
  },
  {
    id: "JLs8-bWuHyk",
    name: "Japanese Indie 1",
  },
  {
    id: "Oh9VcdqC5Ok",
    name: "Japanese Indie 2",
  },
  {
    id: "XPKpOBGsoOs",
    name: "Jazz 1",
  },
  {
    id: "0vSifZ4jprA",
    name: "Jazz 2",
  },
  {
    id: "j9RYM83nMmA",
    name: "Jazz 3",
  },
  {
    id: "_sI_Ps7JSEk",
    name: "Jazz 4",
  },
  {
    id: "xMVaEnw5kpk",
    name: "lofi (Nujabes)",
  },
  {
    id: "jfKfPfyJRdk",
    name: "lofi girl (radio)",
  },
  {
    id: "mIYzp5rcTvU",
    name: "Classical 1",
  },
  {
    id: "3tQs6l4d8hM",
    name: "Classical 2 (Ravel)",
  },
  {
    id: "4bGkGwbqQS4",
    name: "Parannoul 𓇢𓆸",
  },
  {
    id: "5CQ_iInQnWQ",
    name: "Wave To Earth",
  },
  {
    id: "TUd0g6Zz0Ho",
    name: "Olivia Rodrigo",
  },
  {
    id: "YS8Vi_chlxc",
    name: "Taylor Swift 1",
  },
  {
    id: "6K4yr7xsVfc",
    name: "Taylor Swift 2",
  },
  {
    id: "BeuNGUHrNeo",
    name: "Somewhere in Northern Italy",
  },
  {
    id: "-SEJBvptqug",
    name: "King of Convenience",
  },
  {
    id: "LGK3NSrpIVk",
    name: "Kpop 1",
  },
  {
    id: "sPCSs0dXQNs",
    name: "our story",
  },
  {
    id: "Kn6ZDpLBUi4",
    name: "memories of summer",
  },
  {
    id: "maVxoI9UJik",
    name: "still life",
  },
  {
    id: "P6yq-HfwnFc",
    name: "last days",
  },
  {
    id: "OSC3yUxm-9s",
    name: "daydream",
  },
  {
    id: "sgSiSnE9Avs",
    name: "simple joys",
  },
];
const selectedRadio = () => {
  const selectedIndex = localStorage.getItem("selectedRadio");
  if (selectedIndex) {
    return Number(selectedIndex);
  } else {
    return 0;
  }
};
