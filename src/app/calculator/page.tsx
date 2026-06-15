import LeakageCalculator from "@/components/LeakageCalculator";
import { Calculator } from "lucide-react";

export default function CalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#1b3a5c] text-white px-6 py-4 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="h-7 w-7 text-white/90" />
            <div>
              <h1 className="text-lg font-bold tracking-wide">CXPORTAL</h1>
              <p className="text-[11px] text-white/60">Knowledge OS</p>
            </div>
          </div>
          <a
            href="/login"
            className="text-sm px-4 py-1.5 rounded-md border border-white/30 hover:bg-white/10 transition-colors"
          >
            Sign In
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <LeakageCalculator />
      </main>

      {/* Footer */}
      <footer className="bg-[#1b3a5c] text-white px-6 py-3 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/90 text-xs">
            <span>✦</span>
            <span className="font-semibold">CXPORTAL Knowledge OS</span>
            <span className="text-white/60">– Your unified operational intelligence layer.</span>
          </div>
          <p className="text-xs text-white/60">One source of truth. Every team. Every time.</p>
        </div>
      </footer>
    </div>
  );
}
