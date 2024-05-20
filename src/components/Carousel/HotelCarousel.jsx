import { createPortal } from 'react-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { BalanceContext } from '../../contexts/BalanceContext';
import React from 'react';
import Slider from "react-slick";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CarouselPilihButton from '../Buttons/CarouselPilihButton';
import hotelDataSet from './HotelData.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HotelCarousel.css';

const SampleNextArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="slick-arrow slick-next carousel-next-arrow"
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="slick-arrow slick-prev carousel-prev-arrow"
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const HotelCarousel = ({ closeCarousel, dataSet }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeCarousel();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeCarousel]);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        AOS.init();
    }, [])

    return createPortal(
        <>
            <div className="hotel-carousel-modal-overlay" data-aos='zoom-out'>
                <div className="hotel-carousel-modal-container" ref={modalRef}>
                    <div className="close-hotel-carousel-modal-btn-container">
                        <button className='close-hotel-carousel-modal-btn btn fs-3' onClick={closeCarousel}>&times;</button>
                    </div>
                    <div className="hotel-carousel-modal-content">
                        <Slider {...settings} className="hotel-carousel-slider">
                            {dataSet.map(d => (
                                <div key={d.hotelName} className="hotel-carousel-card">
                                    <div className="image-container">
                                        <img src={d.hotelImg} alt="" className="profile-image" />
                                    </div>
                                    <div className="hotel-carousel-card-texts-container">
                                        <p className="hotel-carousel-card-texts text-xl">{d.hotelName}</p>
                                        <p className="hotel-carousel-card-texts ">⭐{d.hotelRating}</p>
                                        {/* <p className="hotel-carousel-card-texts happiness-get"><span style={{ fontWeight: "bold" }}>+</span>😁{d.happinessGet}<br /><span style={{ fontWeight: "bold" }}>-</span>⚡{d.energi}</p> */}
                                        <p className="hotel-carousel-card-texts happiness-get"><span style={{ fontWeight: "bold" }}>+</span>⚡{d.energyGet}<br /><span style={{ fontWeight: "bold" }}>+</span>😁{d.happinessGet}</p>
                                        <CarouselPilihButton kegiatan={d.hotelName} biaya={d.hotelPrice} energi={d.energyGet} happiness={d.happinessGet} closeCarousel={closeCarousel} isHotel={true} />
                                        {/* <button className='button'>Pilih</button> */}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )

};

export default HotelCarousel;