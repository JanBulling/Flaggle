import { formatDistance, getDirectionArrow } from "../models/georaphy";
import { Guess } from "../models/guess";

interface GuessRowProps {
    guess?: Guess
}

export function GuessRow({
    guess
}: GuessRowProps) {

    if (guess == null) {
        return (
            <div className="col-span-7 h-8 bg-gray-200 rounded">

            </div>
        )
    } else {
        return (
            <>
                <div className="flex items-center justofy-center border-2 h-8 col-span-4 rounded">
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">{guess?.name.toUpperCase()}</p>
                </div>
                <div className="flex items-center justify-center border-2 h-8 col-span-2 rounded">
                    {guess && formatDistance(guess.distance, "km")}
                </div>
                <div className="flex items-center justify-center border-2 h-8 col-span-1 rounded">
                    {guess && getDirectionArrow(guess)}
                    
                </div>
            </>
        )
    }
}