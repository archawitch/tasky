import "./App.css";
import Main from "./components/main/Main";
import PreventSleep from "./components/PreventSleep";
import FullScreen from "./components/FullScreen";
import { PostProvider } from "./context/PostContext";
import { TimerProvider } from "./context/TimerContext";
import { SettingsProvider } from "./context/SettingsContext";
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
    <>
      {!isLargerScreen ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-stone-800 font-mono text-[18px]">
          <div className="flex flex-col items-center gap-2 border-2 border-white bg-stone-800 px-5 py-4">
            <span>Tasky is in development</span>
            <span>for mobile devices!</span>
          </div>
        </div>
      ) : (
        <>
          <SettingsProvider>
            <TimerProvider>
              <PostProvider>
                <PreventSleep>
                  <FullScreen>
                    <Main></Main>
                  </FullScreen>
                </PreventSleep>
              </PostProvider>
            </TimerProvider>
          </SettingsProvider>
        </>
      )}
    </>
  );
}

export default App;
