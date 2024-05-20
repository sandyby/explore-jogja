import './OpenFloatingTextButton.css'

export default function OpenFloatingTextButton({ showFloatingText }) {
    return (
        <div className="open-floating-text-btn-container">
            <button className="open-floating-text-btn btn" onClick={showFloatingText}>Open Text</button>
        </div>
    )
}

