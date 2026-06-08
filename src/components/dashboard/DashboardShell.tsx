"use client";

import { useState } from "react";
import Sidebar, { ActivePanel } from "./Sidebar";
import ChatAssistant from "./ChatAssistant";
import UnifiedSearch from "./UnifiedSearch";
import Sources from "./Sources";
import Analytics from "./Analytics";
import Settings from "./Settings";
import LeakageCalculator from "@/components/LeakageCalculator";
import TopHeader from "./TopHeader";

const panels: Record<ActivePanel, React.ReactNode> = {
  analytics: <Analytics />,
  assistant: <ChatAssistant />,
  search: <UnifiedSearch />,
  sources: <Sources />,
  leakage: <LeakageCalculator />,
  settings: <Settings />,
};

export default function DashboardShell() {
  const [activePanel, setActivePanel] = useState<ActivePanel>("analytics");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-auto">{panels[activePanel]}</main>
        <footer className="h-10 bg-[#1b3a5c] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 text-white/90 text-xs">
            <span>✦</span>
            <span className="font-semibold">CXPORTAL Knowledge OS</span>
            <span className="text-white/60">– Your unified operational intelligence layer.</span>
          </div>
          <p className="text-xs text-white/60">One source of truth. Every team. Every time.</p>
        </footer>
      </div>
    </div>
  );
}
