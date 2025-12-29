"use client";

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { WeatherApiResponse } from '@/app/api/weather/route';

// Importación de todos los componentes
import SearchBar from './SearchBar';
import Map from './Map';
import CurrentWeatherCard from './CurrentWeatherCard';
import WindCard from './WindCard';
import AirQualityCard from './AirQualityCard';
import Forecast from './Forecast';

// Fetcher para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WeatherDashboard() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [city, setCity] = useState<string | null>(null);

  // Efecto para obtener la geolocalización inicial del usuario
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        // Fallback a una ubicación por defecto si el usuario deniega el permiso
        () => setCoords({ lat: 19.4326, lon: -99.1332 }) // Ciudad de México
      );
    } else {
      // Fallback si el navegador no soporta geolocalización
      setCoords({ lat: 19.4326, lon: -99.1332 });
    }
  }, []);

  // Construcción de la URL de la API para SWR
  const apiUrl = city
    ? `/api/weather?city=${city}`
    : coords
      ? `/api/weather?lat=${coords.lat}&lon=${coords.lon}`
      : null;

  // Hook useSWR para el fetching de datos
  const { data, error, isLoading } = useSWR<WeatherApiResponse>(apiUrl, fetcher);

  const handleSearch = (searchedCity: string) => {
    setCity(searchedCity);
  };

  // Actualizar coordenadas si los datos de una ciudad buscada llegan
  useEffect(() => {
    if (data?.current.coord) {
      setCoords({ lat: data.current.coord.lat, lon: data.current.coord.lon });
    }
  }, [data]);

  if (isLoading || !coords) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-slate-400 text-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Cargando datos del clima...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-slate-300 text-xl">
        <p>No se pudieron cargar los datos.</p>
        <p className="text-base mt-2 text-slate-400">Intenta buscar una ciudad.</p>
        <div className="mt-6 w-full max-w-md">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    );
  }

  const { current, forecast, airQuality } = data;

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda centrada */}
      <SearchBar onSearch={handleSearch} />

      {/* Grid principal: Mapa a la izquierda, tarjetas a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Mapa - ocupa 2 columnas en pantallas grandes */}
        <div className="lg:col-span-2 h-[400px]">
          <Map center={{ lat: coords.lat, lng: coords.lon }} />
        </div>

        {/* Tarjetas de información - columna derecha */}
        <div className="flex flex-col gap-4">
          <CurrentWeatherCard
            location={`${current.name}, ${current.sys.country}`}
            temperature={current.main.temp}
            description={current.weather[0].description}
            iconCode={current.weather[0].icon}
          />
          <WindCard speed={current.wind.speed} direction={current.wind.deg} />
          <AirQualityCard aqi={airQuality.list[0].main.aqi} />
        </div>
      </div>

      {/* Pronóstico semanal */}
      <Forecast forecastData={forecast.list} />
    </div>
  );
}