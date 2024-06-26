import Clock from "./Clock";
import OpenTodoButton from "../todo/OpenTodoButton";
import SettingsButton from "./SettingsButton";
import MusicPlayer from "../music-player/MusicPlayer";
import ShowStatsButton from "./ShowStatsButton";

function TopWrapper({
  isTimerCountdown,
  openTodoList,
  openSettings,
  openStats,
}) {
  const isLargeScreen = screen.width > 576 ? true : false;

  return (
    <>
      {isLargeScreen ? (
        <div className="flex h-14 items-start justify-between">
          <Clock></Clock>
          <MusicPlayer></MusicPlayer>
          <div className="flex items-center">
            <ShowStatsButton
              openStats={openStats}
              isTimerCountdown={isTimerCountdown}
            ></ShowStatsButton>
            <SettingsButton
              openSettings={openSettings}
              isTimerCountdown={isTimerCountdown}
            ></SettingsButton>
          </div>
        </div>
      ) : (
        <div className="flex h-14 items-start justify-between">
          <div className="pt-[0.5rem]">
            <OpenTodoButton openTodoList={openTodoList}></OpenTodoButton>
          </div>
          <SettingsButton
            openSettings={openSettings}
            isTimerCountdown={isTimerCountdown}
          ></SettingsButton>
        </div>
      )}
    </>
  );
}

export default TopWrapper;
