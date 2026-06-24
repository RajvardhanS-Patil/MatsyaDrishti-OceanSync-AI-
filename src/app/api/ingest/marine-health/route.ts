import { NextResponse } from "next/server";
import { deriveMarineHealth } from "@/backend/ingestion/schedulers/marine-health-scheduler";

export async function POST() {
  const result = await deriveMarineHealth();
  if (result.success) {
    return NextResponse.json(result, { status: 200 });
  } else {
    return NextResponse.json(result, { status: 500 });
  }
}
