import {useEffect, useState} from "react";
import ModeButton from "./ModeButton.tsx";

export default function Timer() {

    const workTime = 1500;
    const shortBreakTime = 300;
    const longBreakTime = 600;

    const [timeChange, setTimeChange] = useState(0);
    const [time, setTime] = useState(workTime);
    const [buttonText, setButtonText] = useState('Start');
    const [currentCycle, setCurrentCycle] = useState("Work");
    const [nextCycle, setNextCycle] = useState("Short Break");
    const [streak, setStreak] = useState(0);
    const [is1Bold, setIs1Bold] = useState(true);
    const [is2Bold, setIs2Bold] = useState(false);
    const [is3Bold, setIs3Bold] = useState(false);
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
                        setCurrentCycle("Long Break")
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

    return (
        <div className="text-center font-primary h-screen flex flex-col justify-center bg-bg">
            <div className="mb-10">
                <ModeButton text="Pomodoro" isActive={is1Bold} callback={function (): void {
                    //kill me on the spot
                    setTimeChange(0);
                    setCurrentCycle("Work");
                    setButtonText("Start");
                    setTime(workTime);
                    setIs1Bold(true);
                    setIs2Bold(false);
                    setIs3Bold(false);
                }}/>
                <ModeButton text="Short Break" isActive={is2Bold} callback={function (): void {
                    setTimeChange(0);
                    setCurrentCycle("Short Break");
                    setButtonText("Start");
                    setTime(shortBreakTime);
                    setIs1Bold(false);
                    setIs2Bold(true);
                    setIs3Bold(false);
                }}/>
                <ModeButton text="Long Break" isActive={is3Bold} callback={function (): void {
                    setTimeChange(0);
                    setCurrentCycle("Long Break");
                    setButtonText("Start");
                    setTime(longBreakTime);
                    setIs1Bold(false);
                    setIs2Bold(false);
                    setIs3Bold(true);
                }}/>
            </div>
            <div>
                <h1 style={{textShadow: `0 0 ${shadowRadius}px white`, scale: textScale}} className="
                place-self-center w-2xs text-5xl font-medium text-white transition-all">{currentCycle}</h1>
                <h1 className="place-self-center m-10 p-3 w-2xs rounded-4xl text-5xl font-bold bg-white text-bg">{formatTime(time)}</h1>
                <button className="text-4xl font-medium cursor-pointer outline-2 outline-solid outline-white rounded-md
                 p-3 text-white hover:scale-105 transition-all" onClick={handlePause}>{buttonText}</button>
            </div>
        </div>
    )
}