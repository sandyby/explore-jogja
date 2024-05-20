import sleepIcon2 from '../../assets/hotel-assets/sleep-icon-2.png'
import './HotelCarouselButton.css'

export default function HotelCarouselButton({ openCarousel }) {
    return (
        <div className="hotel-carousel-btn-container position-absolute">
            <button className="hotel border-0 rounded-3 p-2" onClick={openCarousel}><img className="hotel-img" src={sleepIcon2} alt="hotel-btn" /></button>
        </div>
    )
}