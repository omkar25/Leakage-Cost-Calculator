"use client";

import { Shield, Bell, Users, Key } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your CXPortal configuration and preferences.
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* General */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Key size={16} className="text-gray-500" />
            API Keys & Integrations
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  OpenAI API Key
                </p>
                <p className="text-xs text-gray-500">
                  Used for AI-powered search and chat
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  Connected
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  Edit
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Microsoft Graph API
                </p>
                <p className="text-xs text-gray-500">
                  For Teams and Outlook integration
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  Connected
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  Edit
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Google Drive API
                </p>
                <p className="text-xs text-gray-500">
                  For Google Drive document access
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  Connected
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bell size={16} className="text-gray-500" />
            Notifications
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Email digest",
                desc: "Daily summary of searches and insights",
                enabled: true,
              },
              {
                label: "Source sync alerts",
                desc: "Notify when sync fails or completes",
                enabled: true,
              },
              {
                label: "New content alerts",
                desc: "Notify when new documents are indexed",
                enabled: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <div
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.enabled ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${item.enabled ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={16} className="text-gray-500" />
            Security & Access
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Data Encryption
                </p>
                <p className="text-xs text-gray-500">AES-256 at rest, TLS in transit</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Role-Based Access Control
                </p>
                <p className="text-xs text-gray-500">3 roles configured</p>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                Manage
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Audit Logs</p>
                <p className="text-xs text-gray-500">
                  All queries and access logged
                </p>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                View Logs
              </button>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={16} className="text-gray-500" />
            Team Members
          </h3>
          <div className="space-y-3">
            {[
              { name: "Admin User", email: "admin@company.com", role: "Admin" },
              {
                name: "Sarah Johnson",
                email: "sarah@company.com",
                role: "Editor",
              },
              {
                name: "Mike Chen",
                email: "mike@company.com",
                role: "Viewer",
              },
            ].map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
