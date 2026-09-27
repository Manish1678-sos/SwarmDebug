import type { AgentStatus, SwarmLog } from "./db";

export type Agent = {
  id: string;
  name: string;
  shortName: string;
  role: string;
  status: AgentStatus;
  progress: number;
  color: string;
};

export type SwarmSnapshot = {
  agents: Agent[];
  logs: SwarmLog[];
  phase: string;
  confidence: number;
  diffReady: boolean;
};

const blueprints = [
  { id: "log", name: "Log / Data Agent", shortName: "LOG", role: "Trace correlation", color: "#c7ff5e" },
  { id: "state", name: "Frontend / State Agent", shortName: "STATE", role: "State diagnosis", color: "#59d5c5" },
  { id: "patch", name: "Patch / Resolution Agent", shortName: "PATCH", role: "Patch synthesis", color: "#ffb86b" },
];

const messages = [
  ["LOG", "Indexed 4,218 log lines across 6 services. 12 correlated events found.", "info"],
  ["STATE", "Reproduced stale token race under concurrent worker refresh.", "warn"],
  ["LOG", "Call chain converged on auth/session.ts:117 and worker/pool.ts:84.", "info"],
  ["STATE", "State transition is missing an atomic guard around refresh promise.", "success"],
  ["PATCH", "Synthesizing minimal patch with regression coverage.", "info"],
  ["PATCH", "Candidate diff ready. Confidence score 94.7%.", "success"],
] as const;

export function initialSwarmSnapshot(): SwarmSnapshot {
  return {
    agents: blueprints.map((agent) => ({ ...agent, status: "analyzing", progress: 8 })),
    logs: [
      {
        id: "boot",
        timestamp: "09:41:02",
        agent: "ORCHESTRATOR",
        message: "Swarm dispatched. Parallel context windows opened for 3 agents.",
        tone: "info",
      },
    ],
    phase: "Signal ingestion",
    confidence: 61.2,
    diffReady: false,
  };
}

export function advanceSwarm(snapshot: SwarmSnapshot, tick: number): SwarmSnapshot {
  const step = Math.min(tick, messages.length);

  const agents = snapshot.agents.map((agent, index) => {
    const progress = Math.min(
      100,
      8 + Math.max(0, step - index) * 20 + (agent.id === "patch" ? Math.max(0, step - 3) * 12 : 0)
    );
    const status: AgentStatus =
      progress >= 100 ? "complete" : progress > 70 ? "writing" : progress > 35 ? "diagnosing" : "analyzing";
    return { ...agent, progress, status };
  });

  const logs =
    step === 0
      ? snapshot.logs
      : [
          ...snapshot.logs,
          {
            id: `log-${step}`,
            timestamp: `09:41:${String(2 + step * 4).padStart(2, "0")}`,
            agent: messages[step - 1][0],
            message: messages[step - 1][1],
            tone: messages[step - 1][2] as SwarmLog["tone"],
          },
        ];

  return {
    agents,
    logs,
    phase:
      step >= 6
        ? "Ready for approval"
        : step >= 4
        ? "Patch synthesis"
        : step >= 2
        ? "Root cause diagnosis"
        : "Signal ingestion",
    confidence: Math.min(94.7, 61.2 + step * 6.2),
    diffReady: step >= 6,
  };
}