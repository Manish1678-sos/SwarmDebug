import { createSwarmId, getRepository, type Repository } from "@/lib/db";

export type SwarmTriggerInput = {
  repositoryId: string;
  model: string;
  aggressive: boolean;
  log: string;
};

export type SwarmSession = {
  id: string;
  repository: Repository;
  model: string;
  aggressive: boolean;
  status: "running" | "completed" | "failed";
  receivedAt: string;
  log: string;
};

export function triggerSwarm(input: SwarmTriggerInput): SwarmSession {
  const repository = getRepository(input.repositoryId);

  return {
    id: createSwarmId(),
    repository,
    model: input.model,
    aggressive: input.aggressive,
    status: "running",
    receivedAt: new Date().toISOString(),
    log: input.log,
  };
}