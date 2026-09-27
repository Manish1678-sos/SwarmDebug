"use client";

import type { ReactNode } from "react";
import { Check, Loader2, X } from "lucide-react";

export function Badge({ 
  children, 
  tone = "neutral" 
}: { 
  children: ReactNode; 
  tone?: "neutral" | "success" | "warn" | "danger" 
}) {
  const colors = {
    neutral: "border-white/10 text-[#91aaa5] bg-white/[0.02]",
    success: "border-[#c7ff5e]/30 text-[#c7ff5e] bg-[#c7ff5e]/5",
    warn: "border-[#ffb86b]/30 text-[#ffb86b] bg-[#ffb86b]/5",
    danger: "border-[#ff6b76]/30 text-[#ff8b94] bg-[#ff6b76]/5",
  };

  return (
    <span className={`inline-flex items-center border px-2 py-1 text-[10px] font-semibold uppercase tracking-[.12em] ${colors[tone]}`}>
      {children}
    </span>
  );
}

export function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const styles = {
    primary: "bg-[#c7ff5e] text-[#071015] hover:bg-white disabled:opacity-50",
    secondary: "border border-white/15 text-white hover:border-[#c7ff5e]/60 disabled:opacity-50",
    ghost: "text-[#91aaa5] hover:text-white disabled:opacity-50",
  };

  return (
    <button 
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-[.1em] transition ${styles[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}

export function Panel({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  return (
    <section className={`border border-white/10 bg-[#0b181c] shadow-xl ${className}`}>
      {children}
    </section>
  );
}

export function StatusDot({ 
  status 
}: { 
  status: "active" | "complete" | "error" | "idle" 
}) {
  if (status === "active") {
    return (
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c7ff5e] opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c7ff5e]"></span>
      </span>
    );
  }

  if (status === "complete") {
    return (
      <span className="grid h-4 w-4 place-items-center rounded-full bg-[#c7ff5e] text-[#071015]">
        <Check size={10} strokeWidth={3} />
      </span>
    );
  }

  if (status === "error") {
    return (
      <span className="grid h-4 w-4 place-items-center rounded-full bg-[#ff6b76] text-[#071015]">
        <X size={10} strokeWidth={3} />
      </span>
    );
  }

  if (status === "idle") {
    return (
      <span className="grid h-4 w-4 place-items-center rounded-full bg-[#6f8983] text-[#071015]">
        <X size={10} strokeWidth={3} />
      </span>
    );
  }

  return <Loader2 size={14} className="animate-spin text-[#6f8983]" />;
}