export const toLocalDatetimeInputString = (dateInput: Date | string): string => {
    const date = new Date(dateInput);
    const now = new Date();

    const msDiff = Math.abs(date.getTime() - now.getTime());
    const minutesDiff = msDiff / (1000 * 60);
    const hoursDiff = minutesDiff / 60;

    if (minutesDiff < 60) {
        return `${Math.round(minutesDiff)} mins ago`;
    }

    if (hoursDiff <= 24) {
        return `${Math.round(hoursDiff)} hours ago`;
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2);
    const year = date.getFullYear();

    return `${day}. ${month}. ${year}`;
};

export const getFutureLocalDatetimeInputString = (minutesToAdd: number = 1): string => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return toLocalDatetimeInputString(date);
};