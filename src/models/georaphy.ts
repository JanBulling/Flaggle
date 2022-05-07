import { Guess } from "./guess";

export type Direction = 
    | "S"
    | "W"
    | "NNE"
    | "NE"
    | "ENE"
    | "E"
    | "ESE"
    | "SE"
    | "SSE"
    | "SSW"
    | "SW"
    | "WSW"
    | "WNW"
    | "NW"
    | "NNW"
    | "N";

const DIRECTION_ARROWS: Record<Direction, string> = {
    N: "⬆️",
    NNE: "↗️",
    NE: "↗️",
    ENE: "↗️",
    E: "➡️",
    ESE: "↘️",
    SE: "↘️",
    SSE: "↘️",
    S: "⬇️",
    SSW: "↙️",
    SW: "↙️",
    WSW: "↙️",
    W: "⬅️",
    WNW: "↖️",
    NW: "↖️",
    NNW: "↖️",
};

export function getDirectionArrow(guess: Guess) {
    return guess.distance === 0 ? "🎉" : DIRECTION_ARROWS[guess.direction];
}

export function computeProximityPercent(distance: number): number {
    const proximity = Math.max(20_000_000 - distance, 0);
    return Math.floor((proximity / 20_000_000) * 100);
}

export function formatDistance(distanceInMeters: number, distanceUnit: "km" | "miles"): string {
    const distanceInKm = distanceInMeters / 1000;

    return distanceUnit === "km" 
        ? `${Math.round(distanceInKm).toLocaleString()}km`
        : `${Math.round(distanceInKm * 0.621371).toLocaleString()}mi`
}