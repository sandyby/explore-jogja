import { useState } from 'react'
import MemoryGameModalPrompt from '../Modals/MemoryGame/MemoryGameModalPrompt';
import icon from '../../assets/game-icon.png'
import './MemoryGameButton.css'

export default function MemoryGameButton({ openMemoryGame, biaya, energi }) {
    const [isShowing, setShowing] = useState(false);

    return (
        <>
            {isShowing && <MemoryGameModalPrompt closePrompt={() => { setShowing(!isShowing) }} openMemoryGame={openMemoryGame} biaya={biaya} energi={energi}/>}
            <div className='game-btn-container position-absolute'>
                <button className="game border-0 rounded-3 p-2" onClick={() => { setShowing(true) }}><img className="game-img" src={icon} alt="" /></button>
            </div>
        </>
    )
}