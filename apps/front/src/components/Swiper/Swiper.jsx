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
import { getDish } from '../../services/api';

export default function SwiperCard({category}) {
  const [dishes, setDishes] = useState([]);

  const cart = useContext(CartContext)


  useEffect(() => {
    if(dishes.length <= 0)
      getDish(category.id).then((res) => {
        if (res.error == null)
          setDishes(res.data);
      })

    if(dishes.length > 0) {
      const index = cart.cart.findIndex(x => x.categoryId === category.id);
      if (cart.cart[index] && dishes[1]) {
        cart.cart[index].dish.name = dishes[1].name
      }
    }


  }, [category.id, dishes])


  const change = (data) => {
    const index = cart.cart.findIndex(x => x.categoryId === category.id);
    if (cart.cart[index] && dishes[data.realIndex]) {
      cart.cart[index].dish.name = dishes[data.realIndex].name
    }
  };

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
