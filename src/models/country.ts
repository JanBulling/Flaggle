export interface Country {
    code: string,
    latitude: number,
    longitude: number,
    name: string;
}

export function formatCountryName(countryName: string): string {
    return countryName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[- '()]/g, "")
        .toLowerCase();
}