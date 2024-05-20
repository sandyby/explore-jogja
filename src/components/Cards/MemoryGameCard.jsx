import './MemoryGameCard.css'

export default function MemoryGameCard({ card, backCard, choiceHandler, isFlipped, isDisabled }) {

    const clickHandler = () => {
        if (!isDisabled) {
            choiceHandler(card);
        }
    }

    return (
        <div className="card">
            <div className={isFlipped ? "flipped" : ""}>
                <div className="card-image">
                    <img className="front-side" src={card.src} alt="card-front-side" />
                    <img className="back-side" src={backCard} alt="card-back-side" onClick={() => { clickHandler() }} />
                </div>
            </div>
        </div>
    )
}
