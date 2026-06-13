"use client";

import {
  Home,
  BookOpen,
  HelpCircle,
  Bot,
  Workflow,
  BarChart3,
  MessageSquare,
  DollarSign,
  Calculator,
  Settings,
} from "lucide-react";

export type ActivePanel =
  | "assistant"
  | "search"
  | "sources"
  | "analytics"
  | "aiagents"
  | "workflow"
  | "revenue"
  | "leakage"
  | "settings";

interface SidebarProps {
  activePanel: ActivePanel;
  onPanelChange: (panel: ActivePanel) => void;
}

const navItems: { id: ActivePanel; label: string; icon: React.ReactNode }[] = [
  { id: "analytics", label: "Home", icon: <Home size={18} /> },
  { id: "sources", label: "Knowledge", icon: <BookOpen size={18} /> },
  { id: "search", label: "Questions", icon: <HelpCircle size={18} /> },
  { id: "aiagents", label: "AI Agents", icon: <Bot size={18} /> },
  { id: "workflow", label: "Workflow Engine", icon: <Workflow size={18} /> },
  { id: "assistant", label: "Assistant", icon: <MessageSquare size={18} /> },
  { id: "settings", label: "Analytics", icon: <BarChart3 size={18} /> },
  { id: "revenue", label: "Revenue Recovery", icon: <DollarSign size={18} /> },
  { id: "leakage", label: "Leakage Calculator", icon: <Calculator size={18} /> },
];

export default function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  const renderNavButton = (item: { id: ActivePanel; label: string; icon: React.ReactNode }) => (
    <button
      key={item.id}
      onClick={() => onPanelChange(item.id)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
        activePanel === item.id
          ? "bg-blue-600 text-white border border-blue-600"
          : "text-white/60 hover:bg-white/5 hover:text-white/90 border border-transparent"
      }`}
    >
      <span className={activePanel === item.id ? "text-white" : "text-white/40"}>
        {item.icon}
      </span>
      <span className="hidden md:block">{item.label}</span>
    </button>
  );

  return (
    <aside className="w-16 md:w-52 bg-[#0b1929] flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-2 border-b border-white/5">
        <div className="px-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cxportal_logo.jpeg"
            alt="CXPortal Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(renderNavButton)}
      </nav>

      {/* Settings */}
      <div className="px-2 pb-3 border-t border-white/5 pt-2">
        <button
          onClick={() => onPanelChange("settings")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
            activePanel === "settings"
              ? "bg-blue-600 text-white border border-blue-600"
              : "text-white/60 hover:bg-white/5 hover:text-white/90 border border-transparent"
          }`}
        >
          <span className={activePanel === "settings" ? "text-white" : "text-white/40"}>
            <Settings size={18} />
          </span>
          <span className="hidden md:block">Settings</span>
        </button>
      </div>
    </aside>
  );
}
