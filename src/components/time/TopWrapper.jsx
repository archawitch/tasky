import Clock from "./Clock";
import SettingsButton from "./SettingsButton";

function TopWrapper() {
  return (
    <div className="flex justify-between">
      <Clock></Clock>
      <SettingsButton></SettingsButton>
    </div>
  );
}

export default TopWrapper;
