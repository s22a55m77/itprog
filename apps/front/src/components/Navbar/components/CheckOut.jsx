import { Button } from '@mui/material';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

export default function CheckOut() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ padding: '3px 16px 3px 16px', whiteSpace: 'nowrap'}}
        onClick={(e) => setIsOpen(true)}
      >
        Check Out
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div
          style={{
            width: '400px',
            height: '500px',
            position: 'absolute',
            top: '50%',
            transform: 'translate(0, -50%)',
            margin: 'auto',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '10px',
          }}
        >

        </div>
      </Modal>
    </>
  )
}
