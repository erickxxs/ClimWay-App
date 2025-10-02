import { NextRequest, NextResponse } from 'next/server';

// Interfaces para tipar las respuestas de la API de OpenWeather
interface CurrentWeatherData {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface ForecastData {
    list: {
        dt: number;
        main: { temp: number };
        weather: { description: string; icon: string }[];
    }[];
}

interface AirQualityData {
    list: {
        main: { aqi: number };
        components: { co: number; no: number; no2: number; o3: number; so2: number; pm2_5: number; pm10: number; nh3: number; };
    }[];
}

// Tipado para la respuesta combinada de nuestra API
export interface WeatherApiResponse {
    current: CurrentWeatherData;
    forecast: ForecastData;
    airQuality: AirQualityData;
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const city = searchParams.get('city');

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key for OpenWeather is not configured' }, { status: 500 });
  }

  // Si no se proveen coordenadas ni ciudad, retorna un error.
  if ((!lat || !lon) && !city) {
    return NextResponse.json({ error: 'Latitude, longitude, or city are required' }, { status: 400 });
  }
  
  try {
    let latCoord = lat;
    let lonCoord = lon;

    // Si se busca por ciudad, primero obtenemos sus coordenadas
    if (city) {
        const geocodingResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
        if (!geocodingResponse.ok) {
            throw new Error('Failed to fetch geocoding data');
        }
        const geocodingData: CurrentWeatherData = await geocodingResponse.json();
        latCoord = geocodingData.coord.lat.toString();
        lonCoord = geocodingData.coord.lon.toString();
    }

    // URLs para los endpoints de OpenWeather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latCoord}&lon=${lonCoord}&appid=${apiKey}&units=metric&lang=es`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latCoord}&lon=${lonCoord}&appid=${apiKey}&units=metric&lang=es`;
    const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latCoord}&lon=${lonCoord}&appid=${apiKey}`;
    
    // Hacemos las llamadas a la API en paralelo para mayor eficiencia
    const [currentWeatherRes, forecastRes, airQualityRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
      fetch(airQualityUrl),
    ]);

    // Verificamos que todas las respuestas sean exitosas
    if (!currentWeatherRes.ok || !forecastRes.ok || !airQualityRes.ok) {
        throw new Error('Failed to fetch weather data from one or more endpoints');
    }

    // Parseamos los JSON de las respuestas
    const current: CurrentWeatherData = await currentWeatherRes.json();
    const forecast: ForecastData = await forecastRes.json();
    const airQuality: AirQualityData = await airQualityRes.json();
    
    // Combinamos todo en un único objeto y lo retornamos
    const combinedData: WeatherApiResponse = {
        current,
        forecast,
        airQuality
    };

    return NextResponse.json(combinedData);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}