"use client";
import { useEffect, useState } from "react";

const validPlatforms = ["android", "android_x", "ios", ""];

const isTouchDevice = () => {
  if (typeof window === "undefined") return false;

  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const isValidResolution = () => {
  if (typeof window === "undefined") return false;
  return window.screen.width <= 1366;
};

/** NOT WORKING ON ANDROID */
// const isMobileDevice = () => {
//   if (typeof window === "undefined") return false;
//   const userAgent = navigator.userAgent || navigator.vendor;
//   return /android|iPad|iPhone|iPod/.test(userAgent);
// };

const useValidatePlatform = () => {
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = window.Telegram?.WebApp?.platform || "unknown";

      const valid =
        validPlatforms.includes(platform) &&
        isTouchDevice() &&
        isValidResolution();

      setIsValid(valid);
    }
  }, []);

  return isValid;
};

export default useValidatePlatform;
