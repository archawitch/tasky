import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddNewRadio from "./AddNewRadio";
import { useState } from "react";
import Radio from "./Radio";

function Radios({
  visible,
  radios,
  changeRadio,
  selectedRadio,
  addNewRadio,
  deleteRadio,
}) {
  return (
    <div
      style={{
        height: visible ? "9rem" : "0",
      }}
      className="flex w-full flex-col font-mono text-[0.5rem] transition-all duration-[300ms]"
    >
      <div className="scrollable flex w-full flex-col items-center overflow-hidden overflow-y-auto font-mono text-[0.5rem] transition-all duration-0">
        {radios &&
          radios.length > 0 &&
          radios
            .map((radio, index) => {
              return (
                <Radio
                  key={radio.id}
                  index={index}
                  visible={visible}
                  radio={radio}
                  selectedRadio={selectedRadio}
                  changeRadio={changeRadio}
                  deleteRadio={deleteRadio}
                ></Radio>
              );
            })
            .filter((radio, index) => index !== selectedRadio)}
      </div>
      <AddNewRadio visible={visible} addNewRadio={addNewRadio}></AddNewRadio>
    </div>
  );
}

export default Radios;
