"use client";

import * as React from "react";
import { TimerConfig, TimerMode, CycleState } from "./types";
import { SettingsFormValues } from "./schema";
import { calculateProgress, getModePrefix, getNextModeInCycle } from "./utils";
import { SettingsDrawer } from "./settings-drawer";
import { TimerDisplay } from "./timer-display";
import useSound from "use-sound";

export const PomodoroTimer = () => {
  // Timer configuration in minutes
  const [timerConfig, setTimerConfig] = React.useState<TimerConfig>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    timerStyle: "animated",
    pomodorosPerCycle: 4,
    autoCycle: true,
    playSound: true,
  });

  const [timerStyle, setTimerStyle] = React.useState<string>(
    timerConfig.timerStyle
  );

  const [mode, setMode] = React.useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = React.useState<number>(
    timerConfig.pomodoro * 60
  );
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [key, setKey] = React.useState<number>(0); // Used to force reset timer
  const [progressInPercent, setProgressInPercent] = React.useState<number>(0);
  const [originalTitle, setOriginalTitle] = React.useState<string>("");

  // Track the current cycle state
  const [cycleState, setCycleState] = React.useState<CycleState>({
    currentPomodoro: 0,
    completedCycles: 0,
  });

  const [play] = useSound("/sounds/notification-up.mp3", {
    volume: 1,
  });

  // Function to handle settings form submission
  function onSettingsSubmit(data: SettingsFormValues) {
    setTimerConfig({
      pomodoro: data.pomodoro,
      shortBreak: data.shortBreak,
      longBreak: data.longBreak,
      timerStyle: data.timerStyle,
      pomodorosPerCycle: data.pomodorosPerCycle,
      autoCycle: data.autoCycle,
      playSound: data.playSound,
    });

    setTimerStyle(data.timerStyle);

    // Update current timer if needed
    if (mode === "pomodoro") {
      setTimeLeft(data.pomodoro * 60);
    } else if (mode === "shortBreak") {
      setTimeLeft(data.shortBreak * 60);
    } else if (mode === "longBreak") {
      setTimeLeft(data.longBreak * 60);
    }

    // Force effect to restart
    setKey((prevKey) => prevKey + 1);
  }

  // Update progress in percent
  React.useEffect(() => {
    setProgressInPercent(calculateProgress(timeLeft, mode, timerConfig));
  }, [timeLeft, mode, timerConfig]);

  // Move to next mode in the cycle
  const moveToNextMode = React.useCallback(() => {
    const { nextMode, nextCycleState } = getNextModeInCycle(
      mode,
      cycleState,
      timerConfig
    );

    // Update the cycle state
    setCycleState(nextCycleState);

    // Change to the next mode
    setMode(nextMode);
    setTimeLeft(timerConfig[nextMode] * 60);

    // Auto-start the next timer if configured
    setIsActive(timerConfig.autoCycle);

    // Force effect to restart
    setKey((prevKey) => prevKey + 1);
  }, [mode, cycleState, timerConfig]);

  // Handle manual mode change (user clicked)
  const changeMode = (newMode: TimerMode) => {
    // Reset the cycle tracking if manually changing modes
    if (newMode === "pomodoro" && mode !== "pomodoro") {
      setCycleState({
        currentPomodoro: 0,
        completedCycles: cycleState.completedCycles,
      });
    }

    setMode(newMode);
    setTimeLeft(timerConfig[newMode] * 60);
    setIsActive(false);
    setKey((prevKey) => prevKey + 1); // Force effect to restart
  };

  // Toggle timer between active/paused
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset the current timer
  const resetTimer = () => {
    setTimeLeft(timerConfig[mode] * 60);
    setIsActive(false);
  };

  // Timer countdown effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      setIsActive(false);
      play(); // Play sound when timer completes

      // Schedule move to next mode after a short delay to allow sound to play
      const timeoutId = setTimeout(() => {
        moveToNextMode();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, key, play, moveToNextMode]);

  // Capture the original document title when component mounts
  React.useEffect(() => {
    const title = document.title;
    setOriginalTitle(title);
  }, []);

  // Update the document title when timer is active
  React.useEffect(() => {
    if (isActive && timeLeft > 0) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      const modePrefix = getModePrefix(mode);
      document.title = `${modePrefix} ${formattedTime} - Pomodoro Timer`;
    } else if (!isActive) {
      // Reset title when timer is paused
      if (originalTitle) {
        document.title = originalTitle;
      }
    }
  }, [timeLeft, isActive, mode, originalTitle]);

  return (
    <div className="py-10 container mx-auto max-w-4xl relative z-10">
      {/* Backdrop overlay when timer is active */}
      {isActive && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20"
          style={{ pointerEvents: "none" }}
        />
      )}

      <div className="min-h-[500px] max-w-[500px] mx-auto">
        <div className="mb-4 flex items-center justify-between gap-2 ">
          <div className="text-sm text-muted-foreground">
            {mode === "pomodoro" && (
              <span>
                Pomodoro {cycleState.currentPomodoro + 1}/
                {timerConfig.pomodorosPerCycle} • Cycle{" "}
                {cycleState.completedCycles + 1}
              </span>
            )}
          </div>
          <SettingsDrawer
            timerConfig={timerConfig}
            onSettingsSave={onSettingsSubmit}
          />
        </div>

        <TimerDisplay
          mode={mode}
          timeLeft={timeLeft}
          timerConfig={timerConfig}
          timerStyle={timerStyle}
          progressInPercent={progressInPercent}
          isActive={isActive}
          onModeChange={changeMode}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
        />

        <div className="mt-2">
          <button onClick={() => play()}>Play</button>
          <p className="text-muted-foreground text-xs">
            Pomodoro Timer is a productivity technique that uses a timer to
            break work into intervals, traditionally 25 minutes in length,
            separated by short breaks. The method is named after the Italian
            word for &quot;tomato,&quot; after the tomato-shaped kitchen timer
            used by Francesco Cirillo, who developed the technique in the late
            1980s.
          </p>
        </div>
      </div>
    </div>
  );
};
