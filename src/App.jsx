import "./App.css";
import Main from "./components/main/Main";
import PreventSleep from "./components/PreventSleep";
import { PostProvider } from "./context/PostContext";
import { TimerProvider } from "./context/TimerContext";
import { SettingsProvider } from "./context/SettingsContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const preventDefaultOnDrag = (event) => {
      event.preventDefault();
    };
    document.body.addEventListener("dragenter", preventDefaultOnDrag);
    document.body.addEventListener("dragover", preventDefaultOnDrag);
    document.body.style.overflow = "clip";
  }, []);

  return (
    <SettingsProvider>
      <TimerProvider>
        <PostProvider>
          <PreventSleep>
            <Main></Main>
          </PreventSleep>
        </PostProvider>
      </TimerProvider>
    </SettingsProvider>
  );
}

export default App;
