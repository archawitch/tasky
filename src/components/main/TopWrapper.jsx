import Clock from "./Clock";
import OpenTodoButton from "../todo/OpenTodoButton";
import SettingsButton from "./SettingsButton";
import MusicPlayer from "./MusicPlayer";

function TopWrapper({
  isTodoVisible,
  isTimerCountdown,
  openTodoList,
  openSettings,
}) {
  return (
    <div className="flex items-center justify-between">
      <Clock></Clock>
      <MusicPlayer></MusicPlayer>
      <SettingsButton
        openSettings={openSettings}
        isTimerCountdown={isTimerCountdown}
      ></SettingsButton>
      <div className="block pt-[0.5rem] md:hidden">
        {!isTodoVisible && (
          <OpenTodoButton openTodoList={openTodoList}></OpenTodoButton>
        )}
      </div>
    </div>
  );
}

export default TopWrapper;
