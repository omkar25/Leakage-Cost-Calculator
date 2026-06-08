"use client";

import { useState } from "react";
import { Search, Filter, ExternalLink } from "lucide-react";
import { mockSearchResults, SearchResult } from "@/data/mock-data";

const sourceTypeIcons: Record<string, string> = {
  sharepoint: "SP",
  confluence: "CF",
  zendesk: "ZD",
  google_drive: "GD",
  email: "EM",
  teams: "TM",
};

const sourceTypeColors: Record<string, string> = {
  sharepoint: "bg-blue-100 text-blue-700",
  confluence: "bg-orange-100 text-orange-700",
  zendesk: "bg-green-100 text-green-700",
  google_drive: "bg-yellow-100 text-yellow-700",
  email: "bg-purple-100 text-purple-700",
  teams: "bg-indigo-100 text-indigo-700",
};

const categoryColors: Record<string, string> = {
  Policy: "bg-blue-50 text-blue-700 border-blue-200",
  SOP: "bg-purple-50 text-purple-700 border-purple-200",
  Article: "bg-green-50 text-green-700 border-green-200",
  Deck: "bg-orange-50 text-orange-700 border-orange-200",
  Email: "bg-pink-50 text-pink-700 border-pink-200",
  Playbook: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export default function UnifiedSearch() {
  const [query, setQuery] = useState("refund policy");
  const [results] = useState<SearchResult[]>(mockSearchResults);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    mockSearchResults[0]
  );

  return (
    <div className="flex h-full">
      {/* Search Results Panel */}
      <div className="w-1/2 border-r border-gray-200 flex flex-col">
        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            Unified Search
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across all connected systems..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-900"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} className="text-gray-500" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Top Results for &ldquo;{query}&rdquo;
          </p>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => setSelectedResult(result)}
              className={`w-full text-left px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedResult?.id === result.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold shrink-0 ${sourceTypeColors[result.source.type]}`}
                >
                  {sourceTypeIcons[result.source.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {result.title}
                    </h3>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded border font-medium shrink-0 ${categoryColors[result.category] || "bg-gray-50 text-gray-600 border-gray-200"}`}
                    >
                      {result.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {result.description}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    ▲ {result.source.type.replace("_", " ")}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-gray-200">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all results →
          </button>
        </div>
      </div>

      {/* Document Preview Panel */}
      <div className="w-1/2 flex flex-col">
        {selectedResult ? (
          <>
            <div className="px-6 py-4 border-b border-gray-200">
              <button className="text-xs text-blue-600 hover:text-blue-800 mb-2">
                ← Back to answer
              </button>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">
                  {selectedResult.title}
                </h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-medium ${sourceTypeColors[selectedResult.source.type]}`}
                >
                  {selectedResult.source.type.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-xs font-medium text-blue-600 mb-1">
                  Section 4.2 – Refund Window
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Customers may request a refund within 60 days of the purchase
                  date. Requests made after 60 days will be reviewed on a
                  case-by-case basis.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Document Details
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Source</span>
                    <p className="font-medium text-gray-900">
                      {selectedResult.source.type.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated</span>
                    <p className="font-medium text-gray-900">
                      {selectedResult.source.lastUpdated}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Owner</span>
                    <p className="font-medium text-gray-900">
                      {selectedResult.source.owner}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Classification</span>
                    <p className="font-medium text-gray-900">Internal</p>
                  </div>
                </div>
              </div>

              <button className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                <ExternalLink size={14} />
                View original document
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Select a result to preview
          </div>
        )}
      </div>
    </div>
  );
}
