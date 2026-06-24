/* ──────────────────────────────────────────────────────────
   Coastal Ecosystem Digital Twin — Client-Side Simulation Engine
   Simulates ocean current vectors, SST thermal plumes, species
   aggregation centers, vessel routing trajectories, and coral stress
   over a 24-hour cycle.
   ────────────────────────────────────────────────────────── */

export interface SimCurrent {
  y: number;
  amplitude: number;
  phase: number;
  speed: number;
  thickness: number;
  opacity: number;
}

export interface SimFishCluster {
  id: string;
  x: string;
  y: string;
  size: number;
  count: number;
  species: string;
  healthImpact: string;
  depth: number; // in meters
}

export interface SimBioZone {
  x: string;
  y: string;
  w: number;
  h: number;
  richness: number; // Species Count
  resilience: number; // 0-1
}

export interface SimThermalPlume {
  x: string;
  y: string;
  size: number;
  temperature: number; // in °C
  intensity: number; // anomaly index
}

export interface SimCoralReef {
  name: string;
  x: string;
  y: string;
  radius: number;
  health: number; // percentage
  bleachingRisk: "Safe" | "Warning" | "Critical";
}

export interface SimVessel {
  name: string;
  id: string;
  x: string;
  y: string;
  active: boolean;
  heading: number;
  speed: number; // knots
  status: string;
  route: [number, number][]; // Path coordinates for route line
}

export interface SimConservationZone {
  name: string;
  x: string;
  y: string;
  w: number;
  h: number;
  restriction: string;
  threatLevel: "Low" | "Moderate" | "High";
}

export interface SimulationResult {
  currents: SimCurrent[];
  fish: SimFishCluster[];
  biodiversity: SimBioZone[];
  sst: SimThermalPlume[];
  coral: SimCoralReef[];
  vessels: SimVessel[];
  zones: SimConservationZone[];
  globalMetrics: {
    avgTemp: number;
    fishAbundance: number;
    coralBleachingIndex: number;
    activeFishingVessels: number;
    waterQualityScore: number;
  };
}

