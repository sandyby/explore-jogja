import { useState } from "react"
import BackToMapModalPrompt from "../Modals/Buttons/BackToMapModalPrompt"
import peta from '../../assets/map.png'
import './BackToMapButton.css'

export default function BackToMapButton() {
    const [showPrompt, setShowPrompt] = useState(false);

    return (
        <div className="back-to-map-btn-container position-absolute">
            <button className="map-btn bg-transparent border-0 rounded-3 p-2" onClick={() => { setShowPrompt(true); }}><img className="map" src={peta} alt="" /></button>
            {showPrompt && <BackToMapModalPrompt closePrompt={() => { setShowPrompt(false) }} />}
        </div>
    )
}
