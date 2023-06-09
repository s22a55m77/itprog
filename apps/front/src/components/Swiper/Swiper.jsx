import React, { useRef, useState, useEffect, useContext } from 'react';
import { CartContext } from '../../App';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import './swiper.css'

// import required modules
import { Mousewheel, EffectCoverflow } from "swiper";
import DishCard from '../DishCard/DishCard';
import { getDishes } from '../../services/api';

export default function SwiperCard({category}) {
  const [dishes, setDishes] = useState([]);
  const [active, setActive] = useState();

  useEffect(() => {
    if(dishes.length <= 0)
      getDishes(category.id).then((res) => {
        if (res.error == null)
          setDishes(res.data);
      })

    setActive(dishes[1]);
  }, [category.id, dishes])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginLeft: '10px',
          marginBottom: '-50px',
        }}
      >
        <h1
          style={{
            padding: '5px',
            color: 'white',
            fontFamily: 'Pacifico'
          }}
        >
          {category.name}
        </h1>
      </div>
      <div
        style={{
          position: 'relative',
          marginTop: '10px',
          height: '100%',
        }}
      >
        <Swiper
          onSlideChange={(data) => {dishes && setActive(dishes[data.realIndex])}}
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
                  <DishCard key={item.id} id={item.id} active={active} category={category.id}/>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </>
  );
}
