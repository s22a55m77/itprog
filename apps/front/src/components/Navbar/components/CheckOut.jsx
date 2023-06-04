import { Button, Card, CardContent, Step, StepLabel, Stepper } from '@mui/material';
import { useContext, useState } from 'react';
import Modal from '@mui/material/Modal';
import { CartContext } from '../../../App';

export default function CheckOut() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const cart = useContext(CartContext);

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
          <Stepper activeStep={activeStep} alternativeLabel style={{marginTop: '20px'}}>
            <Step key={'check'}>
              <StepLabel> Check Out </StepLabel>
            </Step>
            <Step key={'payment'}>
              <StepLabel> Payment </StepLabel>
            </Step>
            <Step key={'Finished'}>
              <StepLabel> Finished </StepLabel>
            </Step>
          </Stepper>

          {
            activeStep === 0 &&
            <div
              style={{
                padding: '30px',
              }}
            >
              {
                cart &&
                cart.cart.map((item, index) => {
                  return(
                    <Card key={index.toString()} style={{marginBottom: '20px'}}>
                      <CardContent>
                        <span style={{fontWeight: 'bold'}}>{item.categoryName} </span>
                        <div style={{marginTop: '5px', display: 'flex', justifyContent: 'space-between'}}>
                          <span> {item.dish.name && item.dish.name} </span>
                          <span> {item.dish.name && item.dish.quantity && item.dish.quantity} </span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              }
            </div>
          }

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px'
            }}
          >
            {
              activeStep !== 0 &&
              <Button onClick={() => setActiveStep(activeStep - 1)}>
                Back
              </Button>
            }
            {
              activeStep !== 2 &&
              <Button onClick={() => setActiveStep(activeStep + 1)}>
                Next
              </Button>
            }
            {
              activeStep === 2 &&
              <Button>
                Finish
              </Button>
            }
          </div>
        </div>
      </Modal>
    </>
  )
}
