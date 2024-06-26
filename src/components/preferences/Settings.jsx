import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useSettings,
  useDispatchSettings,
} from "../../context/SettingsContext";
import ChangeBackground from "./ChangeBackground";
import ChangeTodoColor from "./ChangeTodoColor";
import ChangeLanguage from "./ChangeLanguage";

function Settings({ closeSettings }) {
  const settings = useSettings();
  const dispatch = useDispatchSettings();

  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-white/10 p-6 transition-all sm:px-[3rem] sm:py-[2.4rem]">
      <div className="flex w-full items-center justify-between">
        <ChangeLanguage lang={settings.lang}></ChangeLanguage>
        <button onClick={closeSettings} className="text-2xl">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </div>
      <div className="flex w-full flex-grow items-center justify-center sm:justify-end">
        <ChangeTodoColor></ChangeTodoColor>
      </div>
      <ChangeBackground
        settings={settings}
        dispatch={dispatch}
      ></ChangeBackground>
    </div>
  );
}

export default Settings;
