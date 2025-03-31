import Timer from "./Timer.tsx";
import SettingModal from "./SettingModal.tsx";
import {useState} from "react";

function App() {

    const [isSettingModalOpen, setIsSettingsModalOpen] = useState(false);

    return (
        <div className="text-center font-primary h-screen flex flex-col justify-start sm:justify-center bg-bg">
            <Timer/>
            <button className="text-2xl w-5xs m-4 sm:m-7 bg-bg outline-2 outline-solid outline-white text-white rounded-4xl p-3 cursor-pointer
        hover:scale-105 transition-all w-3xs place-self-center" onClick={() => setIsSettingsModalOpen(true)}>Show Settings</button>
            <SettingModal
                isOpen={isSettingModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                children={
                <>
                    <h1>Settings</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nulla rutrum, imperdiet justo sed, porta libero. Duis vitae lobortis purus, ut sodales libero. Aenean posuere diam risus, sit amet sollicitudin ligula ultrices in. Praesent turpis augue, viverra quis mattis in, hendrerit a turpis. In aliquam nisi et justo sodales, ut maximus magna pellentesque. Proin a consequat purus, nec blandit tellus. Donec at urna nibh. Suspendisse nec convallis leo. Morbi commodo, urna at mattis ornare, est nibh vestibulum magna, non consectetur tortor est a nibh. Aenean pellentesque felis vel nibh sodales, molestie rhoncus quam dictum. Aenean egestas, lacus vel lacinia tempus, tortor nunc pretium quam, eu bibendum mi velit vel dolor. Sed ac felis posuere nulla dapibus rhoncus. Nunc eu metus accumsan, cursus nunc vitae, cursus risus. Phasellus interdum id enim vel ultrices. Nulla convallis gravida sapien, non mollis sapien tempor eget.</p>
                </>
            }
            />
        </div>
  )
}

export default App
