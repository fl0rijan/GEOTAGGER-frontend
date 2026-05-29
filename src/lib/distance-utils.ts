export const formatDistance = (meters: number | null | undefined): string => {
    if (meters === null || meters === undefined) return "";

    if (meters >= 1000) {
        const km = meters / 1000;
        return `${Number(km.toFixed(1))} km`;
    }

    return `${meters.toFixed(0)} m`;
};