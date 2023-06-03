import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import './swiper.css'

// import required modules
import { Mousewheel, EffectCoverflow, Pagination } from "swiper";

export default function App() {
  const ref = useRef();

  const change = (data) => {
    console.log(data.realIndex);
  };

  return (
    <>
      <div style={{
        position: 'relative',
        marginTop: '10px',
        height: '100%',
      }}>
        <Swiper
          onSlideChange={change}
          effect={"coverflow"}
          direction={"horizontal"}
          centeredSlides={true}
          slidesPerView={3}
          initialSlide={1}
          coverflowEffect={{
            rotate: 0,
            stretch: -100,
            depth: 400,
            modifier: 1,
            slideShadows: false,
          }}
          loop
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, EffectCoverflow, Pagination]}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
