import {useCallback, useEffect, useReducer, useState} from "react";
import ModeButton from "./ModeButton.tsx";

enum actions {
    SWITCH = 'switch_mode',
    PAUSE = 'pause',
    UPDATE = 'update',
    CYCLE = 'cycle'
}

export default function Timer({times, bgColor, textColor}:{times:number[], bgColor:string, textColor:string}) {

    const modes = ["Pomodoro", "Short Break", "Long Break"];
    const modeTimes = times;

    const cycles = {
        WORK : {name: 'Work', time: modeTimes[0]},
        SHORT_BREAK : {name: 'Short Break', time: modeTimes[1]},
        LONG_BREAK : {name: 'Long Break', time: modeTimes[2]}
    }

    interface timerState {
        time : number;
        timeChange : number;
        buttonText : string;
        currentCycle : string;
        streak : number;
        shadowRadius : number;
        textScale : number;
        selected : boolean[];
    }

    interface PomAction {
        type : actions,
        payload? : number
    }

    function reducer(state:timerState, action:PomAction):timerState {
        const {type, payload} = action;

        const index = payload ?? 0;

        switch (type) {
            case actions.SWITCH : {
                return {
                    ...state,
                    time: modeTimes[index],
                    timeChange: 0,
                    buttonText: "Start",
                    currentCycle: index === 0 ? cycles.WORK.name : modes[index],
                    streak: 0,
                    shadowRadius: 0,
                    textScale: 1
                }
            }
            case actions.PAUSE : {
                if (state.timeChange === 0) {
                    return {
                        ...state,
                        timeChange: 1,
                        buttonText: "Pause",
                        shadowRadius: 10,
                        textScale: 1.1
                    }
                }
                else {
                    return {
                        ...state,
                        timeChange: 0,
                        buttonText: "Start",
                        shadowRadius: 0,
                        textScale: 1
                    }
                }
            }
            case actions.UPDATE : {
                return {
                    ...state,
                    time: state.time - state.timeChange
                }
            }
            case actions.CYCLE : {
                console.log(state.streak + 1, state.currentCycle);
                return {
                    ...state,
                    streak: state.streak === 6 ? -1 : state.streak + 1,
                    currentCycle: state.currentCycle === cycles.WORK.name ? (state.streak === 6 ? cycles.LONG_BREAK.name : cycles.SHORT_BREAK.name) : cycles.WORK.name,
                    time: state.currentCycle === cycles.WORK.name ? (state.streak === 6 ? cycles.LONG_BREAK.time : cycles.SHORT_BREAK.time) : cycles.WORK.time,
                }
            }
            default : throw new Error("Unknown action!")
        }

    }

    const defaultState = {time: cycles.WORK.time, timeChange: 0, buttonText: "Start", currentCycle: cycles.WORK.name, streak: 0, shadowRadius: 0, textScale: 1, selected: [true, false, false]}

    const [state, dispatch] = useReducer(reducer, defaultState);
    const [isSelected, setIsSelected] = useState([true, false, false]);
    const formatTime = useCallback((num:number) => {
        const minutes = Math.floor(num / 60);
        const seconds = num % 60;

        return `${padZero(minutes)}:${padZero(seconds)}`;
    }, []);

    function padZero(num:number) {
        return num < 10 ? `0${num}` : num.toString();
    }

    useEffect(() => {
        const interval = setInterval(() => {

            document.title = `${formatTime(state.time)} ${state.currentCycle}`;

            dispatch({type: actions.UPDATE});

            if (state.time === 0) {
                dispatch({type: actions.CYCLE})
            }

        }, 1000);
        return () => {clearInterval(interval)}
    }, [state.time, state.currentCycle, formatTime])

    function constructNewArray(index:number) {
        const newArray = [false, false, false];
        newArray[index] = true;
        return newArray;
    }

    return (
        <div>
            <div className="md:mb-10 mb-3 max-lg:flex max-lg:flex-col max-lg:place-self-center">
                {modes.map((modeName, index) => (
                    <ModeButton key={index} text={modeName} isActive={isSelected[index]} callback={() => {
                        dispatch({type: actions.SWITCH, payload: index});
                        setIsSelected(constructNewArray(index));
                    }}/>
                ))}
            </div>
            <div>
                <h1 style={{textShadow: `0 0 ${state.shadowRadius}px ${textColor}`, scale: state.textScale}} className="
                place-self-center w-xs md:text-5xl xl:text-6xl text-4xl font-medium transition-all">{state.currentCycle}</h1>
                <h1 style={{backgroundColor:textColor, color:bgColor, outlineColor:bgColor}}
                    className="place-self-center md:m-10 m-5 p-3 w-2xs rounded-4xl md:text-5xl xl:text-6xl text-4xl font-bold">{formatTime(state.time)}</h1>
                <button className="md:text-4xl xl:text-5xl text-3xl font-medium cursor-pointer outline-2 outline-solid rounded-md
                 p-3 hover:scale-105 transition-all" onClick={() => dispatch({type: actions.PAUSE})}>{state.buttonText}</button>
            </div>
        </div>
    )
}