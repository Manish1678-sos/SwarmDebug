"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap, ArrowLeft } from "lucide-react";
import { Panel } from "@/components/ui";

export default function SignupPage() {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const handleCreateWorkspace = () => {
    // Save session to localStorage
    const sessionData = {
      name,
      email,
      workspaceCreated: new Date().toISOString(),
    };
    localStorage.setItem("swarmdebug.session", JSON.stringify(sessionData));

    // Force direct browser navigation to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen bg-[#071015] text-[#e7f4f1] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-[#6f8983] hover:text-white"
        >
          <ArrowLeft size={14} /> Back home
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#c7ff5e] text-[#071015]">
            <Zap size={22} fill="currentColor" />
          </div>
          <span className="text-xs font-semibold tracking-[0.18em] text-white">
            SWARM<span className="text-[#8ba7a1]">DEBUG</span>
          </span>
        </div>

        <Panel className="p-8">
          <div className="mb-6">
            <div className="mb-2 text-[10px] uppercase tracking-[.2em] text-[#c7ff5e]">
              Provision workspace
            </div>
            <h1 className="text-2xl font-semibold tracking-[-.04em] text-white">
              Start debugging at swarm speed.
            </h1>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[.12em] text-[#91aaa5] mb-2">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-white/10 bg-[#071015] px-4 py-3 text-sm text-white outline-none focus:border-[#c7ff5e]/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[.12em] text-[#91aaa5] mb-2">
                Work email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-white/10 bg-[#071015] px-4 py-3 text-sm text-white outline-none focus:border-[#c7ff5e]/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[.12em] text-[#91aaa5] mb-2">
                Create password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-white/10 bg-[#071015] px-4 py-3 text-sm text-white outline-none focus:border-[#c7ff5e]/60"
              />
            </div>

            <button
              type="button"
              onClick={handleCreateWorkspace}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#c7ff5e] text-[#071015] font-bold text-xs uppercase tracking-[.1em] hover:bg-white transition cursor-pointer"
            >
              <Check size={16} /> Create workspace
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-[#6f8983]">
            Already have access?{" "}
            <Link href="/login" className="text-[#c7ff5e] hover:underline">
              Sign in
            </Link>
          </div>
        </Panel>
      </div>
    </main>
  );
}