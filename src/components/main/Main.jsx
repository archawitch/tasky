import TopWrapper from "./TopWrapper";
import Timer from "../timer/Timer";
import TimerSettings from "../timer/TimerSettings";
import MiddleWrapper from "./MiddleWrapper";
import PostList from "../post-it/PostList";
import TodoList from "../todo/TodoList";
import { TodoListProvider } from "../../context/TodoListContext";
import { useState, useEffect } from "react";
import { useTimer } from "../../context/TimerContext";
import { useSettings, getBackground } from "../../context/SettingsContext";
import Choice from "../timer/Choice";
import Settings from "../preferences/Settings";
import GroupBar from "../post-it/GroupBar";

function Main() {
  const [isTodoVisible, setIsTodoVisible] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const timer = useTimer();
  const settings = useSettings();

  const openTodoList = () => {
    setIsTodoVisible(true);
    localStorage.setItem("isTodoVisible", true);
  };
  const closeTodoList = () => {
    setIsTodoVisible(false);
    localStorage.setItem("isTodoVisible", false);
  };
  const openSettings = () => {
    setIsSettings(true);
  };
  const closeSettings = () => {
    setIsSettings(false);
  };

  useEffect(() => {
    const savedIsTodoVisible = localStorage.getItem("isTodoVisible");
    if (savedIsTodoVisible != null) {
      setIsTodoVisible(savedIsTodoVisible === "true");
    } else {
      setIsTodoVisible(true);
    }
    if (settings.backgroundFrom === "system") {
      const backgroundImage = getBackground(settings.selectedBackground);
      document.getElementById("background").style.backgroundImage =
        backgroundImage;
    } else {
      document.getElementById("background").style.backgroundImage =
        `url("${settings.userBackground}")`;
    }
  }, [settings.selectedBackground, settings.userBackground]);

  return (
    <>
      <div
        id="main"
        style={{
          display: isSettings ? "none" : "flex",
        }}
        className="flex h-full"
      >
        <div
          style={{
            width: isTodoVisible ? "auto" : "100%",
          }}
          className="flex h-full flex-grow flex-col justify-between p-5 sm:px-[3rem] sm:py-[2.4rem]"
        >
          <TopWrapper
            isTodoVisible={isTodoVisible}
            isTimerCountdown={timer.isCountdown}
            openTodoList={openTodoList}
            openSettings={openSettings}
          ></TopWrapper>
          <MiddleWrapper
            isTodoVisible={isTodoVisible}
            openTodoList={openTodoList}
          ></MiddleWrapper>
          <Timer></Timer>
          <TimerSettings></TimerSettings>
        </div>
        <TodoListProvider>
          <TodoList
            isVisible={isTodoVisible}
            closeTodoList={closeTodoList}
          ></TodoList>
        </TodoListProvider>
        <GroupBar></GroupBar>
      </div>
      {!isSettings && <PostList></PostList>}
      {timer.isPause && !isSettings && <Choice></Choice>}
      {isSettings && (
        <Settings isVisible={isSettings} closeSettings={closeSettings} />
      )}
    </>
  );
}

export default Main;
