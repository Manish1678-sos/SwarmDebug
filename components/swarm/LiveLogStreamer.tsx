import type { SwarmLog } from "@/lib/db";

export function LiveLogStreamer({ logs }: { logs: SwarmLog[] }) {
  return (
    <div className="space-y-3 font-mono text-[11px] leading-5">
      {logs.map((log) => {
        const toneColor =
          log.tone === "success"
            ? "text-[#c7ff5e]"
            : log.tone === "warn"
            ? "text-[#ffb86b]"
            : "text-[#91aaa5]";

        return (
          <div key={log.id} className="flex gap-3">
            <span className="shrink-0 text-[#506963]">{log.timestamp}</span>
            <span className={toneColor}>
              <b className="text-white">[{log.agent}]</b> {log.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}