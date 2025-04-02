import {ReactNode} from "react";

type Callback = () => void;

export default function SettingModal({isOpen, onClose, children, bgColor, textColor}:
    {isOpen:boolean, onClose:Callback, children:ReactNode, bgColor:string, textColor:string}) {

    return (
        <>
            { isOpen && (
            <div style={{backgroundColor:bgColor, color:textColor}} className="text-2xl w-5xs m-4 sm:m-7 outline-2 outline-solid
            rounded-4xl p-3 absolute place-self-center">
                {children}
                <button className="text-2xl w-5xs m-4 sm:m-7 outline-2 outline-solid rounded-4xl p-3 cursor-pointer
        hover:scale-105 transition-all" onClick={onClose}>Close Me</button>
            </div>
            )}
        </>
    )
}