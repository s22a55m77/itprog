import { Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDish } from '../../../services/api';

export default function OrderCard(id) {
  const [dish, setDish] = useState()

  useEffect(() => {
    getDish(id.id, false).then((res) => {
      if(!res.error) {
        console.log(res)
        setDish(res.data)
        console.log('122')
      }
    })
  }, [id])

  return(
    <Card style={{marginBottom: '20px'}}>
      <CardContent>
        <div style={{marginTop: '5px', display: 'flex', justifyContent: 'space-between'}}>
          <span> {dish && dish.name} </span>
          <span> {id.quantity} </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          ₱ {id.quantity && dish && (dish.price * id.quantity) }
        </div>
      </CardContent>
    </Card>
  )
}
