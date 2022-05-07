import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getDayString, useTodays } from "../hooks/useTodays";
import { countries } from "../models/countriy.position";
import { formatCountryName } from "../models/country";
import * as geolib from "geolib";
import { CountryInput } from "./CountryInput";
import { Guesses } from "./Guesses";
import { Share } from "./Share";

const MAX_TRY_COUNT = 6;

export function Game() {
    
    const dayString = useMemo(
        () => getDayString(),
        []
    );

    const inputFieldRef = useRef<HTMLInputElement>(null);

    const [guesses, addGuess, country] = useTodays(dayString); 

    const [currentGuess, setCurrentGuess] = useState("");

    const gameEnded = guesses.length === MAX_TRY_COUNT || guesses[guesses.length - 1]?.distance === 0;

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            if (country == null) return;

            e.preventDefault();
            const guessedCountry = countries.find((country) => formatCountryName(country.name) === formatCountryName(currentGuess));

            if (guessedCountry === null) {
                return;
            }

            const newGuess = {
                name: currentGuess,
                distance: geolib.getDistance(guessedCountry!, country),
                direction: geolib.getCompassDirection(
                    guessedCountry!,
                    country,
                    (origin, dest) => Math.round(geolib.getRhumbLineBearing(origin, dest) / 45) * 45
                ),
            };

            addGuess(newGuess);
            setCurrentGuess("");

            if (newGuess.distance === 0) {
                //TODO: Toast
            }

        },
        [addGuess, country, currentGuess]
    );

    useEffect(() => {
        if (country && guesses.length === MAX_TRY_COUNT && guesses[guesses.length - 1].distance > 0) {
            //TODO: Toast
        }

        return () => {
            // TODO: Dismiss toast
        };
    }, [country, guesses]);

    return (
        <div className="flex-grow flex flex-col mx-2">
            <div className="flex my-1">
            <img 
                className="pointer-events-none max-h-52 my-7 mx-auto transition-transform duration-700 ease-in h-full"
                src={`images/flags/${country?.code.toLocaleLowerCase()}.svg`}
                alt="flag to guess" />
            </div>
            <Guesses
                rowCount={MAX_TRY_COUNT}
                guesses={guesses}
            />
            <div className="my-2">
                {gameEnded && country ? (
                    <>
                    <Share
                        guesses={guesses}
                        dayString={dayString}
                    />
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a 
                            className="underline text-cener block mt-4 whitespace-nowrap"
                            href={`https://google.com/maps?q=${country.name}+${country.code.toUpperCase()}`}
                            target="_blank"
                            rel="noopener noreferrer">
                                Show on Google Maps
                        </a>
                        <a 
                            className="underline text-cener block mt-4 whitespace-nowrap"
                            href={`https://wikipedia.org/wiki/${country.name}`}
                            target="_blank"
                            rel="noopener noreferrer">
                                Show on Wikipedia</a>
                    </div>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <CountryInput
                            inputRef={inputFieldRef}
                            currentGuess={currentGuess}
                            setCurrentGuess={setCurrentGuess}
                        />
                        <button
                            className="rounded font-bold p-1 flex items-center justify-center border-2 uppercase my-0.5 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
                            type="submit"
                        >Guess</button>
                    </div>
                </form>
                )}
            </div>
        </div>
    )
}