export function getSimulationData(timeValue: number): SimulationResult {
  // Normalize timeValue (0 - 100) to radians for smooth sine cycles representing 24h
  const t = (timeValue / 100) * 2 * Math.PI;

  // 1. Ocean Currents: Wave vectors changing amplitude and speed
  const currents: SimCurrent[] = Array.from({ length: 8 }, (_, i) => {
    const waveOffset = i * 0.4;
    return {
      y: 12 + i * 11, // percentage down
      amplitude: 15 + 8 * Math.sin(t + waveOffset),
      phase: t * 1.5 + i * 0.5,
      speed: 15 + i * 2 + 5 * Math.cos(t),
      thickness: 1 + (i % 2),
      opacity: 0.08 + 0.04 * Math.sin(t + i),
    };
  });

  // 2. Fish Clusters: Migrating species responding to temperature & vessels
  // southwest tuna, center sardines, northeast mackerel
  const fish: SimFishCluster[] = [
    {
      id: "tuna-sw",
      species: "Yellowfin Tuna",
      x: `${20 + 8 * Math.cos(t + 0.5)}%`,
      y: `${48 + 6 * Math.sin(t + 0.5)}%`,
      size: 70 + 20 * Math.sin(t),
      count: Math.round(240 + 60 * Math.cos(t)),
      healthImpact: "Feeding on Upwelling",
      depth: 35 + 10 * Math.sin(t),
    },
    {
      id: "sardine-c",
      species: "Sardines",
      x: `${52 + 10 * Math.sin(t)}%`,
      y: `${38 + 8 * Math.cos(t)}%`,
      size: 90 + 30 * Math.cos(t),
      count: Math.round(1800 + 400 * Math.sin(t)),
      healthImpact: "Thermal Avoidance",
      depth: 12 + 6 * Math.cos(t),
    },
    {
      id: "mackerel-ne",
      species: "Mackerel",
      x: `${76 + 6 * Math.cos(t + 2)}%`,
      y: `${52 + 12 * Math.sin(t + 2)}%`,
      size: 60 + 15 * Math.sin(t),
      count: Math.round(420 + 80 * Math.cos(t + 1)),
      healthImpact: "Predator Pressure",
      depth: 55 + 20 * Math.sin(t * 2),
    },
  ];

  // 3. Biodiversity Zones: General habitat coverage zones
  const biodiversity: SimBioZone[] = [
    {
      x: "12%",
      y: "18%",
      w: 170 + 20 * Math.sin(t),
      h: 110 + 15 * Math.cos(t),
      richness: Math.round(120 + 10 * Math.sin(t)),
      resilience: 0.85 + 0.05 * Math.sin(t),
    },
    {
      x: "58%",
      y: "32%",
      w: 150 + 10 * Math.cos(t),
      h: 120 + 20 * Math.sin(t),
      richness: Math.round(95 - 15 * Math.cos(t)), // Affected by SST anomaly
      resilience: 0.72 + 0.03 * Math.cos(t),
    },
    {
      x: "38%",
      y: "58%",
      w: 190 + 30 * Math.sin(t),
      h: 140 + 10 * Math.cos(t),
      richness: Math.round(145 + 15 * Math.sin(t + 1)),
      resilience: 0.91 + 0.04 * Math.sin(t),
    },
  ];

  // 4. SST Thermal Plumes: Heatspots expanding/shifting based on diurnal warming
  const sst: SimThermalPlume[] = [
    {
      x: `${68 + 4 * Math.sin(t)}%`,
      y: `${20 + 3 * Math.cos(t)}%`,
      size: 260 + 40 * Math.sin(t), // Peaks in afternoon (timeValue: 50-75)
      temperature: 28.5 + 2.0 * Math.sin(t),
      intensity: 1.8 + 0.8 * Math.sin(t),
    },
    {
      x: `${28 + 2 * Math.cos(t)}%`,
      y: `${68 + 4 * Math.sin(t)}%`,
      size: 180 + 30 * Math.cos(t),
      temperature: 24.2 + 0.8 * Math.cos(t),
      intensity: 0.4 + 0.2 * Math.cos(t),
    },
  ];

  // 5. Coral Reef Health: Stressed by high temperature plumes
  const malvanTemp = 28.5 + 2.0 * Math.sin(t);
  const coralBleachingRisk = malvanTemp > 29.5 ? "Critical" : malvanTemp > 28.0 ? "Warning" : "Safe";
  const coralHealth = Math.max(45, Math.round(72 - 12 * Math.max(0, Math.sin(t))));

  const coral: SimCoralReef[] = [
    {
      name: "Malvan Sanctuary Reef",
      x: "65%",
      y: "38%",
      radius: 65 + 5 * Math.sin(t),
      health: coralHealth,
      bleachingRisk: coralBleachingRisk,
    },
    {
      name: "Netrani Deep Reef",
      x: "28%",
      y: "55%",
      radius: 50,
      health: 84,
      bleachingRisk: "Safe",
    },
    {
      name: "Angria Bank Atoll",
      x: "45%",
      y: "72%",
      radius: 40 + 2 * Math.cos(t),
      health: 79 - Math.round(3 * Math.cos(t)),
      bleachingRisk: "Safe",
    },
  ];

  // 6. Vessel Tracking: Vessels navigating along distinct paths
  // Path vertices in % [X, Y]
  const pathOceanHunter: [number, number][] = [[15, 25], [35, 30], [55, 60], [80, 85]];
  const pathMatsyaRani: [number, number][] = [[45, 50], [30, 48], [22, 42], [32, 38], [42, 48]];
  const pathSamudraK: [number, number][] = [[35, 65], [36, 66], [35, 67], [34, 66], [35, 65]];

  // Travel index 0.0 to 1.0 along route
  const progress1 = (timeValue / 100);
  const progress2 = ((timeValue * 1.5) % 100) / 100; // Loops faster

  const getPointOnPath = (path: [number, number][], progress: number): { x: number; y: number; heading: number } => {
    if (path.length < 2) return { x: 50, y: 50, heading: 0 };
    const segments = path.length - 1;
    const scaledProg = progress * segments;
    const segIndex = Math.min(Math.floor(scaledProg), segments - 1);
    const segPart = scaledProg - segIndex;

    const pA = path[segIndex];
    const pB = path[segIndex + 1];

    const x = pA[0] + (pB[0] - pA[0]) * segPart;
    const y = pA[1] + (pB[1] - pA[1]) * segPart;

    // Calculate heading (angle relative to north)
    const dx = pB[0] - pA[0];
    const dy = pB[1] - pA[1];
    let angle = Math.round((Math.atan2(dx, -dy) * 180) / Math.PI);
    if (angle < 0) angle += 360;

    return { x, y, heading: angle };
  };

  const hunterLoc = getPointOnPath(pathOceanHunter, progress1);
  const raniLoc = getPointOnPath(pathMatsyaRani, progress2);
  const samudraLoc = getPointOnPath(pathSamudraK, (Math.sin(t) + 1) / 2);

  const vessels: SimVessel[] = [
    {
      name: "MV OCEAN HUNTER",
      id: "V-99",
      x: `${hunterLoc.x}%`,
      y: `${hunterLoc.y}%`,
      active: true,
      heading: hunterLoc.heading,
      speed: 14.5,
      status: "Industrial Trawling",
      route: pathOceanHunter,
    },
    {
      name: "FV MATSYA RANI",
      id: "V-02",
      x: `${raniLoc.x}%`,
      y: `${raniLoc.y}%`,
      active: true,
      heading: raniLoc.heading,
      speed: 6.2,
      status: "AI Eco-Harvesting",
      route: pathMatsyaRani,
    },
    {
      name: "RV SAMUDRA K.",
      id: "V-07",
      x: `${samudraLoc.x}%`,
      y: `${samudraLoc.y}%`,
      active: false,
      heading: samudraLoc.heading,
      speed: 1.2,
      status: "eDNA Sampling",
      route: pathSamudraK,
    },
  ];

  // 7. Conservation Zones
  const zones: SimConservationZone[] = [
    {
      name: "Malvan Marine Protected Area",
      x: "15%",
      y: "20%",
      w: 160,
      h: 160,
      restriction: "No Fishing Allowed",
      threatLevel: coralBleachingRisk === "Critical" ? "High" : "Moderate",
    },
    {
      name: "Netrani Reef Sanctuary",
      x: "62%",
      y: "65%",
      w: 130,
      h: 130,
      restriction: "Scientific Access Only",
      threatLevel: "Low",
    },
  ];

  // 8. Aggregate global system analytics
  const isAfternoon = Math.sin(t) > 0.5;
  const avgTemp = 25.4 + 1.6 * Math.sin(t);
  const fishAbundance = fish.reduce((sum, f) => sum + f.count, 0);
  const bleachingIndex = coralBleachingRisk === "Critical" ? 78 : coralBleachingRisk === "Warning" ? 42 : 15;
  const activeFishingVessels = vessels.filter(v => v.active && v.status.includes("Trawling")).length;
  const waterQualityScore = Math.round(92 - 8 * Math.max(0, Math.sin(t)) - (activeFishingVessels * 2));

  return {
    currents,
    fish,
    biodiversity,
    sst,
    coral,
    vessels,
    zones,
    globalMetrics: {
      avgTemp: parseFloat(avgTemp.toFixed(1)),
      fishAbundance,
      coralBleachingIndex: bleachingIndex,
      activeFishingVessels,
      waterQualityScore,
    },
  };
}
