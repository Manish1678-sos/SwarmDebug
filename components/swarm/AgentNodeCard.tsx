import type { Agent } from "@/lib/swarmEngine";
import { StatusDot } from "@/components/ui";

export function AgentNodeCard({ agent }: { agent: Agent }) {
  return (
    <div className="border border-white/10 bg-[#071015] p-4">
      <div className="flex items-center gap-3">
        <StatusDot
          status={agent.status === "complete" ? "complete" : "active"}
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white">
              {agent.name}
            </span>
            <span className="font-mono text-[10px] text-[#6f8983]">
              {agent.progress}%
            </span>
          </div>
          {agent.role && (
            <div className="mt-1 text-xs text-[#6f8983]">
              {agent.role}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 h-1 bg-white/10">
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${agent.progress}%`,
            backgroundColor: agent.color,
          }}
        />
      </div>

      <div className="mt-3 text-[10px] uppercase tracking-[.12em] text-[#91aaa5]">
        {agent.status}
      </div>
    </div>
  );
}