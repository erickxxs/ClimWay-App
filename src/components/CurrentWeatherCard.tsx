import Image from 'next/image';

interface CurrentWeatherCardProps {
  location: string;
  temperature: number;
  description: string;
  iconCode: string;
}

export default function CurrentWeatherCard({ location, temperature, description, iconCode }: CurrentWeatherCardProps) {
  if (!location) return null;

  return (
    <div className="bg-climwayCard/90 backdrop-blur-md p-6 rounded-2xl border border-climwayBorder/30 shadow-xl">
      {/* Ícono y temperatura */}
      <div className="flex flex-col items-center">
        <Image
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={description}
          width={80}
          height={80}
          className="drop-shadow-lg"
        />
        <span className="text-6xl font-light text-white">{Math.round(temperature)}°</span>
        <p className="text-lg text-slate-300 capitalize mt-1">{description}</p>
      </div>

      {/* Ubicación */}
      <div className="mt-4 pt-3 border-t border-climwayBorder/30 flex items-center justify-center gap-2 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm">{location}</span>
      </div>
    </div>
  );
}