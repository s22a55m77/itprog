import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone';

export default function Order() {
  const [isOpen, setIsOpen] = useState(null);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ padding: '3px 16px 3px 16px' }}
        onClick={(e) => setIsOpen(e.currentTarget)}
      >
        <HistoryTwoToneIcon style={{marginRight: '5px'}}/> Order
      </Button>
      <Menu
        id={"Order Menu"}
        open={Boolean(isOpen)}
        anchorEl={isOpen}
        disableScrollLock={true}
        PaperProps={{
          style: {
            transform: 'translateY(2px)',
          }
        }}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem>1</MenuItem>
      </Menu>
    </>
  )
}
