export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

export interface TimerConfig {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  timerStyle: "classic" | "animated";
  // New fields for cycle settings
  pomodorosPerCycle: number;
  autoCycle: boolean;
  playSound: boolean;
}

export interface CycleState {
  currentPomodoro: number;
  completedCycles: number;
}
