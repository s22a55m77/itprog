import { Grid } from '@mui/material';
import Order from './components/Order';
import CheckOut from './components/CheckOut';
import User from './components/User';

export default function Navbar() {
  return (
    <div
      key={'Navbar'}
      style={{
        width: '100vm',
        height: '60px',
        backgroundColor: 'white',
        color: 'black',
        lineHeight: '60px',
        boxShadow: '0px 1px 5px 0px #bdc3c7'
      }}
    >
      <Grid
        container
      >
        <Grid item lg={1} xs={0} sm={1}>
          <Order />
        </Grid>
        <Grid item lg={2} md={2} xs={3} sm={3} >
          <CheckOut />
        </Grid>
        <Grid item lg={8} md={8} sm={6} xs={3} />
        <Grid item xs={1} >
          <User />
        </Grid>
      </Grid>
    </div>
  )
}
