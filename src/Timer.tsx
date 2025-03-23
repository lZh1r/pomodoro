import {useEffect, useState} from "react";
import ModeButton from "./ModeButton.tsx";

export default function Timer() {

    const workTime = 1500;
    const shortBreakTime = 300;
    const longBreakTime = 600;

    const modes = ["Pomodoro", "Short Break", "Long Break"];
    const modeTimes = [1500, 300, 600];
    const [isSelected, setIsSelected] = useState([true, false, false]);

    const [timeChange, setTimeChange] = useState(0);
    const [time, setTime] = useState(workTime);
    const [buttonText, setButtonText] = useState('Start');
    const [currentCycle, setCurrentCycle] = useState("Work");
    const [nextCycle, setNextCycle] = useState("Short Break");
    const [streak, setStreak] = useState(0);
    const [shadowRadius, setShadowRadius] = useState('0');
    const [textScale, setTextScale] = useState('1');

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => t - timeChange);

            document.title = `${formatTime(time)} ${currentCycle}`;

            if (time === 0) {
                const newNextCycle = currentCycle;
                setCurrentCycle(nextCycle);
                setNextCycle(newNextCycle);
                alert("Session Ended!!!")

                if (newNextCycle === "Work") {
                    setStreak(s => s + 1);

                    if (streak === 3) {
                        setStreak(0);
                        setCurrentCycle("Long Break");
                        setTime(longBreakTime);
                    }
                    else {
                        setTime(shortBreakTime);
                    }
                }
                else {
                    setTime(workTime);
                }
            }


        }, 1000);
        return () => {clearInterval(interval)}
    }, [time, timeChange])

    function formatTime(num:number) {
        const minutes = Math.floor(num / 60);
        const seconds = num % 60;

        return `${padZero(minutes)}:${padZero(seconds)}`
    }

    function padZero(num:number) {
        return num < 10 ? `0${num}` : num.toString()
    }

    function handlePause() {
        let newTimeChange;
        let newButtonText;
        let newShadowRadius;
        let newTextScale;

        if (timeChange === 0) {
            newTimeChange = 1;
            newButtonText = "Pause";
            newShadowRadius = '10';
            newTextScale = '1.1';
        }
        else {
            newTimeChange = 0;
            newButtonText = "Start";
            newShadowRadius = "0";
            newTextScale = '1';
        }

        setTimeChange(newTimeChange);
        setButtonText(newButtonText);
        setShadowRadius(newShadowRadius);
        setTextScale(newTextScale);
    }

    function constructNewArray(index:number) {
        const newArray = [false, false, false];
        newArray[index] = true;
        return newArray;
    }

    return (
        <div className="text-center font-primary h-screen flex flex-col justify-center bg-bg">
            <div className="mb-10">

                {modes.map((modeName, index) => (
                    <ModeButton key={index} text={modeName} isActive={isSelected[index]} callback={() => {
                        setTimeChange(0);
                        setCurrentCycle(() => index === 0 ? "Work" : modes[index]);
                        setIsSelected(constructNewArray(index));
                        setTime(modeTimes[index]);
                        setButtonText("Start");
                        setShadowRadius("0");
                        setTextScale("1");
                    }}/>
                ))}
            </div>
            <div>
                <h1 style={{textShadow: `0 0 ${shadowRadius}px white`, scale: textScale}} className="
                place-self-center w-xs text-5xl font-medium text-white transition-all">{currentCycle}</h1>
                <h1 className="place-self-center m-10 p-3 w-2xs rounded-4xl text-5xl font-bold bg-white text-bg">{formatTime(time)}</h1>
                <button className="text-4xl font-medium cursor-pointer outline-2 outline-solid outline-white rounded-md
                 p-3 text-white hover:scale-105 transition-all" onClick={handlePause}>{buttonText}</button>
            </div>
        </div>
    )
}