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
        boxShadow: '0px 2px 4px 0px #00000014'
      }}
    >
      <Grid
        container
      >
        <Grid item lg={1} xs={0} sm={1}/>
        <Grid item lg={1} xs={1} sm={2}>
          <Order />
        </Grid>
        <Grid item lg={2} md={3} xs={8} sm={2} >
          <CheckOut />
        </Grid>
        <Grid item lg={7} md={6} sm={3} xs={1} />
        <Grid item xs={1} sm={1}>
          <User />
        </Grid>
      </Grid>
    </div>
  )
}
