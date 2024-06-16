import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useSettings,
  useDispatchSettings,
} from "../../context/SettingsContext";
import { useRef } from "react";

function Settings({ closeSettings }) {
  const fileRef = useRef(null);
  const settings = useSettings();
  const dispatch = useDispatchSettings();

  const changeBackground = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch({
        type: "CHANGE_BACKGROUND_FROM_USER",
        userBackground: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => {
            dispatch({
              type: "CHANGE_BACKGROUND",
              selectedBackground:
                settings.selectedBackground === 0
                  ? 22
                  : (settings.selectedBackground - 1) % 21,
            });
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </button>
        <button onClick={() => fileRef.current.click()}>
          Change background
        </button>
        <input
          ref={fileRef}
          onChange={changeBackground}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
        ></input>
        <button
          onClick={() => {
            dispatch({
              type: "CHANGE_BACKGROUND",
              selectedBackground:
                settings.selectedBackground === 22
                  ? 0
                  : (settings.selectedBackground + 1) % 21,
            });
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
}

export default Settings;
