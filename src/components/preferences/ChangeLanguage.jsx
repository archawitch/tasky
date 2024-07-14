import { useDispatchSettings } from "../../context/SettingsContext";

function ChangeLanguage({ lang }) {
  const dispatch = useDispatchSettings();

  return (
    <div className="text-lg font-normal">
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch({
            type: "CHANGE_LANGUAGE",
            lang: "EN",
          });
        }}
        style={{
          fontWeight: lang === "EN" ? "bold" : "normal",
        }}
        className="hover:!text-white"
      >
        EN
      </button>
      <span className="mx-2 text-base">|</span>
      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch({
            type: "CHANGE_LANGUAGE",
            lang: "TH",
          });
        }}
        style={{
          fontWeight: lang === "TH" ? "bold" : "normal",
        }}
        className="hover:!text-white"
      >
        TH
      </button>
    </div>
  );
}

export default ChangeLanguage;
