import { NextRequest, NextResponse } from 'next/server';

// Interface para la respuesta del Geocoding API de OpenWeather
interface GeocodingResult {
    name: string;
    local_names?: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key for OpenWeather is not configured' }, { status: 500 });
    }

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    try {
        // Usamos el Geocoding API de OpenWeather para buscar ciudades
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;

        const response = await fetch(geocodingUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }

        const data: GeocodingResult[] = await response.json();

        // Formateamos los resultados para el frontend
        const results = data.map((item) => ({
            name: item.name,
            country: item.country,
            state: item.state,
            lat: item.lat,
            lon: item.lon,
            fullName: item.state
                ? `${item.name}, ${item.state}, ${item.country}`
                : `${item.name}, ${item.country}`
        }));

        return NextResponse.json({ results });

    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        return NextResponse.json({ error: 'Failed to fetch geocoding data' }, { status: 500 });
    }
}
