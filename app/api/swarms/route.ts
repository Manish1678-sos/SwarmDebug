import { NextResponse } from "next/server";
import { triggerSwarm } from "@/server/api/swarm";
export async function POST(request: Request) { const body = await request.json(); if (!body.repositoryId || !body.log) return NextResponse.json({ error: "repositoryId and log are required" }, { status: 400 }); return NextResponse.json(triggerSwarm({ repositoryId: body.repositoryId, model: body.model ?? "IBM Granite", aggressive: Boolean(body.aggressive), log: body.log }), { status: 201 }); }
