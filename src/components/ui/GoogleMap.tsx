/// <reference types="google.maps" />
import {
    APIProvider,
    Map as GoogleMapBase,
    AdvancedMarker,
    useMapsLibrary,
    type MapMouseEvent
} from '@vis.gl/react-google-maps';

import MarkerIcon from '../../assets/icons/RoomFilled.svg?react';
import {clsx} from "clsx";
import {useEffect, useRef} from "react";


interface MapProps {
    onLocationSelect?: (lat: number, lng: number, address?: string) => void;
    initialCenter?: { lat: number; lng: number };
    marker?: { lat: number; lng: number } | null;
    className?: string;
}

const InnerGoogleMap = ({
                            onLocationSelect,
                            initialCenter = {lat: 46.0569, lng: 14.5058},
                            marker,
                            className
                        }: MapProps) => {
    const geocodingLib = useMapsLibrary('geocoding');
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);

    useEffect(() => {
        if (!geocodingLib) return;
        geocoderRef.current = new geocodingLib.Geocoder();
    }, [geocodingLib]);

    const handleMapClick = (e: MapMouseEvent) => {
        if (!e.detail.latLng || !onLocationSelect) return;

        const {lat, lng} = e.detail.latLng;
        const geocoder = geocoderRef.current;

        if (geocoder) {
            void geocoder.geocode(
                {location: {lat, lng}},
                (results, status) => {
                    if (status === "OK" && results && results[0]) {
                        const components = results[0].address_components;

                        const streetNumber = components.find(c => c.types.includes("street_number"))?.long_name || "";
                        const streetName = components.find(c => c.types.includes("route"))?.long_name || "";

                        const country = components.find(c => c.types.includes("country"))?.long_name || "";

                        let streetAddress: string;
                        if (streetName && streetNumber) {
                            streetAddress = `${streetName} ${streetNumber}`;
                        } else {
                            streetAddress = streetName || streetNumber;
                        }

                        let shortAddress: string;
                        if (streetAddress && country) {
                            shortAddress = `${streetAddress}, ${country}`;
                        } else {
                            shortAddress = streetAddress || country || results[0].formatted_address;
                        }

                        onLocationSelect(lat, lng, shortAddress);
                    } else {
                        onLocationSelect(lat, lng);
                    }
                }
            );
        } else {
            onLocationSelect(lat, lng);
        }
    };

    return (
        <div className={clsx("map-container", className)}>
            <GoogleMapBase
                defaultCenter={initialCenter}
                defaultZoom={13}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
                onClick={handleMapClick}
                mapId="a49dc90e9d5d76889cfb61fc"
            >
                {marker && (
                    <AdvancedMarker position={marker}> <MarkerIcon/> </AdvancedMarker>
                )}
            </GoogleMapBase>
        </div>
    );
};

export const GoogleMap = (props: MapProps) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <APIProvider apiKey={apiKey}>
            <InnerGoogleMap {...props} />
        </APIProvider>
    );
};