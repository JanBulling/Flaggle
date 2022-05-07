import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { Country } from "../models/country";
import { Guess, loadAllGuesses, saveGuesses } from "../models/guess";
import seedrandom from "seedrandom";
import { countries } from "../models/countriy.position";

export function getDayString(): string {
    return DateTime.now().toFormat("yyyyMMdd");
}

export function useTodays(dayString: string): [
    guesses: Guess[],
    addGuess: (guess: Guess) =>void,
    country?: Country,
] {
    const [todays, setTodays] = useState<{
        country?: Country;
        guesses: Guess[];
    }>({guesses: []});

    const addGuess = useCallback(
        (newGuess: Guess) => {
            if (todays == null) return;

            const newGuesses = [...todays.guesses, newGuess];

            setTodays((prev) => ({country: prev.country, guesses: newGuesses}));
            saveGuesses(dayString, newGuesses);
        },
        [dayString, todays]
    );

    useEffect(() => {
        const guesses = loadAllGuesses()[dayString] ?? [];
        const country = getCountry(dayString);

        setTodays({country, guesses});
    }, [dayString]);

    return [todays.guesses, addGuess, todays.country];
}

function getCountry(dayString: string): Country {
    const randomIndex = seedrandom.alea(dayString)() * countries.length;
    const countryIndex = Math.floor(randomIndex);
    const pickedCountry: Country = countries[countryIndex];

    return pickedCountry;
}