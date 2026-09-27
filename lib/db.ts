export type RepoStatus = "Synced" | "Syncing" | "Error";
export type AgentStatus = "idle" | "analyzing" | "diagnosing" | "writing" | "complete";

export type Repository = {
  id: string;
  name: string;
  branch: string;
  language: string;
  status: RepoStatus;
  health: number;
  lastScan: string;
  anomalies: number;
};

export type Incident = {
  id: string;
  title: string;
  repo: string;
  severity: "Critical" | "High" | "Medium";
  status: "Investigating" | "Resolved" | "Queued";
  age: string;
  confidence: number;
};

export type SwarmLog = {
  id: string;
  timestamp: string;
  agent: string;
  message: string;
  tone: "muted" | "info" | "success" | "warn";
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  progress: number;
  color: string;
};

export const repositories: Repository[] = [
  { id: "payments-api", name: "payments-api", branch: "main", language: "TypeScript", status: "Synced", health: 99, lastScan: "2m ago", anomalies: 0 },
  { id: "checkout-web", name: "checkout-web", branch: "release/4.8", language: "React", status: "Syncing", health: 94, lastScan: "18m ago", anomalies: 3 },
  { id: "identity-service", name: "identity-service", branch: "main", language: "Go", status: "Error", health: 81, lastScan: "1h ago", anomalies: 7 },
  { id: "data-pipeline", name: "data-pipeline", branch: "develop", language: "Python", status: "Synced", health: 97, lastScan: "6m ago", anomalies: 1 },
];

export const incidents: Incident[] = [
  { id: "SD-2048", title: "Stale refresh token in worker pool", repo: "identity-service", severity: "Critical", status: "Investigating", age: "8m", confidence: 94.7 },
  { id: "SD-2047", title: "Hydration mismatch on cart drawer", repo: "checkout-web", severity: "High", status: "Resolved", age: "42m", confidence: 98.1 },
  { id: "SD-2046", title: "Payment retry backoff drift", repo: "payments-api", severity: "Medium", status: "Resolved", age: "2h", confidence: 96.4 },
  { id: "SD-2045", title: "Null pointer in shipment mapper", repo: "data-pipeline", severity: "High", status: "Queued", age: "3h", confidence: 89.2 },
];

export const initialAgents: Agent[] = [
  { id: "agent-log", name: "Log Hunter", role: "Signal & Stack Trace Analysis", status: "complete", progress: 100, color: "#c7ff5e" },
  { id: "agent-state", name: "State Diagnostician", role: "Dependency & Memory Mapping", status: "analyzing", progress: 74, color: "#59d5c5" },
  { id: "agent-patch", name: "Resolution Synthesizer", role: "Guardrailed Patch Generator", status: "idle", progress: 30, color: "#ffb86b" },
];

export const metrics = { 
  activeSwarms: 3, 
  criticalAnomalies: 12, 
  autoFixedPrs: 148, 
  health: 98.4, 
  mttr: "18m 42s", 
  accuracy: 96.8 
};

export function getRepository(id: string): Repository {
  return repositories.find((repo) => repo.id === id) ?? repositories[0];
}

export function createSwarmId(): string {
  return `SD-${Math.floor(2050 + Math.random() * 900)}`;
}