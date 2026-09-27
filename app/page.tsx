"use client";

import Link from "next/link";
import { ArrowUpRight, BrainCircuit, CheckCircle2, GitBranch, Radar, ShieldCheck, Zap } from "lucide-react";

const features = [
  { icon: Radar, title: "Parallel signal hunting", text: "Three specialized agents inspect logs, state, and code at the same time." },
  { icon: BrainCircuit, title: "Context-aware diagnosis", text: "Trace symptoms across repository history, runtime state, and dependency graphs." },
  { icon: ShieldCheck, title: "Guardrailed resolution", text: "Review an explainable patch before it ever reaches a protected branch." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#071015] text-[#e7f4f1]">
      <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-6 lg:px-10">
        <nav className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#c7ff5e] text-[#071015]"><Zap size={17} fill="currentColor" /></span>
            SWARM<span className="text-[#8ba7a1]">DEBUG</span>
          </Link>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.16em] text-[#91aaa5] md:flex">
            <span>Runtime intelligence</span><span>Agent orchestration</span><span>v0.9.4</span>
          </div>
          <Link href="/login" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c7ff5e] hover:underline">
            Sign in <ArrowUpRight className="ml-1 inline" size={14} />
          </Link>
        </nav>

        <section className="relative grid min-h-[640px] items-center gap-16 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div className="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-[#1b6b63]/20 blur-[120px]" />
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 border border-[#c7ff5e]/25 bg-[#c7ff5e]/5 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[#c7ff5e]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c7ff5e]" /> Autonomous debugging control plane
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-0.055em] text-white sm:text-7xl lg:text-[6.6rem]">
              Autonomous Multi-Agent <span className="text-[#c7ff5e]">Code Anomaly Resolution.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#91aaa5]">
              SwarmDebug turns noisy production signals into reviewed, explainable pull requests. Deploy a coordinated team of AI agents against your hardest incident.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/signup" className="flex items-center gap-3 bg-[#c7ff5e] px-5 py-3 text-sm font-bold text-[#071015] transition hover:bg-white">
                Get started <ArrowUpRight size={17} />
              </Link>
              <Link href="/dashboard" className="border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#c7ff5e]/70">
                Launch console
              </Link>
            </div>
            <div className="mt-16 grid max-w-lg grid-cols-3 gap-5 border-t border-white/10 pt-6">
              <div>
                <div className="text-2xl font-semibold text-white">98.4%</div>
                <div className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#6f8983]">system health</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">2.4m</div>
                <div className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#6f8983]">logs analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">14.8k</div>
                <div className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#6f8983]">fixes shipped</div>
              </div>
            </div>
          </div>

          <div className="relative border border-white/10 bg-[#0b181c] p-5 shadow-2xl shadow-[#11332e]/30">
            <div className="absolute -right-2 -top-2 h-16 w-16 border-r border-t border-[#c7ff5e]/50" />
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[.14em] text-white">
                <span className="h-2 w-2 rounded-full bg-[#c7ff5e]" /> LIVE SWARM / SD-2048
              </div>
              <span className="text-[10px] uppercase text-[#6f8983]">00:02:41</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-6">
              {["LOG / DATA", "FRONTEND / STATE", "PATCH / RESOLUTION"].map((label, index) => (
                <div key={label} className="border border-white/10 p-3">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#c7ff5e]" />
                    <span className="text-[9px] text-[#6f8983]">0{index + 1}</span>
                  </div>
                  <div className="text-[10px] leading-4 text-[#d8eae6]">{label}</div>
                  <div className="mt-3 text-[9px] uppercase text-[#c7ff5e]">
                    {index === 0 ? "Analyzing" : index === 1 ? "Diagnosing" : "Writing patch"}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t border-white/10 pt-5 font-mono text-[11px] leading-5">
              <div className="text-[#6f8983]">09:41:02 <span className="text-[#c7ff5e]">swarm</span> dispatched 3 agents</div>
              <div className="text-[#91aaa5]">09:41:08 <span className="text-[#d8eae6]">dependency graph converged on auth/session.ts</span></div>
              <div className="text-[#91aaa5]">09:41:12 <span className="text-[#d8eae6]">reproduced stale token race in worker pool</span></div>
              <div className="text-[#c7ff5e]">09:41:18 <span className="text-white">candidate patch ready for review_</span></div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[.12em] text-[#6f8983]">
              <span>confidence <b className="text-[#c7ff5e]">94.7%</b></span>
              <span>branch fix/sd-2048</span>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-3 text-[10px] uppercase tracking-[.22em] text-[#c7ff5e]">Built for the messy middle</div>
              <h2 className="text-3xl font-semibold tracking-[-.04em] text-white">One incident. A whole team of specialists.</h2>
            </div>
            <span className="hidden text-xs text-[#6f8983] md:block">01 / 03</span>
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-[#071015] p-7 transition hover:bg-[#0b181c]">
                <Icon size={20} className="mb-16 text-[#c7ff5e]" />
                <h3 className="text-xl font-medium text-white">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#7f9993]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[.16em] text-[#6f8983] md:flex-row">
          <span>SwarmDebug / engineering intelligence</span>
          <span className="flex items-center gap-2"><GitBranch size={13} /> Git-native. Human-approved.</span>
          <span className="flex items-center gap-2 text-[#c7ff5e]"><CheckCircle2 size={13} /> all systems operational</span>
        </footer>
      </div>
    </main>
  );
}