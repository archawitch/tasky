import "./App.css";
import Main from "./components/main/Main";
import PreventSleep from "./components/PreventSleep";
import FullScreen from "./components/FullScreen";
import { PostProvider } from "./context/PostContext";
import { TimerProvider } from "./context/TimerContext";
import { SettingsProvider } from "./context/SettingsContext";
import { GroupProvider } from "./context/GroupOfPostContext";
import { ActivityProvider } from "./context/ActivityCalendarContext";
import { useEffect } from "react";

function App() {
  const isLargerScreen = screen.availWidth > 576;
  useEffect(() => {
    if (isLargerScreen) {
      const preventDefaultOnDrag = (event) => {
        event.preventDefault();
      };
      document.body.addEventListener("dragenter", preventDefaultOnDrag);
      document.body.addEventListener("dragover", preventDefaultOnDrag);
      document.body.style.overflow = "clip";
    }
  }, []);

  return (
    <SettingsProvider>
      <TimerProvider>
        <GroupProvider>
          <PostProvider>
            <ActivityProvider>
              <PreventSleep>
                <FullScreen>
                  <Main></Main>
                </FullScreen>
              </PreventSleep>
            </ActivityProvider>
          </PostProvider>
        </GroupProvider>
      </TimerProvider>
    </SettingsProvider>
  );
}

export default App;
