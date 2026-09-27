"use client";
import Link from "next/link";
import { useState, Suspense } from "react";
import { ArrowLeft, ArrowUpRight, LockKeyhole, Zap } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const defaultEmail = searchParams.get("email") || "";
  const defaultPassword = searchParams.get("password") || "";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      return setError("Enter your workspace credentials to continue.");
    }
    
    localStorage.setItem("swarmdebug.session", "active");
    router.push("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#071015] px-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[.14em] text-[#6f8983]"
        >
          <ArrowLeft size={14} /> Back home
        </Link>
        <div className="mb-8 flex items-center gap-3 text-sm font-bold tracking-[.18em] text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#c7ff5e] text-[#071015]">
            <Zap size={17} fill="currentColor" />
          </span>
          SWARMDEBUG
        </div>
        <div className="border border-white/10 bg-[#0b181c] p-7">
          <div className="mb-7">
            <div className="mb-3 text-[10px] uppercase tracking-[.2em] text-[#c7ff5e]">
              Secure workspace access
            </div>
            <h1 className="text-2xl font-semibold text-white">Welcome back.</h1>
            <p className="mt-2 text-sm text-[#6f8983]">
              Sign in to your engineering command center.
            </p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-xs text-[#91aaa5]">
              Work email
              <input
                name="email"
                type="email"
                defaultValue={defaultEmail}
                placeholder="you@company.com"
                className="mt-2 w-full border border-white/10 bg-[#071015] px-4 py-3 text-sm text-white outline-none focus:border-[#c7ff5e]/60"
              />
            </label>
            <label className="block text-xs text-[#91aaa5]">
              Password
              <input
                name="password"
                type="password"
                defaultValue={defaultPassword}
                placeholder="••••••••"
                className="mt-2 w-full border border-white/10 bg-[#071015] px-4 py-3 text-sm text-white outline-none focus:border-[#c7ff5e]/60"
              />
            </label>
            {error && <p className="text-xs text-[#ff8b94]">{error}</p>}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-[#c7ff5e] px-4 py-3 text-xs font-bold uppercase tracking-[.1em] text-[#071015] hover:bg-white"
            >
              <LockKeyhole size={14} /> Sign in <ArrowUpRight size={14} />
            </button>
          </form>
          <div className="mt-6 border-t border-white/10 pt-5 text-center text-xs text-[#6f8983]">
            New to SwarmDebug?{" "}
            <Link href="/signup" className="text-[#c7ff5e]">
              Create workspace
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#071015]" />}>
      <LoginForm />
    </Suspense>
  );
}