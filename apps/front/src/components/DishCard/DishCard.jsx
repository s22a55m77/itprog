import { Card, CardContent } from '@mui/material';
import { useEffect } from 'react';
import { getDish } from '../../services/api';

export default function DishCard ({dish}) {

  // useEffect(() => {
  //   getDish()
  // }, [])

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
