"use client";

import { Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const InstallButton = ({
  size,
}: {
  size: "sm" | "default" | "lg" | "xl" | "xxl" | "icon" | null | undefined;
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      const { outcome } = await (deferredPrompt as any).userChoice;
      setDeferredPrompt(null);
      setIsInstallable(false);
      console.log(`User response to the install prompt: ${outcome}`);
    }
  };

  return (
    <>
      {isInstallable && (
        <Button
          size={size}
          variant="secondary"
          onClick={handleInstallClick}
          className="install-button"
        >
          <Smartphone className="mr-2 h-5 w-5" />
          Install App (Auto)
        </Button>
      )}
    </>
  );
};

export default InstallButton;
