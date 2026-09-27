"use client";

import { useState } from "react";
import { Check, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui";

export function PatchApprovalModal({ onApprove }: { onApprove: () => void }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[#c7ff5e] text-[#071015] hover:bg-white"
      >
        <ShieldAlert size={14} /> Review patch
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-lg border border-white/10 bg-[#0b181c] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
            Approve resolution patch
          </h2>
          <button 
            onClick={() => setOpen(false)} 
            aria-label="Close"
            className="text-[#6f8983] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="py-5">
          <p className="text-sm leading-6 text-[#91aaa5]">
            This patch has passed the swarm regression checks and is ready to open as a GitHub pull request.
          </p>

          <div className="mt-4 border border-white/10 bg-[#071015] p-3 font-mono text-xs text-[#d8eae6]">
            <div className="text-[#c7ff5e]">Target: fix/sd-2048</div>
            <div className="mt-1 text-[10px] text-[#6f8983]">Changes verified against 4 test suites</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
          <Button 
            variant="secondary" 
            onClick={() => setOpen(false)}
            className="border-white/15 text-white hover:border-white"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              setOpen(false);
              onApprove();
            }}
            className="flex items-center gap-2 bg-[#c7ff5e] text-[#071015] hover:bg-white"
          >
            <Check size={14} /> Approve & push
          </Button>
        </div>
      </div>
    </div>
  );
}