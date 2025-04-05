import { PomodoroTimer } from "@/components/layouts/pomodoro-timer";
import ToolPageHeader from "@/components/tool-page-header";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="pomodoroTimer" />
      <PomodoroTimer />
    </div>
  );
}
