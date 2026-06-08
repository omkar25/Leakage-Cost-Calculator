"use client";

import { useState } from "react";
import { Send, ThumbsUp, ThumbsDown, FileText } from "lucide-react";
import { mockChatHistory, ChatMessage } from "@/data/mock-data";

const sourceTypeColors: Record<string, string> = {
  sharepoint: "bg-blue-100 text-blue-700",
  confluence: "bg-orange-100 text-orange-700",
  zendesk: "bg-green-100 text-green-700",
  google_drive: "bg-yellow-100 text-yellow-700",
  email: "bg-purple-100 text-purple-700",
  teams: "bg-indigo-100 text-indigo-700",
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I found relevant information across your connected sources. Based on your company policies and recent communications, here is what I found...",
        confidence: 89,
        sources: [
          {
            id: "auto1",
            title: "Related Policy Document",
            type: "google_drive",
            lastUpdated: "2024-05-10",
            owner: "Operations",
          },
          {
            id: "auto2",
            title: "Team Discussion Thread",
            type: "teams",
            lastUpdated: "2024-05-11",
            owner: "Support Team",
          },
        ],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">
          AI Knowledge Assistant
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Ask anything. Get trusted answers instantly from Email, Teams & Google
          Drive.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3"
                  : "bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>

              {msg.confidence && (
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    Confidence: {msg.confidence}%
                  </span>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-green-600 transition-colors">
                      <ThumbsUp size={14} />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                </div>
              )}

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Sources ({msg.sources.length})
                  </p>
                  <div className="space-y-1.5">
                    {msg.sources.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-center gap-2 text-xs"
                      >
                        <FileText size={12} className="text-gray-400" />
                        <span className="text-gray-700 font-medium">
                          {source.title}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${sourceTypeColors[source.type] || "bg-gray-100 text-gray-600"}`}
                        >
                          {source.type.replace("_", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <input
            type="text"
            placeholder="Ask a follow-up question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
