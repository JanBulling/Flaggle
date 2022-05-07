import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { countries } from "../models/countriy.position";
import { formatCountryName } from "../models/country";


interface CountryInputProps {
    inputRef: React.RefObject<HTMLInputElement>;
    currentGuess: string;
    setCurrentGuess: (guess: string) => void;
}

export function CountryInput({
    inputRef,
    currentGuess,
    setCurrentGuess,
  }: CountryInputProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    return (
        <Autosuggest
            theme={{suggestionHighlighted: "font-bold"}}
            shouldRenderSuggestions={() => true}
            highlightFirstSuggestion
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => setSuggestions(
                countries.map((c) => c.name.toUpperCase())
                .filter((name) => formatCountryName(name).includes(formatCountryName(value)))
                .sort()
            )}
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={(suggestions) => suggestions}
            renderSuggestion={(suggestion) => (
                <div className="m-0.5 bg-white p-1 cursor-pointer">
                    {suggestion}
                </div>
            )}
            containerProps={{
                className: "border-2 rounded flex-auto relative",
            }}
            inputProps={{
                ref: inputRef,
                className: "w-full p-1",
                placeholder: "Guess a country or territory",
                value: currentGuess,
                onChange: (_e, { newValue }) => setCurrentGuess(newValue),
            }}
            renderSuggestionsContainer={({ containerProps, children }) => (
                <div {...containerProps}
                    className={`${containerProps.className} rounded absolute bottom-full w-full bg-gray-300 mb-1 divide-x-2 max-h-52 overflow-auto`}>
                    {children}
                </div>
            )}
        />
    )
}