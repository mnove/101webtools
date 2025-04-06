import { TimerMode, TimerConfig, CycleState } from "./types";

// Format time as MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// Calculate hours, minutes, seconds from total seconds
export const calculateTimeUnits = (timeLeft: number) => {
  const hh = Math.floor(timeLeft / 3600);
  const mm = Math.floor((timeLeft % 3600) / 60);
  const ss = timeLeft % 60;
  return { hh, mm, ss };
};

// Calculate progress percentage
export const calculateProgress = (
  timeLeft: number,
  mode: TimerMode,
  timerConfig: TimerConfig
) => {
  const totalTime = timerConfig[mode] * 60;
  return ((totalTime - timeLeft) / totalTime) * 100;
};

// Get mode prefix for document title
export const getModePrefix = (mode: TimerMode): string => {
  return mode === "pomodoro" ? "🍅" : mode === "shortBreak" ? "☕️" : "🌴";
};

// Determine the next mode in the Pomodoro cycle
export const getNextModeInCycle = (
  currentMode: TimerMode,
  cycleState: CycleState,
  timerConfig: TimerConfig
): { nextMode: TimerMode; nextCycleState: CycleState } => {
  const nextCycleState = { ...cycleState };

  let nextMode: TimerMode;

  if (currentMode === "pomodoro") {
    // Just completed a pomodoro
    nextCycleState.currentPomodoro += 1;

    // Check if we've completed a full cycle of pomodoros
    if (nextCycleState.currentPomodoro >= timerConfig.pomodorosPerCycle) {
      nextMode = "longBreak";
      // Reset for next cycle
      nextCycleState.currentPomodoro = 0;
      nextCycleState.completedCycles += 1;
    } else {
      // Short break after each pomodoro except the last one in the cycle
      nextMode = "shortBreak";
    }
  } else if (currentMode === "shortBreak") {
    // After a short break, start another pomodoro
    nextMode = "pomodoro";
  } else {
    // After a long break, start a new cycle with a pomodoro
    nextMode = "pomodoro";
  }

  return { nextMode, nextCycleState };
};
