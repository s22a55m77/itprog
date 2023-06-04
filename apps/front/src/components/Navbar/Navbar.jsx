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
        <Grid item xs={1} >
          <Order />
        </Grid>
        <Grid item xs={2} style={{}}>
          <CheckOut />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={1} >
          <User />
        </Grid>
      </Grid>
    </div>
  )
}
