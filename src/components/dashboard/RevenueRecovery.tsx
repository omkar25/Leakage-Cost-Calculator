"use client";

import { ArrowRight, Phone, Users, CreditCard, Mail, Database, UserCheck, Target } from "lucide-react";

const reminderSteps = [
  { label: "45 Days", active: false },
  { label: "30 Days", active: false },
  { label: "14 Days", active: true },
  { label: "7 Days", active: false },
  { label: "2 Days", active: false },
];

const journeySteps = [
  { label: "AI Voice Call", icon: <Phone size={20} />, color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Customer Response", icon: <Users size={20} />, color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Payment / Renewal Action", icon: <CreditCard size={20} />, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { label: "SMS / Email Confirmation", icon: <Mail size={20} />, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { label: "CRM Update / Disposition", icon: <Database size={20} />, color: "bg-green-100 text-green-700 border-green-200" },
  { label: "Human Agent Escalation", icon: <UserCheck size={20} />, color: "bg-green-100 text-green-700 border-green-200" },
];

const kpiFocusItems = [
  "Connect Rate",
  "Renewal Conversion",
  "Payment Completion",
  "Confirmation Delivery",
  "Human Transfer Rate",
  "Revenue Recovery",
];

export default function RevenueRecovery() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Intelligent Renewal Outreach Journey
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Executive Business Flow for Renewal, Payment &amp; Reminder Engagement
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-right">
          <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
            <Target size={16} />
            Business Objective
          </div>
          <p className="text-xs text-green-600 mt-1">
            Increase renewal conversion and reduce avoidable lapse
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-10">
        {/* Customer Reminder Journey */}
        <div>
          <h2 className="text-lg font-bold text-gray-900">Customer Reminder Journey</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            A proactive cadence that engages customers before due date, resolves friction, and drives next-best action
          </p>
        </div>

        {/* Policy / Payment / Contract Due Event */}
        <div>
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-700 mb-5">
            Policy / Payment / Contract Due Event
          </div>

          {/* Timeline Steps */}
          <div className="flex items-center gap-2 flex-wrap">
            {reminderSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div
                  className={`px-6 py-3 rounded-full text-sm font-semibold border ${
                    step.active
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  {step.label}
                </div>
                {i < reminderSteps.length - 1 && (
                  <ArrowRight size={16} className="text-gray-400 shrink-0" />
                )}
              </div>
            ))}

            {/* 2-day callout */}
            <div className="ml-4 max-w-xs bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2.5">
              <p className="text-xs text-yellow-800 leading-relaxed">
                The 2-day reminder acts as the final proactive follow-up before due date,
                maximizing conversion and reducing preventable policy lapse.
              </p>
            </div>
          </div>
        </div>

        {/* Journey Flow Steps */}
        <div className="flex items-center gap-2 flex-wrap">
          {journeySteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div
                className={`flex flex-col items-center justify-center gap-2 px-5 py-4 rounded-xl border text-center min-w-[130px] ${step.color}`}
              >
                {step.icon}
                <span className="text-xs font-semibold leading-tight">{step.label}</span>
              </div>
              {i < journeySteps.length - 1 && (
                <ArrowRight size={16} className="text-gray-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Executive KPI Focus */}
      <div className="bg-white rounded-2xl border border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold text-gray-900">Executive KPI Focus:</span>
          {kpiFocusItems.map((item, i) => (
            <span key={item} className="flex items-center gap-3 text-sm text-gray-600">
              {item}
              {i < kpiFocusItems.length - 1 && (
                <span className="text-blue-400">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
