import WeatherDashboard from "@/components/WeatherDashboard";
import Image from "next/image";

// Esta es la página principal. Es un Server Component.
// Su única responsabilidad es montar el componente cliente principal.
export default function HomePage() {
  return (
    <div>
      <header className="flex items-center justify-center mb-8 text-white">
        <Image src="/logo.png" alt="ClimWay Logo" width={50} height={50} />
        <h1 className="text-4xl font-bold ml-4">ClimWay</h1>
      </header>
      <WeatherDashboard />
    </div>
  );
}