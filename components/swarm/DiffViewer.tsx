import { GitPullRequest } from "lucide-react";

export function DiffViewer({ ready }: { ready: boolean }) {
  if (!ready) {
    return (
      <div className="border border-white/10 bg-[#071015] p-4 text-xs text-[#6f8983]">
        Patch preview will appear when the resolution agent converges.
      </div>
    );
  }

  return (
    <div className="border border-[#c7ff5e]/25 bg-[#101f1e] p-4 font-mono text-xs text-[#d8eae6]">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#c7ff5e]">
        <GitPullRequest size={14} /> PATCH PREVIEW / auth/session.ts
      </div>
      <div className="space-y-1">
        <div className="text-[#ff8b94]">- await tokenStore.write(nextToken)</div>
        <div className="text-[#c7ff5e]">+ await tokenStore.writeIfCurrent(version, nextToken)</div>
      </div>
      <div className="mt-3 text-[10px] text-[#6f8983]">
        + 14 lines · - 3 lines · 4 regression tests added
      </div>
    </div>
  );
}