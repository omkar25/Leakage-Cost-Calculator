"use client";

import {
  TrendingUp,
  TrendingDown,
  Search,
  Activity,
  Brain,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Bell,
  CircleDot,
} from "lucide-react";

function TrendBadge({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const isPositive = value > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}
    >
      {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {isPositive ? "+" : ""}{value}{suffix}
    </span>
  );
}

const kpis = [
  { label: "Operational Health Score", value: "92%", sub: "Excellent", trend: 3, color: "text-green-600", bg: "bg-green-50", icon: <Activity size={18} /> },
  { label: "AI Readiness Score", value: "87%", sub: "Strong", trend: 5, color: "text-blue-600", bg: "bg-blue-50", icon: <Brain size={18} /> },
  { label: "Resolution Confidence", value: "94%", sub: "High Confidence", trend: 2, color: "text-green-600", bg: "bg-green-50", icon: <CheckCircle2 size={18} /> },
  { label: "Escalation Risk", value: "18%", sub: "Moderate Risk", trend: -3, color: "text-amber-600", bg: "bg-amber-50", icon: <AlertTriangle size={18} /> },
  { label: "Monthly Revenue Leakage", value: "£184K", sub: "At Risk", trend: -8, color: "text-red-600", bg: "bg-red-50", icon: <PoundSterling size={18} /> },
  { label: "Revenue Recovery Opportunity", value: "£2.4M", sub: "Annual Potential", trend: 15, color: "text-green-600", bg: "bg-green-50", icon: <BarChart3 size={18} /> },
];

const popularTopics = [
  "Account & Billing",
  "Technical Support",
  "Products & Services",
  "Policies & Compliance",
  "Troubleshooting",
  "Returns & Refunds",
];

const leakageDrivers = [
  { name: "Process Delays", amount: "£52,000", pct: 87 },
  { name: "Repeat Contacts", amount: "£38,000", pct: 72 },
  { name: "Skill Insufficiency", amount: "£35,000", pct: 68 },
  { name: "Escalations", amount: "£32,000", pct: 62 },
  { name: "Incorrect Routing", amount: "£15,000", pct: 45 },
  { name: "Incomplete Resolution", amount: "£12,000", pct: 38 },
];

const leakageTrend = [
  { month: "Jan", value: 165 },
  { month: "Feb", value: 172 },
  { month: "Mar", value: 190 },
  { month: "Apr", value: 178 },
  { month: "May", value: 184 },
  { month: "Jun", value: 170 },
];

const recoveryOps = [
  { name: "Reduce Escalations", amount: "£780K", pct: "35%" },
  { name: "Faster Onboarding", amount: "£560K", pct: "25%" },
  { name: "Lower AHT", amount: "£440K", pct: "20%" },
  { name: "Improve FCR", amount: "£340K", pct: "15%" },
  { name: "AI-Powered Operations", amount: "£280K", pct: "5%" },
];

const impactSummary = [
  { label: "Lower Operational Costs", icon: <TrendingDown size={12} /> },
  { label: "Increase Customer Satisfaction", icon: <TrendingUp size={12} /> },
  { label: "Improve Agent Productivity", icon: <TrendingUp size={12} /> },
  { label: "AI-Driven Efficiency", icon: <Brain size={12} /> },
  { label: "Decrease Operations", icon: <TrendingDown size={12} /> },
];

const workflowSteps = [
  { label: "Verify customer identity", color: "bg-green-500" },
  { label: "Investigate billing issue", color: "bg-blue-500" },
  { label: "Trigger refund policy", color: "bg-amber-500" },
  { label: "Send completion notification", color: "bg-purple-500" },
];

const aiInsights = [
  { title: "High volume of billing issues detected today", time: "10 min ago", type: "warning" },
  { title: "New policy update may impact 3 workflows", time: "25 min ago", type: "info" },
  { title: "Opportunity to automate response in 12 queries", time: "1 hr ago", type: "success" },
];

const systemAlerts = [
  { title: "Billing policy updated 2 hours ago", severity: "Medium", color: "text-amber-600" },
  { title: "Integration delay with CRM detected", severity: "High", color: "text-red-600" },
  { title: "Escalation volume increased by 10%", severity: "Low", color: "text-blue-600" },
];

