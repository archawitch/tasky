import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useSettings,
  useDispatchSettings,
} from "../../context/SettingsContext";
import ChangeBackground from "./ChangeBackground";

function Settings({ closeSettings }) {
  const settings = useSettings();
  const dispatch = useDispatchSettings();

  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-white/10 p-4 transition-all sm:px-[3rem] sm:py-[2.4rem]">
      <div className="flex w-full items-center justify-between">
        <button className="invisible text-lg">{true ? "EN" : "TH"}</button>
        <button onClick={closeSettings} className="text-2xl">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </div>
      <div className="invisible flex w-full flex-grow items-center justify-end">
        <div className="flex flex-col items-center justify-center text-sm">
          todo color
          <button className="mt-2 rounded-[0.25rem] border-2 border-neutral-200 bg-transparent px-10 py-2"></button>
          <button className="mt-2 rounded-[0.25rem] border-2 border-neutral-200 bg-pink-300/70 px-10 py-2"></button>
          <button className="mt-2 rounded-[0.25rem] border-2 border-neutral-200 bg-black/70 px-10 py-2"></button>
          <button className="mt-2 rounded-[0.25rem] border-2 border-neutral-200 bg-slate-500/70 px-10 py-2"></button>
        </div>
      </div>
      <ChangeBackground
        settings={settings}
        dispatch={dispatch}
      ></ChangeBackground>
    </div>
  );
}

export default Settings;
