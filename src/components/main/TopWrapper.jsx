import Clock from "./Clock";
import OpenTodoButton from "../todo/OpenTodoButton";
import SettingsButton from "./SettingsButton";
import MusicPlayer from "../music-player/MusicPlayer";
import ShowStatsButton from "./ShowStatsButton";

function TopWrapper({
  isTodoVisible,
  isTimerCountdown,
  openTodoList,
  openSettings,
  openStats,
}) {
  const isLargeScreen = screen.width > 576 ? true : false;

  return (
    <div className="flex h-14 items-start justify-between">
      <Clock></Clock>
      {isLargeScreen && <MusicPlayer></MusicPlayer>}
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
      {(!isTodoVisible || !isLargeScreen) && (
        <div className="order-1 pt-[0.5rem] sm:order-2 md:hidden">
          <OpenTodoButton openTodoList={openTodoList}></OpenTodoButton>
        </div>
      )}
    </div>
  );
}

export default TopWrapper;
