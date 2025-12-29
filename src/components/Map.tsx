"use client";

import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '350px',
  borderRadius: '1rem',
};

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
}

export default function Map({ center }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(mapInstance: google.maps.Map) {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="h-full rounded-2xl overflow-hidden border border-climwayBorder/30 shadow-xl">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
          ],
        }}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  ) : (
    <div className="w-full h-full min-h-[350px] bg-climwayCard animate-pulse rounded-2xl"></div>
  );
}