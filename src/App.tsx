import Timer from "./Timer.tsx";
import SettingModal from "./SettingModal.tsx";
import {ChangeEvent, useState} from "react";

function App() {

    const modeNames = ["Work", "Short Break", "Long Break"]
    const [modeTimes, setModeTimes] = useState([1500, 300, 600]);
    const [isSettingModalOpen, setIsSettingsModalOpen] = useState(false);

    function handleTimeChange(event:ChangeEvent<HTMLInputElement>) {
        const newModeTimes = modeTimes;
        //TODO: HOLY SHT REDO THIS
        const index = Number(event.target.id);
        let newTime = Number(event.target.value);
        newTime = newTime > 3600 ? 3600 : (newTime < 0 ? 10 : newTime);
        newModeTimes[index] = newTime;
        setModeTimes(newModeTimes);
    }

    return (
        <div className="text-center font-primary h-screen flex flex-col justify-start sm:justify-center bg-bg">
            <Timer times={modeTimes}/>
            <button className="text-2xl w-5xs m-4 sm:m-7 bg-bg outline-2 outline-solid outline-white text-white rounded-4xl p-3 cursor-pointer
        hover:scale-105 transition-all w-3xs place-self-center" onClick={() => setIsSettingsModalOpen(true)}>Show Settings</button>
            <SettingModal
                isOpen={isSettingModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                children={
                <>
                    <h1 className="text-3xl font-bold mb-5">Settings</h1>
                    <form>
                        {modeTimes.map((time, index) => {
                            return <>
                                <h1>{modeNames[index]}</h1>
                                <input className="w-[40%] md:w-xs outline-2 outline-solid outline-white text-white rounded-4xl m-3 text-center place-self-center"
                                       id={index.toString()} key={index} type="number" defaultValue={time.toString()} onChange={handleTimeChange}></input>
                            </>

                        })}
                    </form>
                </>
            }
            />
        </div>
  )
}

export default App
