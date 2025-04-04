"use client";

import { useEffect } from "react";

export const RegisterWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.error("Service worker registration failed:", err);
      });
    }
  }, []);

  return <div />;
};
