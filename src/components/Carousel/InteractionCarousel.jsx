import { createPortal } from 'react-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import React from 'react';
import Slider from "react-slick";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CarouselPilihButton from '../Buttons/CarouselPilihButton';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './InteractionCarousel.css';

const SampleNextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow slick-next carousel-next-arrow"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev carousel-prev-arrow"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const Carousel = ({ closeCarousel, dataSet }) => {
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
      <div className="interaction-carousel-modal-overlay">
        <div className="interaction-carousel-modal-container" ref={modalRef}>
          <div className="close-interaction-carousel-modal-btn-container">
            <button className='close-interaction-carousel-modal-btn btn fs-3' onClick={closeCarousel}>&times;</button>
          </div>
          <div className="interaction-carousel-modal-content">
            <Slider {...settings} className="interaction-carousel-slider">
              {dataSet.map(d => (
                <div key={d.name} className="interaction-carousel-card">
                  <div className="image-container">
                    <img src={d.img} alt="" className="profile-image" />
                  </div>
                  <div className="interaction-carousel-card-texts-container">
                    <p className="interaction-carousel-card-texts text-xl">{d.name}</p>
                    <p className="interaction-carousel-card-texts ">{d.review}</p>
                    {d.energi > 0 ?
                      <p className="interaction-carousel-card-texts happiness-get"><span style={{ fontWeight: "bold" }}>+</span>⚡{d.energi}<br /><span style={{ fontWeight: "bold" }}>+</span>😁{d.happinessGet}</p>
                      :
                      <p className="interaction-carousel-card-texts happiness-get"><span style={{ fontWeight: "bold" }}>+</span>😁{d.happinessGet}</p>
                    }
                    <CarouselPilihButton kegiatan={d.name} biaya={d.biaya} energi={d.energi} happiness={d.happinessGet} closeCarousel={closeCarousel} isHotel={false} />
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

export default Carousel;