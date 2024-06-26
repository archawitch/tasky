import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hexToRgba } from "../../utils/utils";
import { useEffect, useState } from "react";
import {
  useSettings,
  useDispatchSettings,
} from "../../context/SettingsContext";
import { BlockPicker } from "react-color";

function ChangeTodoColor() {
  const [colorToSet, setColorToSet] = useState(null);
  const [colorToSetIndex, setColorToSetIndex] = useState(null);
  const settings = useSettings();
  const dispatch = useDispatchSettings();

  const togglePicker = (index, color) => {
    if (colorToSetIndex === index) {
      setColorToSet(null);
      setColorToSetIndex(null);
    } else {
      setColorToSet(color);
      setColorToSetIndex(index);
    }
  };

  const addTodoColor = (newColor) => {
    if (colorToSetIndex && newColor) {
      dispatch({
        type: "ADD_TODO_COLOR",
        index: colorToSetIndex,
        newColor: newColor.hex,
      });
      setColorToSet(null);
      setColorToSetIndex(null);
    }
  };

  useEffect(() => {
    setColorToSet(null);
    setColorToSetIndex(null);
  }, [settings.selectedTodoColor]);

  return (
    <div className="flex items-end">
      {colorToSetIndex && colorToSetIndex !== 0 ? (
        <div className="pr-4">
          <BlockPicker
            triangle="hide"
            styles={{
              default: {
                input: {
                  backgroundColor: "transparent",
                },
              },
            }}
            color={colorToSet}
            colors={["#F99898", "#ff8a65", "#ba68c8", "#273b5d", "#66676B"]}
            className="rounded-full bg-slate-50 text-[0.6rem] font-normal"
            onChangeComplete={addTodoColor}
          ></BlockPicker>
        </div>
      ) : null}
      <div className="flex flex-col items-center justify-center text-sm">
        {settings.lang === "EN" ? "todo color" : "สีด้านข้าง"}
        {settings.todoColor
          .filter((color) => {
            if (screen.width >= 640) {
              return color || color == null;
            } else {
              return color !== "transparent";
            }
          })
          .map((color, index) => {
            return (
              <ChangeTodoItem
                key={index}
                index={index}
                color={color}
                selectedColor={settings.selectedTodoColor}
                setColor={togglePicker}
              ></ChangeTodoItem>
            );
          })}
      </div>
    </div>
  );
}

function ChangeTodoItem({ index, color, selectedColor, setColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatchSettings();
  return (
    <button
      onMouseLeave={(event) => {
        event.stopPropagation();
        if (color) {
          setIsHovered(false);
        }
      }}
      onClick={(event) => {
        event.stopPropagation();
        if (color) {
          dispatch({
            type: "CHANGE_TODO_COLOR",
            selectedColor: color,
          });
        }
      }}
      style={{
        backgroundColor: color != null ? hexToRgba(color, 0.9) : "transparent",
      }}
      className={`relative mt-2 flex w-24 justify-end rounded-[0.25rem] border-2 border-neutral-200 py-[0.15rem] hover:!text-white`}
    >
      {color ? (
        <>
          <span
            onMouseEnter={(event) => {
              event.stopPropagation();
              if (color) {
                setIsHovered(true);
              }
            }}
            style={{
              opacity: isHovered || color === selectedColor ? "1" : "0",
            }}
            className="absolute w-full flex-grow text-xs transition-opacity duration-100"
          >
            <FontAwesomeIcon icon="fa-solid fa-check" />
          </span>
          <span
            onMouseEnter={(event) => {
              event.stopPropagation();
              if (color) {
                setIsHovered(false);
              }
            }}
            onClick={(event) => {
              event.stopPropagation();
              setColor(index, color);
            }}
            className="z-10 h-full w-4 text-xs"
          >
            <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
          </span>
        </>
      ) : (
        <span
          onClick={(event) => {
            event.stopPropagation();
            setColor(index, "transparent");
          }}
          className="w-full text-xs"
        >
          <FontAwesomeIcon icon="fa-solid fa-add" />
        </span>
      )}
    </button>
  );
}

export default ChangeTodoColor;
