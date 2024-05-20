import { Link } from "react-router-dom"
import home from '../../assets/home-page.png'
import './BackToMainButton.css'

export default function BackToMainButton() {
    return (
        <div className="back-to-main-btn-container position-absolute">
            <Link to="/">
                <button className="home border-0 rounded-3 p-2"><img className="home-img" src={home} alt="home-btn" /></button>
            </Link>
        </div>
    )
}
