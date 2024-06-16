import React, { useEffect } from "react";

const PreventSleep = ({ children }) => {
  useEffect(() => {
    const preventSleep = async () => {
      try {
        if ("wakeLock" in navigator) {
          const wakeLock = await navigator.wakeLock.request("screen");
          // Optionally, you can perform additional actions when wake lock is active
        } else {
          console.warn("Wake lock API is not supported by this browser.");
        }
      } catch (error) {
        console.error("Failed to request wake lock:", error);
      }
    };

    preventSleep();
  }, []);

  return <>{children}</>;
};

export default PreventSleep;
