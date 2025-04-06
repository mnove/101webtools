import { PomodoroTimer } from "@/components/layouts/pomodoro-timer";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="pomodoroTimer" />
      <PomodoroTimer />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("pomodoroTimer");
