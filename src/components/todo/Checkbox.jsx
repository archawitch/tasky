import { forwardRef, useEffect, useRef } from "react";
import "../../styles/checkbox.css";
import { useDispatchTodoList } from "../../context/TodoListContext";

const Checkbox = forwardRef(function Checkbox(
  { id, isChecked, onChange },
  ref,
) {
  const dispatch = useDispatchTodoList();

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
