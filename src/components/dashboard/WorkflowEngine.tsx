"use client";

import { useState } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";

interface WorkflowItem {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Inactive";
  executions: number;
  successRate: number;
  lastModified: string;
}

const workflows: WorkflowItem[] = [
  { id: 1, name: "Refund Process Workflow", description: "Automated refund approval and processing", status: "Active", executions: 1234, successRate: 98.5, lastModified: "May 24, 2025" },
  { id: 2, name: "Escalation Management", description: "Handle escalations and notifications", status: "Active", executions: 856, successRate: 96.2, lastModified: "May 23, 2025" },
  { id: 3, name: "Customer Verification", description: "Verify customer identity and details", status: "Active", executions: 2156, successRate: 99.1, lastModified: "May 22, 2025" },
  { id: 4, name: "Policy Compliance Check", description: "Check policy compliance automatically", status: "Active", executions: 1445, successRate: 97.8, lastModified: "May 21, 2025" },
  { id: 5, name: "Billing Issue Resolution", description: "Resolve billing issues automatically", status: "Inactive", executions: 678, successRate: 94.3, lastModified: "May 20, 2025" },
];

type TabKey = "workflows" | "templates" | "executions" | "connections";

export default function WorkflowEngine() {
  const [tab, setTab] = useState<TabKey>("workflows");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "workflows", label: "Workflows" },
    { key: "templates", label: "Templates" },
    { key: "executions", label: "Executions" },
    { key: "connections", label: "Connections" },
  ];

  const filtered = workflows.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <div className="px-6 pt-5 pb-1">
        <h1 className="text-xl font-bold text-gray-900">Workflow Engine</h1>
        <p className="text-sm text-gray-500 mt-0.5">Design and manage automated workflows.</p>
      </div>

      {/* Tabs */}
      <div className="px-6 flex gap-5 border-b border-gray-200 mt-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
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

      {tab === "workflows" && (
        <div className="flex-1 overflow-auto px-6">
          {/* Search & Filter row */}
          <div className="flex items-center gap-4 py-4">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setStatusFilter(statusFilter === "All Status" ? "Active" : statusFilter === "Active" ? "Inactive" : "All Status")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              {statusFilter}
              <ChevronDown size={14} />
            </button>

            <div className="flex-1" />

            <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} /> New Workflow
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="py-3 pr-4 font-medium">Workflow Name</th>
                <th className="py-3 pr-4 font-medium">Description</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Executions</th>
                <th className="py-3 pr-4 font-medium">Success Rate</th>
                <th className="py-3 font-medium">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((wf) => (
                <tr key={wf.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-4 font-semibold text-gray-900">{wf.name}</td>
                  <td className="py-4 pr-4 text-gray-500">{wf.description}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        wf.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          wf.status === "Active" ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />
                      {wf.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-gray-700">{wf.executions.toLocaleString()}</td>
                  <td className="py-4 pr-4 text-gray-700">{wf.successRate}%</td>
                  <td className="py-4 text-gray-500">{wf.lastModified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab !== "workflows" && (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          {tab.charAt(0).toUpperCase() + tab.slice(1)} tab coming soon.
        </div>
      )}
    </div>
  );
}
