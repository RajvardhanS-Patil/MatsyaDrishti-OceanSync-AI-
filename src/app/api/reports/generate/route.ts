import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import PDFDocument from "pdfkit";

// Helper to generate PDF Buffer
function buildPDF(reportType: string, summary: string, data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    // Title
    doc.fontSize(24).fillColor("#042832").text(`MatsyaDrishti Report`, { align: "center" });
    doc.fontSize(16).fillColor("#00A3FF").text(reportType.replace(/-/g, " ").toUpperCase(), { align: "center" });
    doc.moveDown();

    // AI Executive Summary
    doc.fontSize(14).fillColor("#042832").text("Executive Summary", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor("#333333").text(summary);
    doc.moveDown(2);

    // KPIs section
    doc.fontSize(14).fillColor("#042832").text("Key Performance Indicators", { underline: true });
    doc.moveDown(0.5);
    const kpis = [
      `Risk Score: ${data.ai.risk_score?.toFixed(1) || "N/A"} / 100`,
      `Threat Level: ${data.ai.threat_level?.toUpperCase() || "N/A"}`,
      `Marine Health Score: ${data.health.health_score?.toFixed(1) || "N/A"}`,
      `Biodiversity Health Index: ${data.bio.bhi?.toFixed(1) || "N/A"}`,
      `Ocean Temp: ${data.ocean.temperature?.toFixed(1) || "N/A"}°C`,
      `Active Alerts: ${data.alerts.length || 0}`,
      `Tracked Vessels: ${data.vessels.length || 0}`
    ];
    kpis.forEach(k => {
      doc.fontSize(11).fillColor("#333333").text(`• ${k}`);
    });
    doc.moveDown(2);

    // Recommendations section
    if (data.ai.recommendations && data.ai.recommendations.length > 0) {
      doc.fontSize(14).fillColor("#042832").text("AI Strategic Recommendations", { underline: true });
      doc.moveDown(0.5);
      data.ai.recommendations.forEach((rec: any, idx: number) => {
        doc.fontSize(11).fillColor("#000000").text(`${idx + 1}. ${rec.action} (Confidence: ${rec.confidence}%)`);
        doc.fontSize(10).fillColor("#666666").text(`   Impact: ${rec.impact}`);
        doc.moveDown(0.5);
      });
    }

    // Footer
    doc.fontSize(8).fillColor("#999999").text(`Generated securely by Matsya Engine on ${new Date().toUTCString()}`, 50, doc.page.height - 50, { align: 'center' });

    doc.end();
  });
}

// Helper to generate CSV string
function buildCSV(data: any): string {
  const header = "Metric,Value\n";
  const rows = [
    `Risk Score,${data.ai.risk_score}`,
    `Threat Level,${data.ai.threat_level}`,
    `Fishing Advisory,${data.ai.fishing_advisory}`,
    `Marine Health Score,${data.health.health_score}`,
    `Biodiversity Health Index,${data.bio.bhi}`,
    `Ocean Temperature,${data.ocean.temperature}`,
    `Active Alerts,${data.alerts.length}`,
    `Tracked Vessels,${data.vessels.length}`
  ];
  return header + rows.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, format } = body;

    // 1. Fetch live snapshot directly
    const [healthRes, bioRes, oceanRes, aiRes, alertsRes, vesselsRes] = await Promise.all([
      supabase.from("marine_health").select("*").order("recorded_at", { ascending: false }).limit(1).single(),
      supabase.from("biodiversity_metrics").select("*").order("recorded_at", { ascending: false }).limit(1).single(),
      supabase.from("ocean_conditions").select("*").order("recorded_at", { ascending: false }).limit(1).single(),
      supabase.from("ai_predictions").select("*").order("created_at", { ascending: false }).limit(1).single(),
      supabase.from("alerts").select("*").eq("status", "active"),
      supabase.from("vessels").select("*")
    ]);

    const snapshot = {
      health: healthRes.data || {},
      bio: bioRes.data || {},
      ocean: oceanRes.data || {},
      ai: aiRes.data || {},
      alerts: alertsRes.data || [],
      vessels: vesselsRes.data || []
    };

    // 2. Generate Executive Summary
    const summary = `Matsya Engine assesses the current sector risk at ${snapshot.ai.risk_score?.toFixed(1) || 0} / 100 (${(snapshot.ai.threat_level || 'UNKNOWN').toUpperCase()}). The active fishing advisory is set to ${(snapshot.ai.fishing_advisory || 'UNKNOWN').toUpperCase()}. Currently, there are ${snapshot.alerts.length} active incidents requiring attention. Marine health is tracking at ${snapshot.health.health_score?.toFixed(1) || 0} with an ocean temperature of ${snapshot.ocean.temperature?.toFixed(1) || 0}°C.`;

    // 3. Store in reports_generated
    const { data: record, error } = await supabase.from("reports_generated").insert([{
      type,
      summary,
      confidence: snapshot.ai.confidence_score || 0,
      snapshot
    }]).select().single();

    if (error) {
      throw error;
    }

    // 4. Generate Export
    if (format === "csv") {
      const csv = buildCSV(snapshot);
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${type}-${record.id}.csv"`
        }
      });
    } else {
      // Default PDF
      const pdfBuffer = await buildPDF(type, summary, snapshot);
      return new NextResponse(pdfBuffer as any, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${type}-${record.id}.pdf"`
        }
      });
    }

  } catch (error: any) {
    console.error("Report Generation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
