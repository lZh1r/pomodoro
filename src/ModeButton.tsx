import {useEffect, useState} from "react";

type Callback = () => void;

export default function ModeButton({text, isActive, callback}: {text: string, isActive: boolean, callback:Callback}) {

    const [weight, setWeight] = useState("normal");

    useEffect(() => {
        setWeight(isActive ? "bold" : "normal");
    }, [isActive]);

    return (
        <button style={{fontWeight: weight}} onClick={() => {
            callback();
        }} className="text-2xl w-5xs m-4 sm:m-7 outline-2 outline-solid rounded-4xl p-3 cursor-pointer
        hover:scale-105 transition-all">
            {text}
        </button>
    )
}