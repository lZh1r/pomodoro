import {useEffect, useState} from "react";

type Callback = () => void;

export default function ModeButton({text, isActive, callback}: {text: string, isActive: boolean, callback:Callback}) {

    const [weight, setWeight] = useState("normal");

    useEffect(() => {
        let newWeight;
        if (isActive) {
            newWeight = "bold";
        }
        else {
            newWeight = "normal";
        }
        setWeight(newWeight);
    }, [isActive]);

    return (
        <button style={{fontWeight: weight}} onClick={() => {
            callback();
        }} className="text-2xl m-7 bg-bg outline-2 outline-solid outline-white text-white rounded-4xl p-3 cursor-pointer
        hover:scale-105 transition-all">
            {text}
        </button>
    )
}