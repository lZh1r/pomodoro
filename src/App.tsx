import Timer from "./Timer.tsx";
import SettingModal from "./SettingModal.tsx";
import {ChangeEvent, useEffect, useState} from "react";

function App() {

    const modeNames = ["Work", "Short Break", "Long Break"];
    const [mainColor, setMainColor] = useState('#a2bac8');
    const [textColor, setTextColor] = useState('#ffffff');
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

    useEffect(
        () => {document.getElementById("body")!.style.backgroundColor = mainColor},
        [mainColor]
    )

    return (
        <div style={{backgroundColor:mainColor, color:textColor, outlineColor:textColor}} className="text-center font-primary h-screen
        flex flex-col justify-center">
            <Timer times={modeTimes} bgColor={mainColor} textColor={textColor}/>
            <button className="md:text-2xl text-xl xl:text-4xl xl:w-xs w-5xs m-4 sm:m-7 outline-2 outline-solid rounded-4xl p-3 cursor-pointer
        hover:scale-105 transition-all w-3xs place-self-center" onClick={() => {
                setIsSettingsModalOpen(true);
            }}>Show Settings</button>
            <SettingModal
                bgColor={mainColor}
                textColor={textColor}
                isOpen={isSettingModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                children={
                <>
                    <h1 className="md:text-3xl xl:text-5xl text-2xl font-bold mb-5">Settings</h1>
                    <h2 className="md:text-2xl xl:text-4xl text-xl font-bold mb-5">Time Settings</h2>
                    {modeTimes.map((time, index) => {
                        return <div key={index}>
                            <h1 className="xl:text-3xl">{modeNames[index]}</h1>
                            <input className="w-[40%] md:w-xs outline-2 outline-solid rounded-4xl m-3 text-center xl:text-3xl"
                                   id={index.toString()} type="number" defaultValue={time.toString()} onChange={handleTimeChange}></input>
                        </div>

                    })}
                    <h2 className="md:text-2xl xl:text-4xl text-xl font-bold mt-5 mb-5">Theme Settings</h2>
                    <div className="flex justify-evenly flex-row xl:text-3xl">
                        <div>
                            <h3>Main Color</h3>
                            <input className="[&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:outline-3 p-1 m-2 h-14 w-14 cursor-pointer"
                                   value={mainColor} onChange={(e) => setMainColor(e.target.value)} type="color"/>
                        </div>
                        <div>
                            <h3>Text Color</h3>
                            <input className="[&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:outline-3 p-1 m-2 h-14 w-14 cursor-pointer"
                                   value={textColor} onChange={(e) => setTextColor(e.target.value)} type="color"/>
                        </div>
                    </div>
                </>
            }
            />
        </div>
  )
}

export default App
