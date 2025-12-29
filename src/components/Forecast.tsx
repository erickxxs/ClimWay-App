import Image from 'next/image';

interface ForecastProps {
  forecastData: {
    dt: number;
    main: { temp: number; temp_min?: number };
    weather: { description: string; icon: string }[];
  }[];
}

export default function Forecast({ forecastData }: ForecastProps) {
  // Función para obtener un pronóstico único por día
  const getDailyForecasts = () => {
    const daily: typeof forecastData = [];
    const seenDays = new Set<string>();

    forecastData.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' });
      if (!seenDays.has(date) && daily.length < 5) {
        seenDays.add(date);
        daily.push(item);
      }
    });
    return daily;
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div className="bg-climwayCard/60 backdrop-blur-md p-6 rounded-2xl border border-climwayBorder/30 shadow-xl">
      <h2 className="text-lg font-semibold text-white mb-5">Pronóstico Semanal</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {dailyForecasts.map((day) => {
          const dayName = new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' });
          const tempMax = Math.round(day.main.temp);
          const tempMin = day.main.temp_min ? Math.round(day.main.temp_min) : tempMax - 4;

          return (
            <div
              key={day.dt}
              className="bg-climwayCardLight rounded-xl p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-sm font-medium text-slate-700 capitalize mb-2">{dayName}</h3>
              <Image
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                width={50}
                height={50}
                className="drop-shadow-md"
              />
              <p className="text-lg font-semibold text-slate-800">
                {tempMax}° <span className="text-slate-500 font-normal text-sm">/ {tempMin}°C</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}