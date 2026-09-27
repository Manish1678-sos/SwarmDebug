"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, GitBranch, Rocket, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Button, Panel } from "@/components/ui";
import { createSwarmId, repositories } from "@/lib/db";

export default function NewSwarmPage() {
  const router = useRouter();
  const [repo, setRepo] = useState(repositories[0]?.id || "identity-service");
  const [log, setLog] = useState(
    "Error: refresh token rejected by worker pool\n  at Session.refresh (auth/session.ts:117:19)\n  at Worker.process (worker/pool.ts:84:11)"
  );
  const [model, setModel] = useState("IBM Granite");
  const [aggressive, setAggressive] = useState(true);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-[#6f8983] hover:text-white"
      >
        <ArrowLeft size={14} /> Back to command center
      </Link>
      <div className="mb-8">
        <div className="mb-3 text-[10px] uppercase tracking-[.2em] text-[#c7ff5e]">
          Deployment protocol / 01
        </div>
        <h1 className="text-3xl font-semibold tracking-[-.04em] text-white">
          Deploy a new swarm
        </h1>
        <p className="mt-2 text-sm text-[#6f8983]">
          Give the agents enough context to find the smallest safe fix.
        </p>
      </div>

      <Panel className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-[#91aaa5]">
              <GitBranch size={14} /> Repository
            </span>
            <select
              value={repo}
              onChange={(event) => setRepo(event.target.value)}
              className="w-full appearance-none border border-white/10 bg-[#071015] px-4 py-3 text-sm text-white outline-none focus:border-[#c7ff5e]/60"
            >
              {repositories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} / {item.branch}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-[#91aaa5]">
              <SlidersHorizontal size={14} /> AI model
            </span>
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="w-full appearance-none border border-white/10 bg-[#071015] px-4 py-3 text-sm text-white outline-none focus:border-[#c7ff5e]/60"
            >
              <option>IBM Granite</option>
              <option>Claude 3.5 Sonnet</option>
              <option>GPT-4o</option>
            </select>
          </label>
        </div>

        <label className="mt-6 block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-[#91aaa5]">
            <FileText size={14} /> Stack trace / error log
          </span>
          <textarea
            value={log}
            onChange={(event) => setLog(event.target.value)}
            rows={8}
            className="w-full resize-none border border-white/10 bg-[#071015] p-4 font-mono text-xs leading-6 text-[#d8eae6] outline-none focus:border-[#c7ff5e]/60"
          />
        </label>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <div>
            <div className="text-sm text-white">Aggressive swarm mode</div>
            <div className="mt-1 text-xs text-[#6f8983]">
              Allow broader repository exploration and multi-file patches
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAggressive(!aggressive)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border-2 border-transparent transition-colors duration-200 ease-in-out ${
              aggressive ? "bg-[#c7ff5e]" : "bg-white/15"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform bg-[#071015] shadow-lg ring-0 transition duration-200 ease-in-out ${
                aggressive ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <Button
          className="mt-8 w-full flex items-center justify-center gap-2"
          onClick={() =>
            router.push(
              `/swarms/${createSwarmId()}?repo=${repo}&model=${encodeURIComponent(
                model
              )}&aggressive=${aggressive}`
            )
          }
        >
          <Rocket size={16} /> Deploy swarm
        </Button>
      </Panel>
    </div>
  );
}