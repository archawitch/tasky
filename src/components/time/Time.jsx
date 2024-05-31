import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopWrapper from "./TopWrapper";

function Time() {
  return (
    <div className="flex h-full flex-col justify-between">
      <TopWrapper></TopWrapper>
      <div
        id="set-timer-wrapper"
        className="hidden flex-col items-center justify-center"
      >
        <div className="mb-2">
          <button className="mr-10">
            <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
          </button>
          <button>
            <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
          </button>
        </div>
        <div>
          <h1 className="text-3xl tracking-widest">00:40</h1>
        </div>
        <div className="mt-2">
          <button className="mr-10">
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          </button>
          <button>
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          </button>
        </div>
      </div>
      <div
        id="choice-wrapper"
        className="flex flex-col items-center justify-center"
      >
        <button className="mb-8">ต่อไป</button>
        <button className="mb-8">พัก</button>
        <button className="">จบ</button>
      </div>
      <div id="timer-wrapper" className="flex items-end justify-between">
        <div>
          <span
            style={{ lineHeight: "3rem" }}
            className="text-4xl tracking-wide"
          >
            00:30:00
          </span>
        </div>
        <div id="break" className="hidden text-right">
          <h3 className="text-l">พัก</h3>
          <h3 className="text-l">5 นาที</h3>
        </div>
        <div id="break" className="text-right">
          <h3 className="text-l">04</h3>
          <h3 className="text-l">59</h3>
        </div>
      </div>
      <div
        id="set-break-start-wrapper"
        className="hidden items-end justify-between"
      >
        <div>
          <span className="pr-4 text-xl">พัก 5 นาที</span>
          <FontAwesomeIcon className="pr-4" icon="fa-solid fa-plus" />
          <FontAwesomeIcon icon="fa-solid fa-minus" />
        </div>
        <div id="break" className="text-right">
          <button>
            <span className="pr-3 text-xl">เริ่ม</span>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Time;
