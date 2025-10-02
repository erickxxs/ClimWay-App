interface AirQualityCardProps {
  aqi: number;
}

const AQI_LEVELS: { [key: number]: string } = {
  1: "Buena",
  2: "Aceptable",
  3: "Moderada",
  4: "Mala",
  5: "Muy Mala",
};

export default function AirQualityCard({ aqi }: AirQualityCardProps) {
  const aqiLevel = AQI_LEVELS[aqi] || "Desconocida";

  return (
    <div className="bg-climwayDarkBlue backdrop-blur-sm p-6 rounded-xl shadow-lg text-center text-white transition-transform duration-300 hover:scale-105">
      <h2 className="text-xl font-semibold mb-2">Calidad del Aire</h2>
      <p className="text-4xl font-bold">{aqiLevel}</p>
      <p className="mt-2 text-lg">Índice: {aqi}</p>
    </div>
  );
}