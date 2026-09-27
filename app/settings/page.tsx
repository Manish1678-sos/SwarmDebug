"use client";
import { useState } from "react";
import { Bell, Check, GitBranch, KeyRound, Save } from "lucide-react";
import { Button, Panel } from "@/components/ui";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState("");

  const handleSave = () => {
    // Save webhook configuration logic (e.g., localStorage or API)
    localStorage.setItem("swarmdebug.slack_webhook", slackWebhook);
    setSaved(true);

    // Reset the "Saved" indicator after 2 seconds
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-3 text-[10px] uppercase tracking-[.2em] text-[#c7ff5e]">
          Workspace configuration
        </div>
        <h1 className="text-3xl font-semibold tracking-[-.04em] text-white">
          Settings
        </h1>
        <p className="mt-2 text-sm text-[#6f8983]">
          Manage integrations, secrets, and notification routing.
        </p>
      </div>

      <div className="space-y-5">
        {/* GitHub Integration Panel */}
        <Panel className="p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <GitBranch size={18} className="text-[#c7ff5e]" />
            <div>
              <h2 className="text-sm font-semibold text-white">
                GitHub integration
              </h2>
              <p className="mt-1 text-xs text-[#6f8983]">
                Repository access for branches and pull requests.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div>
              <div className="text-sm text-white">GitHub Enterprise</div>
              <div className="mt-1 text-xs text-[#59d5c5]">
                Connected as maya-rios
              </div>
            </div>
            <Button variant="secondary">Configure</Button>
          </div>
        </Panel>

        {/* API Keys Panel */}
        <Panel className="p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <KeyRound size={18} className="text-[#c7ff5e]" />
            <div>
              <h2 className="text-sm font-semibold text-white">API keys</h2>
              <p className="mt-1 text-xs text-[#6f8983]">
                Provider keys are encrypted at rest.
              </p>
            </div>
          </div>
          <label className="mt-5 block text-xs text-[#91aaa5]">
            IBM Granite key
            <input
              type="password"
              value="swarm-granite-prod-key"
              readOnly
              className="mt-2 w-full border border-white/10 bg-[#071015] px-4 py-3 font-mono text-xs text-[#91aaa5] outline-none"
            />
          </label>
          <label className="mt-4 block text-xs text-[#91aaa5]">
            Anthropic key
            <input
              type="password"
              value="swarm-anthropic-prod-key"
              readOnly
              className="mt-2 w-full border border-white/10 bg-[#071015] px-4 py-3 font-mono text-xs text-[#91aaa5] outline-none"
            />
          </label>
        </Panel>

        {/* Notification Webhooks Panel */}
        <Panel className="p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <Bell size={18} className="text-[#c7ff5e]" />
            <div>
              <h2 className="text-sm font-semibold text-white">
                Notification webhooks
              </h2>
              <p className="mt-1 text-xs text-[#6f8983]">
                Route critical anomaly events to your team.
              </p>
            </div>
          </div>
          <label className="mt-5 block text-xs text-[#91aaa5]">
            Slack webhook
            <input
              type="url"
              value={slackWebhook}
              onChange={(e) => setSlackWebhook(e.target.value)}
              placeholder="https://hooks.slack.com/services/..."
              className="mt-2 w-full border border-white/10 bg-[#071015] px-4 py-3 text-sm text-white outline-none focus:border-[#c7ff5e]/60"
            />
          </label>
          <div className="mt-5 flex justify-end">
            <Button onClick={handleSave} className="flex items-center gap-2">
              {saved ? <Check size={14} /> : <Save size={14} />}
              {saved ? "Saved" : "Save changes"}
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}