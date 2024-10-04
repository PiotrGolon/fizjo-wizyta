"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CircleArrowDown } from "lucide-react";

// Upewnij się, że masz zainstalowany leaflet, react-leaflet oraz @types/leaflet:
// npm install leaflet react-leaflet
// npm install --save-dev @types/leaflet

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC<MapProps> = ({ latitude, longitude }) => {
  useEffect(() => {
    // Fix for Leaflet marker icons not showing
    // @ts-expect-error: Leaflet marker icon fix, _getIconUrl is not defined in typings
    delete (L.Icon.Default.prototype as unknown)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="my-5 flex flex-col justify-center items-center ">
      <h2 className="text-center text-lg font-bold text-green-500 mb-4 flex items-center">
        Znajdź mnie na mapie <CircleArrowDown className="size-6 ml-2" />
      </h2>
      <MapContainer
        center={[latitude, longitude]}
        zoom={30}
        className="h-96 w-full lg:w-2/5 rounded-lg"
      >
        <TileLayer
          url={`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Imagery &copy; <a href="https://www.maptiler.com">MapTiler</a>'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>Moja lokalizacja: Andrzeja 3, 05-800 Pruszków</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
