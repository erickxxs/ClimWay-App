import Image from 'next/image';

interface ForecastProps {
  forecastData: {
    dt: number;
    main: { temp: number };
    weather: { description: string; icon: string }[];
  }[];
}

export default function Forecast({ forecastData }: ForecastProps) {
  // Función para obtener un pronóstico único por día, ya que la API gratuita devuelve cada 3 horas.
  const getDailyForecasts = () => {
    const daily: typeof forecastData = [];
    const seenDays = new Set<string>();

    forecastData.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' });
      if (!seenDays.has(date) && daily.length < 5) { // Mostramos los próximos 5 días
        seenDays.add(date);
        daily.push(item);
      }
    });
    return daily;
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div className="bg-climwayDarkPurple backdrop-blur-sm p-6 rounded-xl shadow-lg mt-8 text-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Pronóstico Semanal</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((day) => (
          <div key={day.dt} className="flex flex-col items-center p-2 rounded-lg transition-transform duration-300 hover:scale-110">
            <h3 className="font-bold capitalize">{new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' })}</h3>
            <Image
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              width={50}
              height={50}
            />
            <p className="text-lg">{Math.round(day.main.temp)}°C</p>
            <p className="text-xs capitalize text-center">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}