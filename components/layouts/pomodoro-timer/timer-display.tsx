"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Play, Pause, RefreshCw } from "lucide-react";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { TimerMode, TimerConfig } from "./types";
import { formatTime } from "./utils";

interface TimerDisplayProps {
  mode: TimerMode;
  timeLeft: number;
  timerConfig: TimerConfig;
  timerStyle: string;
  progressInPercent: number;
  isActive: boolean;
  onModeChange: (mode: TimerMode) => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

export const TimerDisplay = ({
  mode,
  timeLeft,
  timerConfig,
  timerStyle,
  progressInPercent,
  isActive,
  onModeChange,
  onToggleTimer,
  onResetTimer,
}: TimerDisplayProps) => {
  const hh = Math.floor(timeLeft / 3600);
  const mm = Math.floor((timeLeft % 3600) / 60);
  const ss = timeLeft % 60;

  return (
    <div
      className={cn(
        "border min-h-[500px] max-w-[500px] mx-auto rounded-lg shadow-lg bg-brackground flex flex-col items-center justify-center p-8 relative z-30 transition-all duration-300",
        isActive && mode === "pomodoro" && "border-red-600/50",
        isActive && mode === "shortBreak" && "border-indigo-600/50",
        isActive && mode === "longBreak" && "border-teal-600/50"
      )}
    >
      {/* Mode Selection */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <div
          className={cn(
            "flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer transition-colors transition-duration-200",
            mode === "pomodoro" && "bg-red-600 text-white"
          )}
          onClick={() => onModeChange("pomodoro")}
        >
          Pomodoro
        </div>
        <div
          className={cn(
            "flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer transition-colors transition-duration-200",
            mode === "shortBreak" && "bg-indigo-600 text-white"
          )}
          onClick={() => onModeChange("shortBreak")}
        >
          Short Break
        </div>
        <div
          className={cn(
            "flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer",
            mode === "longBreak" &&
              "bg-teal-600 text-white transition-colors transition-duration-200"
          )}
          onClick={() => onModeChange("longBreak")}
        >
          Long Break
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-5xl md:text-8xl font-mono font-bold my-10">
        {timerStyle === "animated" ? (
          <div>
            <NumberFlowGroup>
              <div
                style={{
                  fontVariantNumeric: "tabular-nums",
                }}
                className="~text-3xl/4xl flex items-baseline font-semibold"
              >
                <NumberFlow
                  trend={-1}
                  value={hh}
                  format={{ minimumIntegerDigits: 2 }}
                />
                <NumberFlow
                  prefix=":"
                  trend={-1}
                  value={mm}
                  digits={{ 1: { max: 5 } }}
                  format={{ minimumIntegerDigits: 2 }}
                />
                <NumberFlow
                  prefix=":"
                  trend={-1}
                  value={ss}
                  digits={{ 1: { max: 5 } }}
                  format={{ minimumIntegerDigits: 2 }}
                />
              </div>
            </NumberFlowGroup>
          </div>
        ) : (
          formatTime(timeLeft)
        )}

        <Progress value={progressInPercent} className="w-full h-2 mb-4" />
      </div>

      {/* Timer Controls */}
      <div className="flex gap-4">
        <Button
          onClick={onToggleTimer}
          variant="default"
          size="lg"
          className="w-32"
        >
          {isActive ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Start
            </>
          )}
        </Button>
        <Button onClick={onResetTimer} variant="outline" size="lg">
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>

      {/* Timer mode indicator */}
      <div className="mt-8 text-sm text-muted-foreground">
        {mode === "pomodoro" ? (
          <p>Focus Time: {timerConfig.pomodoro} minutes</p>
        ) : mode === "shortBreak" ? (
          <p>Short Break: {timerConfig.shortBreak} minutes</p>
        ) : (
          <p>Long Break: {timerConfig.longBreak} minutes</p>
        )}
      </div>
    </div>
  );
};
