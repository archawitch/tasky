import { forwardRef } from "react";
import "../../styles/checkbox.css";

const Checkbox = forwardRef(function Checkbox(
  { id, isChecked, onChange },
  ref,
) {
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
        className="transition-colors after:border-[#66676B]/80"
        htmlFor={`checkbox${id}`}
      ></label>
    </div>
  );
});

export default Checkbox;
