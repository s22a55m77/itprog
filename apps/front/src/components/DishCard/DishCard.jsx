import { Card, CardContent, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getDish } from '../../services/api';
import HideImageTwoToneIcon from '@mui/icons-material/HideImageTwoTone';
import './styles.css';
import { CartContext } from '../../App';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useMount } from 'ahooks';
import { URL } from '../../services/api';

export default function DishCard({ id, active, category }) {
  const [dish, setDish] = useState();
  const [quantity, setQuantity] = useState(1); // State variable for quantity
  const [image, setImage] = useState(true);

  const cart = useContext(CartContext);

  useMount(() => {
    setQuantity(1);

    getDish(id, false).then((res) => {
      setDish(res.data);
    });
  });

  useEffect(() => {
    if (active && active.id == id && dish) {
      const index = cart.cart.findIndex((x) => x.categoryId === category);
      cart.cart[index].dish.dishId = id;
      cart.cart[index].dish.name = dish.name;
      cart.cart[index].dish.quantity = quantity;
      cart.cart[index].dish.price = dish.price;
    }
  }, [active]);

  const changeCartQuantity = (quantity) => {
    const index = cart.cart.findIndex((x) => x.categoryId === category);
    cart.cart[index].dish.quantity = quantity;
  };

  const increaseQuantity = () => {
    changeCartQuantity(quantity + 1);
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      changeCartQuantity(quantity - 1);
      setQuantity(quantity - 1);
    }
  };

  const change = (data) => {
    if (data.target.value >= 1) {
      setQuantity(data.target.value);
      changeCartQuantity(data.target.value);
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
        {image ? (
          <img
            src={`${URL}dish/${id}/image`}
            alt="Restaurant"
            className="card-image"
            onError={() => setImage(false)}
          />
        ) : (
          <div className={'card-image'}>
            <HideImageTwoToneIcon sx={{ fontSize: 80 }} />
          </div>
        )}
      </div>
      <div className="card-content">
        <h2 className="dish-name">{dish && dish.name}</h2>
        <p className="description">{dish && dish.description}</p>
        <div className="price-quantity">
          <div className="quantity-control">
            <button onClick={decreaseQuantity}>
              <RemoveIcon />
            </button>
            <input
              onChange={change}
              type={'number'}
              min={1}
              className={'quantity-control-input'}
              value={quantity}
            />
            <button onClick={increaseQuantity}>
              <AddIcon />
            </button>
          </div>
          <p className="price">₱{dish && dish.price}</p>
        </div>
      </div>
    </div>
  );
}
