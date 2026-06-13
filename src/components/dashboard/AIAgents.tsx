"use client";

import { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

/* ─── mock data ─── */
interface Agent {
  id: number;
  name: string;
  purpose: string;
  status: "Active" | "Inactive" | "Draft";
  accuracy: number;
  interactions: number;
  lastUpdated: string;
}

const agents: Agent[] = [
  { id: 1, name: "Billing Assistant", purpose: "Handle billing inquiries and disputes", status: "Active", accuracy: 94, interactions: 12456, lastUpdated: "May 24, 2025" },
  { id: 2, name: "Policy Advisor", purpose: "Answer policy and compliance questions", status: "Active", accuracy: 90, interactions: 8301, lastUpdated: "May 24, 2025" },
  { id: 3, name: "Technical Supporter", purpose: "Troubleshoot technical issues", status: "Active", accuracy: 91, interactions: 15783, lastUpdated: "May 26, 2025" },
  { id: 4, name: "Refund Specialist", purpose: "Process refund requests", status: "Active", accuracy: 88, interactions: 6432, lastUpdated: "May 23, 2025" },
  { id: 5, name: "Product Expert", purpose: "Provide product information", status: "Active", accuracy: 89, interactions: 4356, lastUpdated: "May 25, 2025" },
  { id: 6, name: "Escalation Predictor", purpose: "Predict and prevent escalations", status: "Active", accuracy: 86, interactions: 9876, lastUpdated: "May 23, 2025" },
  { id: 7, name: "Compliance Checker", purpose: "Verify compliance and policy adherence", status: "Active", accuracy: 96, interactions: 7254, lastUpdated: "May 22, 2025" },
  { id: 8, name: "Sentiment Analyzer", purpose: "Analyze customer sentiment in real-time", status: "Inactive", accuracy: 82, interactions: 3120, lastUpdated: "May 18, 2025" },
  { id: 9, name: "Onboarding Guide", purpose: "Help new customers get started", status: "Draft", accuracy: 0, interactions: 0, lastUpdated: "May 20, 2025" },
  { id: 10, name: "Upsell Recommender", purpose: "Suggest relevant upgrades and add-ons", status: "Active", accuracy: 79, interactions: 2890, lastUpdated: "May 21, 2025" },
  { id: 11, name: "Churn Predictor", purpose: "Identify at-risk customers early", status: "Active", accuracy: 85, interactions: 5430, lastUpdated: "May 22, 2025" },
  { id: 12, name: "Knowledge Curator", purpose: "Maintain and update knowledge base", status: "Active", accuracy: 91, interactions: 1980, lastUpdated: "May 24, 2025" },
];

const performanceTrend = [
  { day: "May 18", value: 30 },
  { day: "May 19", value: 45 },
  { day: "May 20", value: 38 },
  { day: "May 21", value: 52 },
  { day: "May 22", value: 48 },
  { day: "May 23", value: 60 },
  { day: "May 24", value: 55 },
];

const topIntents = [
  { label: "Billing Dispute", pct: 34, color: "bg-red-500" },
  { label: "Payment Failure", pct: 25, color: "bg-orange-400" },
  { label: "Refund Request", pct: 18, color: "bg-yellow-400" },
  { label: "Charge Explanation", pct: 12, color: "bg-emerald-400" },
  { label: "Other", pct: 11, color: "bg-gray-400" },
];

type TabFilter = "all" | "active" | "inactive" | "drafts";

const PAGE_SIZE = 7;

export default function AIAgents() {
  const [tab, setTab] = useState<TabFilter>("all");
  const [page, setPage] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(agents[0]);
  const [detailTab, setDetailTab] = useState<"performance" | "knowledge" | "activity" | "configuration">("performance");

  const filtered = agents.filter((a) => {
    if (tab === "active") return a.status === "Active";
    if (tab === "inactive") return a.status === "Inactive";
    if (tab === "drafts") return a.status === "Draft";
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const tabs: { key: TabFilter; label: string }[] = [
    { key: "all", label: "All Agents" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "drafts", label: "Drafts" },
  ];

  /* simple sparkline SVG */
  const maxVal = Math.max(...performanceTrend.map((p) => p.value));
  const points = performanceTrend
    .map((p, i) => {
      const x = (i / (performanceTrend.length - 1)) * 280 + 10;
      const y = 80 - (p.value / maxVal) * 70;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="flex h-full">
      {/* ── Left: Table ── */}
      <div className={`flex-1 flex flex-col min-w-0 ${selectedAgent ? "" : ""}`}>
        {/* breadcrumb */}
        <div className="px-6 pt-5 pb-1 text-xs text-gray-400">
          <span className="text-gray-500 font-medium">Home</span>
          <span className="mx-1">/</span>
          <span>AI Agents</span>
        </div>

        {/* Title row */}
        <div className="px-6 pb-4 flex items-end justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Agents</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage and monitor your AI agents.</p>
          </div>
        </div>

        {/* Tabs + new-agent button */}
        <div className="px-6 flex items-center justify-between border-b border-gray-200">
          <div className="flex gap-4">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setPage(1); }}
                className={`pb-2.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors mb-2">
            <Plus size={16} /> New AI Agent
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-6 pt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="py-3 pr-4 font-medium">Agent Name</th>
                <th className="py-3 pr-4 font-medium">Purpose</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Accuracy</th>
                <th className="py-3 pr-4 font-medium">Interactions</th>
                <th className="py-3 pr-4 font-medium">Last Updated</th>
                <th className="py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((agent) => (
                <tr
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`border-b border-gray-50 cursor-pointer transition-colors ${
                    selectedAgent?.id === agent.id ? "bg-blue-50/60" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-3 pr-4 font-medium text-gray-900">{agent.name}</td>
                  <td className="py-3 pr-4 text-gray-500 max-w-[220px] truncate">{agent.purpose}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        agent.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : agent.status === "Inactive"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          agent.status === "Active"
                            ? "bg-emerald-500"
                            : agent.status === "Inactive"
                            ? "bg-gray-400"
                            : "bg-amber-500"
                        }`}
                      />
                      {agent.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-700">{agent.accuracy}%</td>
                  <td className="py-3 pr-4 text-gray-700">{agent.interactions.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-gray-500">{agent.lastUpdated}</td>
                  <td className="py-3">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between py-4 text-xs text-gray-500">
            <span>
              Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} agents
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-7 h-7 rounded text-xs font-medium ${
                    page === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Detail panel ── */}
      {selectedAgent && (
        <aside className="w-[360px] border-l border-gray-200 bg-white flex flex-col shrink-0 overflow-y-auto">
          {/* Header */}
          <div className="px-5 pt-5 pb-3 flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">{selectedAgent.name}</h2>
              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {selectedAgent.status}
              </span>
            </div>
            <button onClick={() => setSelectedAgent(null)} className="p-1 rounded hover:bg-gray-100">
              <X size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Detail section */}
          <div className="px-5 pb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">AI Agent Details</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Specializes in billing inquiries, payment issues, and dispute resolution.
            </p>
          </div>

          {/* Stats grid */}
          <div className="px-5 pb-4 grid grid-cols-2 gap-3">
            <StatCard label="Accuracy Rate" value={`${selectedAgent.accuracy}%`} change="+0.5% in last 7 days" />
            <StatCard label="Total Interactions" value={selectedAgent.interactions.toLocaleString()} change="+1.5% in last 7 days" />
            <StatCard label="Resolved Interactions" value={Math.round(selectedAgent.interactions * 0.9).toLocaleString()} change="+1.6% in last 7 days" />
            <StatCard label="Escalation Rate" value="8.2%" change="4.3% in last 7 days" />
            <StatCard label="Avg. Response Time" value="3.2s" change="4.5% in last 7 days" />
            <StatCard label="Satisfaction Score" value="4.6/5" change="+0.5 in last 7 days" />
          </div>

          {/* Tabs */}
          <div className="px-5 flex gap-3 border-b border-gray-200">
            {(["performance", "knowledge", "activity", "configuration"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setDetailTab(t)}
                className={`pb-2 text-xs font-medium capitalize border-b-2 transition-colors ${
                  detailTab === t
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Performance chart */}
          {detailTab === "performance" && (
            <div className="px-5 py-4 space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-3">Performance Trend (Last 7 Days)</h4>
                <svg viewBox="0 0 300 100" className="w-full h-28">
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    points={points}
                  />
                  {performanceTrend.map((p, i) => {
                    const x = (i / (performanceTrend.length - 1)) * 280 + 10;
                    const y = 80 - (p.value / maxVal) * 70;
                    return <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />;
                  })}
                  {performanceTrend.map((p, i) => {
                    const x = (i / (performanceTrend.length - 1)) * 280 + 10;
                    return (
                      <text key={i} x={x} y={96} textAnchor="middle" className="fill-gray-400 text-[8px]">
                        {p.day.replace("May ", "")}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* Top Intents */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-3">Top Intent Handled</h4>
                <div className="space-y-2.5">
                  {topIntents.map((intent) => (
                    <div key={intent.label} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-32 shrink-0">{intent.label}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${intent.color}`} style={{ width: `${intent.pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{intent.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {detailTab !== "performance" && (
            <div className="flex-1 flex items-center justify-center p-8 text-gray-400 text-sm">
              {detailTab.charAt(0).toUpperCase() + detailTab.slice(1)} tab coming soon.
            </div>
          )}
        </aside>
      )}
    </div>
  );
}

/* ── tiny stat card ── */
function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-[10px] text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
      <p className="text-[10px] text-emerald-600 flex items-center gap-0.5 mt-0.5">
        <TrendingUp size={10} /> {change}
      </p>
    </div>
  );
}
