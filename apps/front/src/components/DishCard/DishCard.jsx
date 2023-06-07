import { Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDish } from '../../services/api';
import HideImageTwoToneIcon from '@mui/icons-material/HideImageTwoTone';
import './styles.css';

export default function DishCard ({id}) {
  const [dish, setDish] = useState();
  const [quantity, setQuantity] = useState(1); // State variable for quantity
  const [image, setImage] = useState();

  useEffect(() => {

    if(dish === undefined) {
      getDish(id).then((res) => {
        setDish(res.data);
      })
    }

    if (dish && dish.image) {
      const buffer = new Uint8Array(dish.image.data);
      const decoder = new TextDecoder();
      const decodedData = decoder.decode(buffer);
      setImage(decodedData);
    }
  }, [dish, id])

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="restaurant-card">
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {image ? <img src={image} alt="Restaurant" className="card-image" /> :
          <div
            className={"card-image"}
          >
            <HideImageTwoToneIcon sx={{ fontSize: 80 }}/>
          </div>
         }

      </div>
      <div className="card-content">
        <h2 className="dish-name">Dish Name</h2>
        <p className="description">Description of the dish goes here.</p>
        <div className="price-quantity">
          <div className="quantity-control">
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
          <p className="price">$10.99</p>
        </div>
      </div>
    </div>
  );


  // return (
  //   <>
  //     <Card
  //       style={{
  //         width: '90%',
  //         height: '90%',
  //       }}
  //     >
  //       <CardContent>
  //         {dish && dish.name}
  //         <br />
  //         {dish && dish.price}
  //       </CardContent>
  //     </Card>
  //   </>
  // )
}
