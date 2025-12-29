import WeatherDashboard from "@/components/WeatherDashboard";
import Image from "next/image";

// Esta es la página principal. Es un Server Component.
// Su única responsabilidad es montar el componente cliente principal.
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header con logo - conservado del diseño original */}
      <header className="flex items-center justify-center mb-6 text-white">
        <Image src="/logo.png" alt="ClimWay Logo" width={40} height={40} className="drop-shadow-lg" />
        <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
          ClimWay
        </h1>
      </header>

      <WeatherDashboard />
    </div>
  );
}