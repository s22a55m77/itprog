import SwiperCard from './Swiper/Swiper';
import { useEffect, useState } from 'react';
import { getCategory } from '../services/api';

export default function Children() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory().then((res) => {
      return res.json();
    }).then((res) => {
      if (res.error == null)
      setCategory(res.data)
    })
  }, [])

  return (
    <div>
      {
        category &&
        category.map((item) => {
          return (
            <SwiperCard key={item.id} category={item}/>
          )
        })
      }

    </div>
  )
}
