import { Link } from "react-router-dom"
import home from '../assets/home-page.png'
import './ErrorPage.css'

export default function ErrorPage() {
    return (
        <div className='error-page-container'>
            <h2>Balik Bang</h2>
            <div className="back position-absolute">
            <Link to="/">
                <button className="main border-0 rounded-3 p-2"><img className="main-img" src={home} alt="main-btn" /></button>
            </Link>
        </div>
        </div>
    )
}
