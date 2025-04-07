import { z } from "zod";

// Define the zod schema for settings form
export const settingsFormSchema = z.object({
  pomodoro: z.number().min(1).max(60),
  shortBreak: z.number().min(1).max(30),
  longBreak: z.number().min(1).max(60),
  timerStyle: z.enum(["classic", "animated"]),
  // New fields for cycle settings
  pomodorosPerCycle: z.number().min(1).max(10),
  autoCycle: z.boolean(),
  playSound: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
