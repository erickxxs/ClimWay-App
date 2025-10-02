import Image from 'next/image';

interface CurrentWeatherCardProps {
  location: string;
  temperature: number;
  description: string;
  iconCode: string;
}

// Este es un Server Component por defecto, ya que no usa hooks ni interactividad.
// Solo recibe datos y los muestra.
export default function CurrentWeatherCard({ location, temperature, description, iconCode }: CurrentWeatherCardProps) {
  if (!location) return null;

  return (
    <div className="bg-climwayBlue backdrop-blur-sm p-6 rounded-xl shadow-lg text-center text-white transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold">{location}</h2>
      <div className="flex items-center justify-center my-4">
        <span className="text-7xl font-light">{Math.round(temperature)}°C</span>
        <Image
          src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={description}
          width={100}
          height={100}
        />
      </div>
      <p className="text-xl capitalize">{description}</p>
    </div>
  );
}