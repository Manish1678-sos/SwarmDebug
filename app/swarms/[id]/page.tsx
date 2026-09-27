"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Check, GitPullRequest, Pause, Play, RotateCcw, Terminal } from "lucide-react";
import { advanceSwarm, initialSwarmSnapshot, type SwarmSnapshot } from "@/lib/swarmEngine";
import { Badge, Button, Panel, StatusDot } from "@/components/ui";

export default function SwarmPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Safely resolve route params directly
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const id = resolvedParams?.id || "SD-2048";

  const [snapshot, setSnapshot] = useState<SwarmSnapshot>(initialSwarmSnapshot);
  const [running, setRunning] = useState(true);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (!running || snapshot.diffReady) return;
    const timer = setInterval(
      () => setSnapshot((current) => advanceSwarm(current, current.logs.length)),
      1500
    );
    return () => clearInterval(timer);
  }, [running, snapshot.diffReady]);

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-[#6f8983]"
          >
            <ArrowLeft size={14} /> Command center
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-[-.04em] text-white">
              Swarm {id}
            </h1>
            <Badge tone={snapshot.diffReady ? "success" : "warn"}>
              {snapshot.phase}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-[#6f8983]">
            identity-service / main · IBM Granite · aggressive mode
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setRunning(!running)}
          >
            {running ? <Pause size={14} /> : <Play size={14} />}
            {running ? "Pause" : "Resume"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setSnapshot(initialSwarmSnapshot())}
          >
            <RotateCcw size={14} /> Restart
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[.16em] text-[#6f8983]">
                Agent topology
              </div>
              <h2 className="mt-2 text-sm font-semibold text-white">
                Concurrent execution
              </h2>
            </div>
            <div className="font-mono text-xs text-[#c7ff5e]">
              {snapshot.confidence.toFixed(1)}% conf.
            </div>
          </div>
          <div className="space-y-3">
            {snapshot.agents.map((agent) => (
              <div key={agent.id} className="border border-white/10 bg-[#071015] p-4">
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
                    <div className="mt-1 text-xs text-[#6f8983]">
                      {agent.role}
                    </div>
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
            ))}
          </div>
          <div className="mt-6 border border-[#c7ff5e]/20 bg-[#101f1e] p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#91aaa5]">Orchestrator confidence</span>
              <span className="font-mono text-[#c7ff5e]">
                {snapshot.confidence.toFixed(1)}%
              </span>
            </div>
            <div className="mt-3 h-1 bg-white/10">
              <div
                className="h-full bg-[#c7ff5e] transition-all duration-700"
                style={{ width: `${snapshot.confidence}%` }}
              />
            </div>
          </div>
        </Panel>

        <Panel className="min-h-[560px] overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 bg-[#091418] px-5 py-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Terminal size={15} className="text-[#c7ff5e]" /> Live execution stream
              </div>
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[.12em] text-[#c7ff5e]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c7ff5e]" />{" "}
                Streaming
              </span>
            </div>
            <div className="space-y-3 p-5 font-mono text-[11px] leading-5">
              {snapshot.logs.map((log) => (
                <div key={log.id} className="flex gap-3">
                  <span className="shrink-0 text-[#506963]">{log.timestamp}</span>
                  <span
                    className={
                      log.tone === "success"
                        ? "text-[#c7ff5e]"
                        : log.tone === "warn"
                        ? "text-[#ffb86b]"
                        : "text-[#91aaa5]"
                    }
                  >
                    <b className="text-white">[{log.agent}]</b> {log.message}
                  </span>
                </div>
              ))}
              {snapshot.diffReady && (
                <div className="mt-5 border border-[#c7ff5e]/25 bg-[#101f1e] p-4 text-[#d8eae6]">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#c7ff5e]">
                    <GitPullRequest size={14} /> PATCH PREVIEW / auth/session.ts
                  </div>
                  <div className="text-[#ff8b94]">
                    - await tokenStore.write(nextToken)
                  </div>
                  <div className="text-[#c7ff5e]">
                    + await tokenStore.writeIfCurrent(version, nextToken)
                  </div>
                  <div className="mt-3 text-[10px] text-[#6f8983]">
                    + 14 lines · - 3 lines · 4 regression tests added
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 p-5">
            {approved ? (
              <div className="flex items-center gap-2 text-sm text-[#c7ff5e]">
                <Check size={16} /> Pull request queued for GitHub review.
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  disabled={!snapshot.diffReady}
                  onClick={() => setApproved(true)}
                >
                  <GitPullRequest size={15} /> Approve & push PR
                </Button>
                <Button variant="secondary">
                  <span className="text-[#ff8b94]">Discard patch</span>
                </Button>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}