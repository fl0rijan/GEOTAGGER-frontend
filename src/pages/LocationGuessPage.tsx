import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Row, Col, Card} from 'react-bootstrap';
import {
    useGetLocationQuery,
    usePlaceGuessMutation,
    useGetLocationLeaderboardQuery
} from '../store/api/locationApi';
import {GoogleMap} from '../components/ui/GoogleMap';
import {Input} from '../components/ui/Input';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import type {LeaderboardEntryDto} from "../types/api";
import {formatDistance} from "../lib/distance-utils";
import {clsx} from "clsx";
import {useAppSelector} from "../store/hooks.ts";
import {toLocalDatetimeInputString} from "../lib/date-utils.ts";
import {ImageLightbox} from "../components/ui/ImageLightbox.tsx";

export const LocationGuessPage = () => {
    const {id} = useParams<{ id: string }>();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const {user} = useAppSelector((state) => state.auth);

    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
    const [guessedAddress, setGuessedAddress] = useState("");
    const [lastErrorDistance, setLastErrorDistance] = useState<number | null>(null);

    const [correctLocation, setCorrectLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const {data: location, isLoading: isLocLoading} = useGetLocationQuery(id!);
    const {data: leaderboard, refetch: refetchLeaderboard} = useGetLocationLeaderboardQuery(id!);
    const [placeGuess, {isLoading: isGuessing}] = usePlaceGuessMutation();

    useEffect(() => {
        if (!location) return;

        if (location.attemptNumber && location.attemptNumber >= 1) {
            setTimeout(() => {
                setMarker({
                    lat: location.bestGuessLat ?? 0,
                    lng: location.bestGuessLng ?? 0
                });

                const formattedStr = formatDistance(location.bestDistance);
                const parsedDistance = parseFloat(formattedStr);
                setLastErrorDistance(parsedDistance);
            }, 0);
            return;
        }

        if (location && 'latitude' in location) {
            setTimeout(() => {
                setMarker({lat: location.latitude ?? 0, lng: location.longitude ?? 0});
                setIsGameFinished(true);
                setCorrectLocation({
                    lat: location.latitude ?? 0,
                    lng: location.longitude ?? 0
                });
                setGuessedAddress(location.name || "Location Revealed");
            }, 0);
        }
    }, [location]);

    const handleMapClick = (lat: number, lng: number, address?: string) => {
        if (isGameFinished) return;

        setMarker({lat, lng});
        if (address) setGuessedAddress(address);
    };

    const handleGuess = async () => {
        if (!marker || !id || isGameFinished) return;
        try {
            const result = await placeGuess({
                id,
                latitude: marker.lat,
                longitude: marker.lng
            }).unwrap();

            const distance: number = result.distanceMeters;
            const formattedStr = formatDistance(distance);
            const parsedDistance = parseFloat(formattedStr);
            setLastErrorDistance(parsedDistance);


            if (result.actualLatitude && result.actualLongitude) {
                setCorrectLocation({
                    lat: result.actualLatitude,
                    lng: result.actualLongitude
                });
                setIsGameFinished(true);
            }

            refetchLeaderboard();
        } catch { /* empty */
        }
    };

    if (isLocLoading) return <div>Loading...</div>;

    return (
        <div className="location-guess-page">
            <Row className="justify-content-center h-lg-100 min-vh-lg-100 m-0 location-guess-page-row">
                <Col lg={8} className="d-flex flex-column gap-3">
                    <h2 className="text-secondary location-guess-title">
                        {isGameFinished ? 'Game ' : 'Take a '}
                        <span className="text-primary">{isGameFinished ? 'Finished!' : 'guess!'}</span>
                    </h2>

                    <Card onClick={() => setIsLightboxOpen(true)} className="border-0 rounded-2 overflow-hidden"
                          style={{cursor: "zoom-in"}}>
                        <Card.Img src={location?.imageUrl} className={"location-guess-target-image"}/>
                    </Card>

                    <ImageLightbox
                        src={location?.imageUrl}
                        isOpen={isLightboxOpen}
                        onClose={() => setIsLightboxOpen(false)}
                    />

                    <GoogleMap
                        marker={marker}
                        initialCenter={marker || undefined}
                        onLocationSelect={handleMapClick}
                    />

                    <div className="location-guess-form-container">
                        {!isGameFinished && (
                            <div>
                                <div className="location-guess-form-container-inputs">
                                    <div>
                                        <Input
                                            label="Guessed location"
                                            value={guessedAddress}
                                            readOnly
                                            placeholder="Click on the map to pick a location"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Error distance"
                                            value={lastErrorDistance ? `${lastErrorDistance}` : ""}
                                            readOnly
                                            placeholder="—"
                                        />
                                    </div>
                                </div>
                                <div className={"w-100 d-flex justify-content-end"}>
                                    <Button
                                        variant={isGameFinished ? "secondary" : "primary"}
                                        className="location-guess-form-container-button"
                                        disabled={!marker || isGuessing || isGameFinished}
                                        isLoading={isGuessing}
                                        onClick={handleGuess}
                                    >
                                        {isGameFinished ? "Out of attempts (Max 5)" : "Guess"}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {isGameFinished && correctLocation && (
                            <div
                                className="p-3 bg-success-subtle text-success-emphasis rounded-3 border border-success-subtle correct-location-container">
                                <span className="fw-bold d-block mb-1">Correct Location Revealed:</span>
                                <small className="d-block fw-medium">
                                    Name: {location?.name || "Secret Place"}
                                </small>
                                <small className="text-muted d-block mt-1">
                                    Coordinates: {correctLocation.lat.toFixed(4)}, {correctLocation.lng.toFixed(4)}
                                </small>
                                <small className="text-muted d-block mt-1">
                                    Your best distance: {lastErrorDistance}
                                </small>
                            </div>
                        )}
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="location-guess-leaderboard-container">
                        <h4 className="fw-black text-secondary mb-4">Leaderboard</h4>
                        <div className="d-flex flex-column">
                            {leaderboard?.length === 0 ? <div>No entries yet.</div> : (
                                leaderboard?.map((entry: LeaderboardEntryDto, index: number) => (
                                    <div key={entry.id}
                                         className={clsx("leaderboard-entry",
                                             {
                                                 "bg-primary text-white": entry.userId === user?.id,
                                                 "bg-white text-dark": entry.userId !== user?.id
                                             }
                                         )}>
                                        <div className="d-flex align-items-center gap-3">
                                            <span id={`leaderboard-${index + 1}`}
                                                  className="leaderboard-entry-circle">{index + 1}</span>
                                            <Avatar src={entry.image} size="small-avatar"/>
                                            <div className={"d-flex flex-column leaderboard-entry-text"}>
                                                <span>{entry.firstName} {entry.lastName}</span>
                                                <p>{toLocalDatetimeInputString(entry.createdAt)}</p>
                                            </div>
                                        </div>
                                        <span className={clsx(
                                            {
                                                "text-white": entry.userId === user?.id,
                                                "text-primary": entry.userId !== user?.id
                                            }
                                        )}>{formatDistance(entry.errorDistance)}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
