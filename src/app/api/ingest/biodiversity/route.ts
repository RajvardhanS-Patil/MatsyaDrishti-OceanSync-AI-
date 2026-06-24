import { NextResponse } from "next/server";
import { runBiodiversityIngestion } from "@/backend/ingestion/schedulers/biodiversity-scheduler";

export async function POST() {
  const result = await runBiodiversityIngestion();

  if (result.success) {
    return NextResponse.json({
      success: true,
      inserted_row_id: result.row.id,
      timestamp: result.row.created_at,
      duration_ms: result.duration
    }, { status: 200 });
  } else {
    return NextResponse.json({
      success: false,
      error: result.error
    }, { status: 500 });
  }
}
