import {ReactNode} from "react";

type Callback = () => void;

export default function SettingModal({isOpen, onClose, children}:{isOpen:boolean, onClose:Callback, children:ReactNode}) {

    return (
        <>
            { isOpen && (
            <div className="text-2xl w-5xs m-4 sm:m-7 bg-bg outline-2 outline-solid outline-white
            text-white rounded-4xl p-3 transition-all absolute place-self-center">
                {children}
                <button className="text-2xl w-5xs m-4 sm:m-7 bg-bg outline-2 outline-solid outline-white text-white rounded-4xl p-3 cursor-pointer
        hover:scale-105 transition-all" onClick={onClose}>Close Me</button>
            </div>
            )}
        </>
    )
}