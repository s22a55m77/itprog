import React, { useRef, useState, useEffect, useContext } from 'react';
import { CarContext } from '../../App';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import './swiper.css'

// import required modules
import { Mousewheel, EffectCoverflow } from "swiper";
import DishCard from '../DishCard/DishCard';
import { getDish } from '../../services/api';

export default function SwiperCard({category}) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getDish(category.id).then((res) => {
      return res.json();
    }).then((res) => {
      if (res.error == null)
        setDishes(res.data);
    })
  }, [category.id])


  console.log(dishes)
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
        {category.name}
      </h2>
      <div
        style={{
          position: 'relative',
          marginTop: '10px',
          height: '100%',
        }}
      >
        <Swiper
          onSlideChange={change}
          effect={'coverflow'}
          direction={'horizontal'}
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
          loopedSlides={dishes.length}
          mousewheel={true}
          modules={[Mousewheel, EffectCoverflow]}
        >
          {
            dishes &&
            dishes.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <DishCard dish={item}/>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </>
  );
}
