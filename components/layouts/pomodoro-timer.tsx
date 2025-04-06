"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { Pause, Play, RefreshCw, Settings } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Progress } from "../ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

interface TimerConfig {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  timerStyle: "classic" | "animated";
}

// Define the zod schema for settings form
const settingsFormSchema = z.object({
  pomodoro: z.number().min(1).max(60),
  shortBreak: z.number().min(1).max(30),
  longBreak: z.number().min(1).max(60),
  timerStyle: z.enum(["classic", "animated"]),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export const PomodoroTimer = () => {
  // Timer configuration in minutes
  const [timerConfig, setTimerConfig] = React.useState<TimerConfig>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    timerStyle: "animated",
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

  // Initialize the form with current settings
  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      pomodoro: timerConfig.pomodoro,
      shortBreak: timerConfig.shortBreak,
      longBreak: timerConfig.longBreak,
      timerStyle: timerConfig.timerStyle,
    },
  });

  // Function to handle settings form submission
  function onSettingsSubmit(data: SettingsFormValues) {
    setTimerConfig({
      pomodoro: data.pomodoro,
      shortBreak: data.shortBreak,
      longBreak: data.longBreak,
      timerStyle: data.timerStyle,
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
    const totalTime = timerConfig[mode] * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    setProgressInPercent(progress);
  }, [timeLeft, mode]);

  // Handle mode change
  const changeMode = (newMode: TimerMode) => {
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
      // Could add sound notification here
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, key]);

  // Capture the original document title when component mounts
  React.useEffect(() => {
    const title = document.title;
    setOriginalTitle(title);

    // Clean up function to restore original title when component unmounts
    //? currently disabled as it is conflicting with navigation changes to other pages and their metadata
    // return () => {
    //   document.title = title;
    // };
  }, []);

  // Update the document title when timer is active
  React.useEffect(() => {
    if (isActive && timeLeft > 0) {
      const formattedTime = formatTime(timeLeft);
      const modePrefix =
        mode === "pomodoro" ? "🍅" : mode === "shortBreak" ? "☕️" : "🌴";
      document.title = `${modePrefix} ${formattedTime} - Pomodoro Timer`;
    } else if (!isActive) {
      // Reset title when timer is paused
      if (originalTitle) {
        document.title = originalTitle;
      }
    }
  }, [timeLeft, isActive, mode, originalTitle]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const hh = Math.floor(timeLeft / 3600);
  const mm = Math.floor((timeLeft % 3600) / 60);
  const ss = timeLeft % 60;

  const isMobile = useIsMobile();

  const settings = (
    <Drawer shouldScaleBackground={isMobile ? false : true} direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Timer Settings</DrawerTitle>
            <DrawerDescription>
              Customize your Pomodoro timer settings.
            </DrawerDescription>
          </DrawerHeader>

          <Form {...settingsForm}>
            <form
              onSubmit={settingsForm.handleSubmit(onSettingsSubmit)}
              className="space-y-6 px-4"
            >
              <FormField
                control={settingsForm.control}
                name="pomodoro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pomodoro (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={settingsForm.control}
                name="shortBreak"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Break (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={settingsForm.control}
                name="longBreak"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Long Break (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={settingsForm.control}
                name="timerStyle"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Timer Style</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="classic" id="classic" />
                          <Label htmlFor="classic">Classic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="animated" id="animated" />
                          <Label htmlFor="animated">Animated</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter className="px-0">
                <Button type="submit">Save Changes</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );

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
        <div className="mb-4 flex items-center justify-end gap-2">
          {/* <Button variant="outline" size="sm">
            <LineChart /> Reports
          </Button> */}
          {settings}
        </div>
        <div
          className={cn(
            "border min-h-[500px] max-w-[500px] mx-auto  rounded-lg shadow-lg bg-brackground flex flex-col items-center justify-center p-8 relative z-30 transition-all duration-300",
            isActive && mode === "pomodoro" && "border-red-600/50",
            isActive && mode === "shortBreak" && "border-indigo-600/50",
            isActive && mode === "longBreak" && "border-teal-600/50"
          )}
        >
          {/* Mode Selection */}
          <div className="flex gap-2 mb-8">
            <div
              className={cn(
                "flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer transition-colors transition-duration-200",
                mode === "pomodoro" && "bg-red-600 text-white"
              )}
              onClick={() => changeMode("pomodoro")}
            >
              Pomodoro
            </div>
            <div
              className={cn(
                "flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer transition-colors transition-duration-200",
                mode === "shortBreak" && "bg-indigo-600 text-white"
              )}
              onClick={() => changeMode("shortBreak")}
            >
              Short Break
            </div>
            <div
              className={cn(
                "flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer",
                mode === "longBreak" &&
                  "bg-teal-600 text-white transition-colors transition-duration-200"
              )}
              onClick={() => changeMode("longBreak")}
            >
              Long Break
            </div>
          </div>

          {/* Timer Display */}
          <div className="text-8xl font-mono font-bold my-10">
            {timerStyle === "animated" ? (
              <div>
                <NumberFlowGroup>
                  <div
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      //   "--number-flow-char-height": "0.85em",
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
              onClick={toggleTimer}
              variant="brand"
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
            <Button onClick={resetTimer} variant="outline" size="lg">
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

        <div className="mt-2">
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
