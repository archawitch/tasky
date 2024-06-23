import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Radio({
  index,
  visible,
  radio,
  selectedRadio,
  changeRadio,
  deleteRadio,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const firstIndex = selectedRadio === 0 ? 1 : 0;

  return (
    <div
      key={radio.id}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        changeRadio(index);
        setIsHovered(false);
      }}
      style={{
        paddingTop: index === firstIndex ? "0.75rem" : null,
      }}
      className="flex w-full cursor-pointer items-center justify-center pt-2"
    >
      <div
        style={{
          opacity: isHovered ? "1" : "0",
        }}
        className="w-[1rem]"
      >
        <FontAwesomeIcon icon="fa-solid fa-caret-right" />
      </div>
      <button
        style={{
          opacity: visible ? "1" : "0",
          transitionDelay: visible ? "0ms" : "0ms",
          transitionDuration: visible ? "150ms" : "0ms",
        }}
        className="flex flex-grow justify-center overflow-hidden text-ellipsis"
      >
        <span className="overflow-hidden text-ellipsis text-nowrap">
          {radio.name}
        </span>
      </button>
      <button
        onClick={(event) => {
          event.stopPropagation();
          deleteRadio(index);
        }}
        style={{
          opacity: visible ? "1" : "0",
          transitionDelay: visible ? "0ms" : "0ms",
          transitionDuration: visible ? "150ms" : "0ms",
        }}
        className="flex"
      >
        <span
          style={{
            opacity: isHovered ? "1" : "0",
          }}
          className="w-[1rem] overflow-hidden text-ellipsis text-nowrap transition-colors duration-150 hover:text-neutral-300"
        >
          <FontAwesomeIcon icon="fa-solid fa-delete-left" />
        </span>
      </button>
    </div>
  );
}

export default Radio;
