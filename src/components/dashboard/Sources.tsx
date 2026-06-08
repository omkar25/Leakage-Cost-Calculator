"use client";

import {
  Mail,
  MessageSquare,
  HardDrive,
  Globe,
  BookOpen,
  Headphones,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { mockConnectedSources, ConnectedSource } from "@/data/mock-data";

const sourceIcons: Record<string, React.ReactNode> = {
  email: <Mail size={20} />,
  teams: <MessageSquare size={20} />,
  google_drive: <HardDrive size={20} />,
  sharepoint: <Globe size={20} />,
  confluence: <BookOpen size={20} />,
  zendesk: <Headphones size={20} />,
};

const statusConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  connected: {
    icon: <CheckCircle2 size={14} />,
    label: "Connected",
    color: "text-green-600",
  },
  disconnected: {
    icon: <XCircle size={14} />,
    label: "Disconnected",
    color: "text-red-500",
  },
  syncing: {
    icon: <Loader2 size={14} className="animate-spin" />,
    label: "Syncing...",
    color: "text-blue-600",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Sources() {
  const totalDocuments = mockConnectedSources.reduce(
    (sum, s) => sum + s.documentsIndexed,
    0
  );
  const connectedCount = mockConnectedSources.filter(
    (s) => s.status === "connected"
  ).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Connected Sources</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your data connections. Read-only connectors pull from your
          existing systems.
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-blue-700">
              {mockConnectedSources.length}
            </p>
            <p className="text-xs text-blue-600 font-medium">Total Sources</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-green-700">
              {connectedCount}
            </p>
            <p className="text-xs text-green-600 font-medium">Active</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-purple-700">
              {totalDocuments.toLocaleString()}
            </p>
            <p className="text-xs text-purple-600 font-medium">
              Documents Indexed
            </p>
          </div>
        </div>
      </div>

      {/* Sources List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-3">
          {mockConnectedSources.map((source: ConnectedSource) => {
            const status = statusConfig[source.status];
            return (
              <div
                key={source.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                      {sourceIcons[source.type]}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {source.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`flex items-center gap-1 text-xs ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {source.documentsIndexed.toLocaleString()} docs
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400">Last synced</p>
                      <p className="text-xs text-gray-600">
                        {formatDate(source.lastSynced)}
                      </p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <RefreshCw size={14} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xs font-bold text-blue-700">1</span>
            </div>
            <p className="text-xs font-medium text-gray-900">Connect</p>
            <p className="text-[10px] text-gray-500">
              Read-only connectors pull from your systems
            </p>
          </div>
          <div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xs font-bold text-blue-700">2</span>
            </div>
            <p className="text-xs font-medium text-gray-900">
              Ingest & Understand
            </p>
            <p className="text-[10px] text-gray-500">
              We extract and organize your content securely
            </p>
          </div>
          <div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xs font-bold text-blue-700">3</span>
            </div>
            <p className="text-xs font-medium text-gray-900">
              Deliver Intelligence
            </p>
            <p className="text-[10px] text-gray-500">
              AI-powered search and answers with citations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
