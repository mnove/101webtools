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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimerConfig } from "./types";
import { SettingsFormValues, settingsFormSchema } from "./schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { Switch } from "@/components/ui/switch";
import { useRef } from "react";

interface SettingsDrawerProps {
  timerConfig: TimerConfig;
  onSettingsSave: (data: SettingsFormValues) => void;
}

export const SettingsDrawer = ({
  timerConfig,
  onSettingsSave,
}: SettingsDrawerProps) => {
  const isMobile = useIsMobile();
  const drawerRef = useRef<HTMLButtonElement>(null);

  // Initialize the form with current settings
  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      pomodoro: timerConfig.pomodoro,
      shortBreak: timerConfig.shortBreak,
      longBreak: timerConfig.longBreak,
      timerStyle: timerConfig.timerStyle,
      pomodorosPerCycle: timerConfig.pomodorosPerCycle,
      autoCycle: timerConfig.autoCycle,
    },
  });

  const handleSaveSettings = (data: SettingsFormValues) => {
    onSettingsSave(data);
    // Close drawer after saving
    drawerRef.current?.click();
  };

  const handleCancel = () => {
    // Reset form to default values
    settingsForm.reset({
      pomodoro: timerConfig.pomodoro,
      shortBreak: timerConfig.shortBreak,
      longBreak: timerConfig.longBreak,
      timerStyle: timerConfig.timerStyle,
      pomodorosPerCycle: timerConfig.pomodorosPerCycle,
      autoCycle: timerConfig.autoCycle,
    });
  };

  return (
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
              onSubmit={settingsForm.handleSubmit(handleSaveSettings)}
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

              <FormField
                control={settingsForm.control}
                name="pomodorosPerCycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pomodoros Per Cycle</FormLabel>
                    <FormDescription>
                      Number of pomodoros before a long break
                    </FormDescription>
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
                name="autoCycle"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Auto Cycle</FormLabel>
                      <FormDescription>
                        Automatically start the next timer in the cycle
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DrawerFooter className="px-0">
                <Button type="submit">Save Changes</Button>
                <DrawerClose ref={drawerRef} asChild>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
