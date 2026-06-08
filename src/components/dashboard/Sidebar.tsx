"use client";

import {
  MessageSquare,
  Search,
  Database,
  BarChart3,
  Settings,
  Calculator,
} from "lucide-react";

export type ActivePanel =
  | "assistant"
  | "search"
  | "sources"
  | "analytics"
  | "leakage"
  | "settings";

interface SidebarProps {
  activePanel: ActivePanel;
  onPanelChange: (panel: ActivePanel) => void;
}

const navItems: { id: ActivePanel; label: string; icon: React.ReactNode }[] = [
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
  { id: "assistant", label: "Assistant", icon: <MessageSquare size={20} /> },
  { id: "search", label: "Search", icon: <Search size={20} /> },
  { id: "sources", label: "Sources", icon: <Database size={20} /> },
  { id: "leakage", label: "Leakage Calc", icon: <Calculator size={20} /> },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  return (
    <aside className="w-16 md:w-56 bg-[#1b3a5c] flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
          CX
        </div>
        <span className="ml-3 font-semibold text-white hidden md:block">
          CXPortal
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activePanel === item.id
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span
              className={
                activePanel === item.id ? "text-white" : "text-white/50"
              }
            >
              {item.icon}
            </span>
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium text-white">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-white/60">admin@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
