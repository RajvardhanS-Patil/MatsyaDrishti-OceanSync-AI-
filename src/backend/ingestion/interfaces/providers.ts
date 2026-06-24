export interface WeatherData {
  temperature: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
}

export interface WeatherProvider {
  name: string;
  fetchCurrentWeather(lat: number, lon: number): Promise<WeatherData>;
}

export interface OceanData {
  sea_surface_temperature: number;
  wave_height: number;
  current_speed: number;
  salinity: number;
  chlorophyll: number;
}

export interface OceanProvider {
  name: string;
  fetchOceanConditions(lat: number, lon: number): Promise<OceanData>;
}

export interface VesselData {
  vessel_id: string;
  mmsi: string;
  name: string;
  lat: number;
  lon: number;
  heading: number;
  speed: number;
  compliance: "compliant" | "warning" | "violation";
  activity: string;
}

export interface VesselProvider {
  name: string;
  fetchVessels(bbox: string): Promise<VesselData[]>;
}

export interface BiodiversityData {
  species_count: number;
  species_richness: number;
  observation_count: number;
  confidence: number;
}

export interface BiodiversityProvider {
  name: string;
  fetchBiodiversityStats(regionWKT: string): Promise<BiodiversityData>;
}
