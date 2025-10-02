import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // Usamos next/font para optimización
import './globals.css';

// Configuración de la fuente Poppins
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'] 
});

export const metadata: Metadata = {
  title: 'ClimWay - Tu App del Clima',
  description: 'Consulta el clima en tiempo real y el pronóstico para cualquier ciudad del mundo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${poppins.className} bg-black`}>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}