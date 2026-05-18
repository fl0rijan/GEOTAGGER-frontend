import {
    APIProvider,
    Map as GoogleMapBase,
    AdvancedMarker,
    type MapMouseEvent
} from '@vis.gl/react-google-maps';
import MarkerIcon from '../../assets/icons/RoomFilled.svg?react';
import {clsx} from "clsx";

interface MapProps {
    onLocationSelect?: (lat: number, lng: number) => void;
    initialCenter?: { lat: number; lng: number };
    marker?: { lat: number; lng: number } | null;
    className?: string;
}

export const GoogleMap = ({
                              onLocationSelect,
                              initialCenter = {lat: 46.0569, lng: 14.5058},
                              marker,
                              className
                          }: MapProps) => {

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const handleMapClick = (e: MapMouseEvent) => {
        if (onLocationSelect && e.detail.latLng) {
            onLocationSelect(e.detail.latLng.lat, e.detail.latLng.lng);
        }
    };

    return (
        <div className={clsx("map-container", className)}>
            <APIProvider apiKey={apiKey}>
                <GoogleMapBase
                    defaultCenter={initialCenter}
                    defaultZoom={13}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={handleMapClick}
                    mapId="a49dc90e9d5d76889cfb61fc"
                >
                    {marker && (
                        <AdvancedMarker position={marker}> <MarkerIcon/> </AdvancedMarker>
                    )}
                </GoogleMapBase>
            </APIProvider>
        </div>
    );
};