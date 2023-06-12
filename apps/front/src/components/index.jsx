import SwiperCard from './Swiper/Swiper';
import { useContext, useEffect, useState } from 'react';
import { getCategory } from '../services/api';
import { CartContext } from '../App';

export default function Children() {
  const [category, setCategory] = useState([]);
  const cart = useContext(CartContext);

  useEffect(() => {
    if (category.length <= 0)
      getCategory().then((res) => {
        if (res.error == null)
        setCategory(res.data)
      }).catch(() => {

      })

    // initialize car object
    if (category) {
      category.forEach((item) => {
        const categoryCar = {
          categoryId: item.id,
          categoryName: item.name,
          dish: {
            dishId: null,
            name: null,
            price: null,
            quantity: 1,
          }
        }

        cart.addCart(categoryCar)
      })
    }
  }, [category])

  return (
    <div>
      {
        category ?
        category.map((item) => {
          return (
            <SwiperCard key={item.id} category={item}/>
          )
        }) :
          <h2 style={{color: 'white'}}>Network Error</h2>
      }

    </div>
  )
}
