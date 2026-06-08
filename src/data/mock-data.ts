// Mock data models for CXPortal Knowledge OS
// These will be replaced with API calls later

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  sources?: SourceReference[];
  timestamp: string;
}

export interface SourceReference {
  id: string;
  title: string;
  type: "email" | "teams" | "google_drive" | "sharepoint" | "confluence" | "zendesk";
  snippet?: string;
  url?: string;
  lastUpdated?: string;
  owner?: string;
  classification?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  source: SourceReference;
  relevanceScore: number;
  category: string;
}

export interface AnalyticsData {
  totalSearches: number;
  totalSearchesTrend: number;
  questionsAnswered: number;
  questionsAnsweredTrend: number;
  avgTimeSaved: string;
  timeSavedTotal: string;
  timeSavedTrend: number;
  estimatedValueCreated: string;
  answerAccuracy: number;
  answerAccuracyTrend: number;
  topTopics: { name: string; count: number }[];
}

export interface ConnectedSource {
  id: string;
  name: string;
  type: "email" | "teams" | "google_drive" | "sharepoint" | "confluence" | "zendesk";
  status: "connected" | "disconnected" | "syncing";
  documentsIndexed: number;
  lastSynced: string;
}

// --- Mock Data ---

export const mockChatHistory: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Can we refund a customer after 45 days?",
    timestamp: "2024-05-12T10:30:00Z",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Yes. Customers can receive a refund within 60 days of the purchase date, in accordance with our Refund Policy.",
    confidence: 96,
    sources: [
      {
        id: "s1",
        title: "Refund Policy v3",
        type: "sharepoint",
        lastUpdated: "2024-05-12",
        owner: "Customer Operations",
        classification: "Internal",
      },
      {
        id: "s2",
        title: "SOP 14 – Refund Process",
        type: "confluence",
        lastUpdated: "2024-04-20",
        owner: "Operations Team",
      },
      {
        id: "s3",
        title: "Zendesk Article #44",
        type: "zendesk",
        lastUpdated: "2024-03-15",
        owner: "Support Team",
      },
    ],
    timestamp: "2024-05-12T10:30:05Z",
  },
  {
    id: "3",
    role: "user",
    content: "What is the process for handling escalated billing disputes?",
    timestamp: "2024-05-12T11:15:00Z",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Escalated billing disputes should be routed to the Billing Resolutions team within 24 hours. The team lead reviews and assigns a priority level. Resolution SLA is 48 hours for standard disputes and 24 hours for high-value accounts (>$10k).",
    confidence: 92,
    sources: [
      {
        id: "s4",
        title: "Billing Dispute SOP",
        type: "google_drive",
        lastUpdated: "2024-05-01",
        owner: "Finance Team",
      },
      {
        id: "s5",
        title: "Escalation Procedures - Teams Channel",
        type: "teams",
        lastUpdated: "2024-05-10",
        owner: "Support Leadership",
      },
    ],
    timestamp: "2024-05-12T11:15:08Z",
  },
];

export const mockSearchResults: SearchResult[] = [
  {
    id: "r1",
    title: "Refund Policy v3",
    description: "Refunds, Returns & Cancellations",
    source: {
      id: "s1",
      title: "Refund Policy v3",
      type: "sharepoint",
      lastUpdated: "2024-05-12",
      owner: "Customer Operations",
    },
    relevanceScore: 98,
    category: "Policy",
  },
  {
    id: "r2",
    title: "SOP 14 – Refund Process",
    description: "Standard Operating Procedure",
    source: {
      id: "s2",
      title: "SOP 14 – Refund Process",
      type: "confluence",
      lastUpdated: "2024-04-20",
      owner: "Operations Team",
    },
    relevanceScore: 91,
    category: "SOP",
  },
  {
    id: "r3",
    title: "Zendesk Article #44",
    description: "Customer refunds within 60 days",
    source: {
      id: "s3",
      title: "Zendesk Article #44",
      type: "zendesk",
      lastUpdated: "2024-03-15",
      owner: "Support Team",
    },
    relevanceScore: 85,
    category: "Article",
  },
  {
    id: "r4",
    title: "Returns & Refund Training Deck",
    description: "Training Material",
    source: {
      id: "s6",
      title: "Returns & Refund Training Deck",
      type: "google_drive",
      lastUpdated: "2024-02-28",
      owner: "Training Department",
    },
    relevanceScore: 78,
    category: "Deck",
  },
  {
    id: "r5",
    title: "Q1 Billing Updates - Email Thread",
    description: "Policy changes discussion from leadership",
    source: {
      id: "s7",
      title: "Q1 Billing Updates",
      type: "email",
      lastUpdated: "2024-03-01",
      owner: "VP Operations",
    },
    relevanceScore: 72,
    category: "Email",
  },
  {
    id: "r6",
    title: "Customer Success Playbook",
    description: "Account management and retention strategies",
    source: {
      id: "s8",
      title: "Customer Success Playbook",
      type: "teams",
      lastUpdated: "2024-04-15",
      owner: "CS Team",
    },
    relevanceScore: 65,
    category: "Playbook",
  },
];

export const mockAnalytics: AnalyticsData = {
  totalSearches: 12842,
  totalSearchesTrend: 18,
  questionsAnswered: 11302,
  questionsAnsweredTrend: 21,
  avgTimeSaved: "4.6 min",
  timeSavedTotal: "984 hrs",
  timeSavedTrend: 22,
  estimatedValueCreated: "$87,000",
  answerAccuracy: 96,
  answerAccuracyTrend: 4.6,
  topTopics: [
    { name: "Refunds", count: 2842 },
    { name: "Billing", count: 2103 },
    { name: "Account Updates", count: 1732 },
    { name: "Shipping", count: 1415 },
    { name: "Technical Issues", count: 1210 },
  ],
};

export const mockConnectedSources: ConnectedSource[] = [
  {
    id: "cs1",
    name: "Gmail / Outlook",
    type: "email",
    status: "connected",
    documentsIndexed: 15420,
    lastSynced: "2024-05-12T09:00:00Z",
  },
  {
    id: "cs2",
    name: "Microsoft Teams",
    type: "teams",
    status: "connected",
    documentsIndexed: 8930,
    lastSynced: "2024-05-12T08:45:00Z",
  },
  {
    id: "cs3",
    name: "Google Drive",
    type: "google_drive",
    status: "connected",
    documentsIndexed: 4280,
    lastSynced: "2024-05-12T07:30:00Z",
  },
  {
    id: "cs4",
    name: "SharePoint",
    type: "sharepoint",
    status: "syncing",
    documentsIndexed: 6750,
    lastSynced: "2024-05-12T06:00:00Z",
  },
  {
    id: "cs5",
    name: "Confluence",
    type: "confluence",
    status: "connected",
    documentsIndexed: 2190,
    lastSynced: "2024-05-11T23:00:00Z",
  },
  {
    id: "cs6",
    name: "Zendesk",
    type: "zendesk",
    status: "disconnected",
    documentsIndexed: 3100,
    lastSynced: "2024-05-10T12:00:00Z",
  },
];
