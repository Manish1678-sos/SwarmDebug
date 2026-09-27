import Link from "next/link";
import { ArrowUpRight, GitBranch, MoreHorizontal, Plus } from "lucide-react";
import { Badge, Button, Panel } from "./ui";
import { incidents, metrics, repositories } from "@/lib/db";

export function MetricCards() {
  const metricItems = [
    { label: "Active swarms", value: metrics.activeSwarms, sub: "+2 this week", color: "text-[#c7ff5e]" },
    { label: "Critical anomalies", value: metrics.criticalAnomalies, sub: "-18% vs last week", color: "text-[#ffb86b]" },
    { label: "Auto-fixed PRs", value: metrics.autoFixedPrs, sub: "+24 this month", color: "text-[#59d5c5]" },
    { label: "System health score", value: `${metrics.health}%`, sub: "+0.8% vs yesterday", color: "text-[#c7ff5e]" },
  ];

  return (
    <div className="grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
      {metricItems.map(({ label, value, sub, color }) => (
        <div key={label} className="bg-[#0b181c] p-5 transition hover:bg-[#0f2126]">
          <div className="text-[10px] uppercase tracking-[.16em] text-[#6f8983]">
            {label}
          </div>
          <div className={`mt-4 text-3xl font-semibold tracking-[-.04em] ${color}`}>
            {value}
          </div>
          <div className="mt-2 text-xs text-[#91aaa5]">{sub}</div>
        </div>
      ))}
    </div>
  );
}

export function RepoHealthList() {
  return (
    <Panel>
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div>
          <h2 className="text-sm font-semibold text-white">Connected repositories</h2>
          <p className="mt-1 text-xs text-[#6f8983]">Latest anomaly scan status</p>
        </div>
        <Button variant="ghost" className="px-0 text-[#c7ff5e] hover:text-white">
          <Plus size={15} /> Connect
        </Button>
      </div>
      <div>
        {repositories.map((repo) => (
          <div 
            key={repo.id} 
            className="flex items-center gap-4 border-b border-white/5 px-5 py-4 transition hover:bg-white/[0.02] last:border-0"
          >
            <div className="grid h-9 w-9 place-items-center border border-white/10 bg-[#071015] text-[#91aaa5]">
              <GitBranch size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-white">{repo.name}</span>
                <span className="text-[10px] text-[#6f8983]">{repo.language}</span>
              </div>
              <div className="mt-1 text-xs text-[#6f8983]">
                {repo.branch} · scanned {repo.lastScan}
              </div>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-sm text-white">{repo.health}%</div>
              <div className="text-[10px] uppercase tracking-[.12em] text-[#6f8983]">health</div>
            </div>
            <Badge tone={repo.status === "Synced" ? "success" : repo.status === "Error" ? "danger" : "warn"}>
              {repo.status}
            </Badge>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function RecentIncidentsTable() {
  return (
    <Panel>
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div>
          <h2 className="text-sm font-semibold text-white">Recent anomalies</h2>
          <p className="mt-1 text-xs text-[#6f8983]">Live incident queue</p>
        </div>
        <Link href="/analytics" className="text-xs text-[#c7ff5e] hover:underline">
          View history <ArrowUpRight className="ml-1 inline" size={13} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase tracking-[.14em] text-[#6f8983]">
            <tr className="border-b border-white/5">
              <th className="px-5 py-3 font-normal">Incident</th>
              <th className="px-5 py-3 font-normal">Repository</th>
              <th className="px-5 py-3 font-normal">Severity</th>
              <th className="px-5 py-3 font-normal">Status</th>
              <th className="px-5 py-3 font-normal">Confidence</th>
              <th className="px-5 py-3 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id} className="border-t border-white/5 transition hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <div className="font-mono text-[#c7ff5e]">{incident.id}</div>
                  <div className="mt-1 min-w-52 text-white">{incident.title}</div>
                </td>
                <td className="px-5 py-4 text-[#91aaa5]">{incident.repo}</td>
                <td className="px-5 py-4">
                  <Badge tone={incident.severity === "Critical" ? "danger" : incident.severity === "High" ? "warn" : "neutral"}>
                    {incident.severity}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-[#91aaa5]">{incident.status}</td>
                <td className="px-5 py-4 text-[#c7ff5e]">{incident.confidence}%</td>
                <td className="px-5 py-4 text-right">
                  <button className="text-[#6f8983] hover:text-white" aria-label="More options">
                    <MoreHorizontal size={16} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}