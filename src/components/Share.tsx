import { DateTime, Interval } from "luxon";
import { useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Guess } from "../models/guess";

interface ShareProps {
    guesses: Guess[];
    dayString: string;
}

export function Share({
    guesses,
    dayString
}: ShareProps) {

    const shareText = useMemo(() => {
        const win = guesses[guesses.length - 1].distance === 0;
        const bestDistance = Math.min(...guesses.map(({distance}) => distance));
        const guessCount = win ? guesses.length : "X";
        const todayString = DateTime.fromFormat(dayString, "yyyyMMdd").toFormat("dd.MM.yyyy");

        const title = `#Flaggle ${todayString} ${guessCount}/6 -> ${bestDistance}km`;
        
        return [title, "https://worldle.teuteuf.fr"].join("\n");
    }, [dayString, guesses])
    
    return (
        <CopyToClipboard
            text={shareText}
            options={{
                format: "text/plain",
            }}
            >
            <button className="rounded font-bold border-2 p-1 uppercase bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black w-full">
                Share 
            </button>  
        </CopyToClipboard>
    );
}