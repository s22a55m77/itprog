import React, { useRef, useState, useEffect, useContext } from 'react';
import { CarContext } from '../../App';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import './swiper.css'

// import required modules
import { Mousewheel, EffectCoverflow, Pagination } from "swiper";
import DishCard from '../DishCard/DishCard';

export default function SwiperCard() {
  const change = (data) => {
    console.log(data.realIndex);
  };

  return (
    <>
      <h2
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginLeft: '10px',
          marginBottom: '-50px',
          border: '1px black',
          borderRadius: '50%',
        }}
      >
        Main
      </h2>
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
          <SwiperSlide><DishCard /></SwiperSlide>
          <SwiperSlide><DishCard /></SwiperSlide>
          <SwiperSlide><DishCard /></SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
