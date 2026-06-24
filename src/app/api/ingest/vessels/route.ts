import { NextResponse } from "next/server";
import { runVesselIngestion } from "@/backend/ingestion/schedulers/vessel-scheduler";

export async function POST() {
  const result = await runVesselIngestion();

  if (result.success) {
    return NextResponse.json({
      success: true,
      vessel_count: result.vessel_count,
      duration_ms: result.duration
    }, { status: 200 });
  } else {
    return NextResponse.json({
      success: false,
      error: result.error,
      vessel_count: 0
    }, { status: 500 });
  }
}
