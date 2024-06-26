import { forwardRef } from "react";
import { useSettings } from "../../context/SettingsContext";
import "../../styles/checkbox.css";
import { hexToRgba } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Checkbox = forwardRef(function Checkbox(
  { id, isChecked, onChange },
  ref,
) {
  const settings = useSettings();
  const color =
    settings.selectedTodoColor !== "transparent"
      ? settings.selectedTodoColor
      : "#66676B";

  return (
    <div className="round">
      <input
        id={`checkbox${id}`}
        type="checkbox"
        ref={ref}
        checked={isChecked}
        onChange={onChange}
      />
      <label
        style={{}}
        className={`transition-colors after:border-transparent`}
        htmlFor={`checkbox${id}`}
      >
        <span
          style={{
            opacity: isChecked ? "1" : "0",
            color: isChecked ? hexToRgba(color, 0.8) : "transparent",
          }}
          className="flex h-full w-full items-center justify-center text-[0.65rem]"
        >
          <FontAwesomeIcon
            className="ml-[0.05rem] mt-[0.1rem]"
            icon="fa-solid fa-check"
          />
        </span>
      </label>
    </div>
  );
});

export default Checkbox;