export default function Analytics() {
  const maxTrend = Math.max(...leakageTrend.map((d) => d.value));

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">
            Welcome back, Operations Team
          </h1>
          <p className="text-xs text-gray-500">
            Here&apos;s what&apos;s happening with your operations today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400">Operations Team</span>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            OT
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                  {kpi.icon}
                </div>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">{kpi.label}</p>
              </div>
              <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-400">{kpi.sub}</span>
                <TrendBadge value={kpi.trend} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Knowledge + Operational Intelligence */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Search Knowledge */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Search Knowledge</h3>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-3">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers, policies, procedures..."
                className="flex-1 bg-transparent outline-none text-xs text-gray-700 placeholder-gray-400"
                readOnly
              />
            </div>
            <p className="text-[10px] text-gray-500 font-medium mb-2">Popular Topics</p>
            <div className="flex flex-wrap gap-2">
              {popularTopics.map((topic) => (
                <span key={topic} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] rounded-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
                  {topic}
                </span>
              ))}
            </div>
            <button className="mt-3 text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
              View all knowledge topics <ArrowRight size={11} />
            </button>
          </div>

          {/* Operational Intelligence */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Operational Intelligence</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Resolution Confidence */}
              <div className="text-center">
                <p className="text-[10px] text-gray-500 font-medium mb-2">Resolution Confidence</p>
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="94, 100" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-green-600">94%</span>
                    <span className="text-[8px] text-gray-400">High</span>
                  </div>
                </div>
                <p className="text-[9px] text-gray-400 mt-1">All resolutions at recommended standard</p>
              </div>

              {/* AI-Assisted Guidance */}
              <div>
                <p className="text-[10px] text-gray-500 font-medium mb-2">AI-Assisted Guidance</p>
                <div className="space-y-1.5">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] font-medium text-blue-700">Recommended Next Action</p>
                    <p className="text-[9px] text-blue-600">Escalation not required. Billing verification completed.</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] font-medium text-amber-700">Escalation Prevention</p>
                    <p className="text-[9px] text-amber-600">Suggested intervention available.</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2">
                    <p className="text-[10px] font-medium text-green-700">Compliance Verified</p>
                    <p className="text-[9px] text-green-600">Against latest policy. Updated May 24, 2025.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Recommendations */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-500 font-medium mb-2">Workflow Recommendations</p>
              <p className="text-[9px] text-gray-400 mb-2">Suggested operational workflow for this issue.</p>
              <div className="flex items-center gap-2">
                {workflowSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-1.5">
                    <div className={`w-5 h-5 rounded-full ${step.color} flex items-center justify-center`}>
                      <span className="text-[8px] text-white font-bold">{i + 1}</span>
                    </div>
                    <span className="text-[9px] text-gray-600">{step.label}</span>
                    {i < workflowSteps.length - 1 && <ArrowRight size={10} className="text-gray-300 ml-1" />}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-2">
                <button className="text-[10px] text-blue-600 font-medium flex items-center gap-1">View Full Guidance <ArrowRight size={10} /></button>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-gray-400">Confidence</span>
                  <span className="text-[10px] font-bold text-green-600">94%</span>
                  <span className="text-[8px] text-gray-400">High Confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Leakage Calculator + Revenue Recovery */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Operational Leakage Calculator */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Operational Leakage Calculator</h3>
              <CircleDot size={14} className="text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-500 font-medium">Monthly Revenue Leakage</p>
                <p className="text-2xl font-bold text-red-600 mt-1">£184,000</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-gray-400">Estimated Loss</span>
                  <span className="text-[10px] font-medium text-red-500">High Impact</span>
                </div>

                <div className="mt-3">
                  <p className="text-[10px] text-gray-500 font-medium mb-2">Leakage Drivers</p>
                  <div className="space-y-1.5">
                    {leakageDrivers.map((d) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-600 w-28 shrink-0">{d.name}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-red-400 h-full rounded-full" style={{ width: `${d.pct}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 w-14 text-right">{d.amount}</span>
                        <span className="text-[9px] text-gray-400 w-8 text-right">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leakage Trend Chart */}
              <div>
                <p className="text-[10px] text-gray-500 font-medium mb-1">Leakage Trend</p>
                <p className="text-[9px] text-gray-400 mb-2">(Last 6 Months)</p>
                <div className="flex items-end gap-2 h-28">
                  {leakageTrend.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[8px] text-gray-400">£{d.value}K</span>
                      <div
                        className="w-full rounded-t bg-linear-to-t from-red-400 to-red-300 transition-all"
                        style={{ height: `${(d.value / maxTrend) * 80}%` }}
                      />
                      <span className="text-[9px] text-gray-500">{d.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-2 justify-center">
                  <span className="text-[9px] text-gray-400">vs last month</span>
                  <TrendBadge value={12} />
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Recovery Opportunity */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Revenue Recovery Opportunity</h3>
              <CircleDot size={14} className="text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-[10px] text-gray-500 font-medium">Annual Recovery Potential</p>
                <p className="text-2xl font-bold text-green-600 mt-1">£2.4M</p>
                <span className="text-[10px] text-green-500">Operational Recovery</span>
                <p className="text-[9px] text-amber-500 mt-0.5">High Opportunity</p>
              </div>

              {/* Recovery Operations */}
              <div>
                <p className="text-[10px] text-gray-500 font-medium mb-2">Recovery Operations</p>
                <div className="space-y-1.5">
                  {recoveryOps.map((op) => (
                    <div key={op.name} className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-600">{op.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-medium text-gray-800">{op.amount}</span>
                        <span className="text-[8px] text-gray-400">{op.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Summary */}
              <div>
                <p className="text-[10px] text-gray-500 font-medium mb-2">Impact Summary</p>
                <div className="space-y-1.5">
                  {impactSummary.map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <span className="text-green-500">{item.icon}</span>
                      <span className="text-[9px] text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100">
              <button className="text-[10px] text-blue-600 font-medium flex items-center gap-1">
                View Full Revenue Recovery Report <ArrowRight size={10} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent AI Insights + System Alerts + System Status */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent AI Insights */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Lightbulb size={14} className="text-amber-500" /> Recent AI Insights
            </h3>
            <div className="space-y-2">
              {aiInsights.map((insight) => (
                <div key={insight.title} className={`p-2 rounded-lg ${
                  insight.type === "warning" ? "bg-amber-50" : insight.type === "info" ? "bg-blue-50" : "bg-green-50"
                }`}>
                  <p className={`text-[10px] font-medium ${
                    insight.type === "warning" ? "text-amber-700" : insight.type === "info" ? "text-blue-700" : "text-green-700"
                  }`}>{insight.title}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{insight.time}</p>
                </div>
              ))}
            </div>
            <button className="mt-2 text-[10px] text-blue-600 font-medium flex items-center gap-1">
              View all insights <ArrowRight size={10} />
            </button>
          </div>

          {/* System Alerts */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Bell size={14} className="text-red-500" /> System Alerts
            </h3>
            <div className="space-y-2">
              {systemAlerts.map((alert) => (
                <div key={alert.title} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                  <AlertTriangle size={12} className={alert.color + " mt-0.5 shrink-0"} />
                  <div>
                    <p className="text-[10px] text-gray-700 font-medium">{alert.title}</p>
                    <span className={`text-[9px] font-medium ${alert.color}`}>{alert.severity}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-2 text-[10px] text-blue-600 font-medium flex items-center gap-1">
              View all alerts <ArrowRight size={10} />
            </button>
          </div>

          {/* System Status */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500" /> System Status
            </h3>
            <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3 mb-3">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-sm font-semibold text-green-700">All Systems Operational</span>
            </div>
            <p className="text-[10px] text-gray-400">Last Updated</p>
            <p className="text-[11px] text-gray-600 font-medium">May 24, 2025 10:30 AM</p>
            <div className="mt-3 space-y-1.5">
              {["Knowledge Base", "AI Engine", "Connectors", "Search Index"].map((sys) => (
                <div key={sys} className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-600">{sys}</span>
                  <span className="text-[9px] text-green-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> Online
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
