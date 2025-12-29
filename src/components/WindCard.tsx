interface WindCardProps {
  speed: number;
  direction: number;
}

export default function WindCard({ speed, direction }: WindCardProps) {
  // Convierte la velocidad de m/s a km/h
  const speedKmh = Math.round(speed * 3.6);

  return (
    <div className="bg-climwayCard/90 backdrop-blur-md p-5 rounded-2xl border border-climwayBorder/30 shadow-xl">
      {/* Header con ícono */}
      <div className="flex items-center gap-2 text-slate-400 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
        <span className="text-sm font-medium">Viento</span>
      </div>

      {/* Velocidad */}
      <p className="text-3xl font-semibold text-white">
        {speedKmh} <span className="text-lg font-normal text-slate-400">km/h</span>
      </p>

      {/* Dirección */}
      <p className="text-sm text-slate-400 mt-2">
        Dirección: {direction}° ↗
      </p>
    </div>
  );
}