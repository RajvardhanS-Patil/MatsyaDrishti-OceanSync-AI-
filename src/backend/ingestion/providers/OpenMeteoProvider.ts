import { WeatherProvider, WeatherData } from "../interfaces/providers";

export class OpenMeteoProvider implements WeatherProvider {
  name = "Open-Meteo";

  async fetchCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    // Open-Meteo API endpoint for marine/weather data
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,surface_pressure,visibility`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`OpenMeteo API failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Safety check for visibility. Open-Meteo sometimes omits it or provides it in meters. We want km.
    let visibilityKm = 10; 
    if (data.current.visibility !== undefined) {
       visibilityKm = data.current.visibility / 1000;
    }

    return {
      temperature: data.current.temperature_2m,
      wind_speed: data.current.wind_speed_10m,
      pressure: data.current.surface_pressure,
      visibility: visibilityKm
    };
  }
}
