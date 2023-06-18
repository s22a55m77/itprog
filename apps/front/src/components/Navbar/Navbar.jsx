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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Order />
          <CheckOut />
        </div>
        <div>
          <User />
        </div>
      </div>
    </div>
  )
}
