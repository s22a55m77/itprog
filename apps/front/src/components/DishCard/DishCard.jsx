import { Card, CardContent } from '@mui/material';
import { useEffect } from 'react';
import { getDish } from '../../services/api';
import React from 'react';
import './styles.css'; // Import the CSS file

export default function DishCard ({dish}) {

  // useEffect(() => {
  //   getDish()
  // }, [])

const RestaurantCard = () => {
  return (
    <div className="restaurant-card">
      <img src="path_to_image" alt="Restaurant" />
      <h2>Dish Name</h2>
      <p className="price">$10.99</p>
      <p className="description">Description of the dish goes here.</p>
    </div>
  );
}

  return (
    <>
      <Card
        style={{
          width: '90%',
          height: '90%',
        }}
      >
        <CardContent>
          {dish && dish.name}
          <br />
          {dish && dish.price}
        </CardContent>
      </Card>
    </>
  )
}
