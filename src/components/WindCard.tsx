interface WindCardProps {
  speed: number;
  direction: number;
}

export default function WindCard({ speed, direction }: WindCardProps) {
  // Convierte la velocidad de m/s a km/h
  const speedKmh = Math.round(speed * 3.6);

  return (
    <div className="bg-climwayPurple backdrop-blur-sm p-6 rounded-xl shadow-lg text-center text-white transition-transform duration-300 hover:scale-105">
      <h2 className="text-xl font-semibold mb-2">Viento</h2>
      <p className="text-4xl font-bold">{speedKmh} <span className="text-2xl font-normal">km/h</span></p>
      <p className="mt-2 text-lg">Dirección: {direction}°</p>
    </div>
  );
}