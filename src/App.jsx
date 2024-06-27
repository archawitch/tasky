import "./App.css";
import Main from "./components/main/Main";
import PreventSleep from "./components/PreventSleep";
import FullScreen from "./components/FullScreen";
import { PostProvider } from "./context/PostContext";
import { TimerProvider } from "./context/TimerContext";
import { SettingsProvider } from "./context/SettingsContext";
import { GroupProvider } from "./context/GroupOfPostContext";
import { ActivityProvider } from "./context/ActivityCalendarContext";
import { Suspense, useState, useEffect } from "react";

function App() {
  const isLargerScreen = screen.availWidth > 576;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLargerScreen) {
      const preventDefaultOnDrag = (event) => {
        event.preventDefault();
      };
      document.body.addEventListener("dragenter", preventDefaultOnDrag);
      document.body.addEventListener("dragover", preventDefaultOnDrag);
      document.body.style.overflow = "clip";
    }

    setIsLoading(false);
  }, []);

  return (
    <Suspense fallback={<div className="h-full w-full bg-black"></div>}>
      <SettingsProvider>
        <TimerProvider>
          <GroupProvider>
            <PostProvider>
              <ActivityProvider>
                <PreventSleep>
                  <div
                    style={{
                      opacity: isLoading ? "0" : "1",
                    }}
                    className="flex h-full w-full transition-opacity duration-500"
                  >
                    <FullScreen>
                      <Main></Main>
                    </FullScreen>
                  </div>
                </PreventSleep>
              </ActivityProvider>
            </PostProvider>
          </GroupProvider>
        </TimerProvider>
      </SettingsProvider>
    </Suspense>
  );
}

export default App;
