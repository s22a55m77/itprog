import { Button, Card, CardContent, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { CartContext } from '../../../App';
import SyncTwoToneIcon from '@mui/icons-material/SyncTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import './CheckOut.css'
import { addOrder, addPayment, cancelOrder, me } from '../../../services/api';
import Alert from '@mui/material/Alert';
import { getCookie } from '../../../utils';
import { LoadingButton } from '@mui/lab';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

export default function CheckOut() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userPayment, setUserPayment] = useState(0);
  const [isValid, setIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [pendingPayment, setPendingPayment] = useState();
  const [error, setError] = useState();
  const [isLogin, setIsLogin] = useState();

  const cart = useContext(CartContext);

  useEffect(() => {
    if(getCookie('jwtToken') === "")
      setIsLogin(false)
    else {
      me().then((res) => {
        if (res.error === null) {
          setIsLogin(true)
        }
      }).catch(() => {
        setIsLogin(false)
      })
    }
  }, [])

  const handleClick = () => {
    if (activeStep === 0) {
      setIsLoading(true)
      const arr = [];
      cart.cart.map((item) => {
        arr.push({'id': item.dish.dishId, 'quantity': item.dish.quantity})
      })
      const obj = {'dishes': arr};
      addOrder(obj).then((res) => {
        if (res.error === null) {
          setPendingPayment(res.data)
          setIsLoading(false);
        }
      }).catch((err) => {
        setIsLoading(false);
        setError('Error Occured')
      })
    }

    if (activeStep === 0)
      setActiveStep(activeStep + 1);

    // checkPaymentEnough
    if (activeStep === 1) {
      if (userPayment < pendingPayment.price) {
        setIsValid(false)
        setActiveStep(1)
      }
      else {
        setActiveStep(2)
        setIsLoading(true)
        console.log(userPayment);
        addPayment(pendingPayment.orderNumber , {'amount': parseInt(userPayment)}).then((res) => {
          setIsLoading(false)
          if (res.error !== null)
            throw new error();
        }).catch((err) => {
          setIsLoading(false)
          setError('Error Occured');
        })
      }
    }

  }
  const handleClose = (event, reason) => {
    if (activeStep === 2 && isLoading) {
      setIsOpen(true)
    }
    else {
      setIsOpen(false)
    }
  }

  const handleOnClickModal = () => {
    setIsOpen(true)
  }

  const handleCancel = () => {
    setIsLoading(true)
    cancelOrder(pendingPayment.orderNumber).then((res) => {
      if (error == null)
        alert('Canceled!')
    }).catch((err) => {
      alert('Error!')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ padding: '3px 16px 3px 16px', whiteSpace: 'nowrap'}}
        onClick={() => { handleOnClickModal()}}
      >
        <ShoppingCartTwoToneIcon style={{marginRight: '5px'}} /> Check Out
      </Button>
      {
        isLogin ?
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <div
            style={{
              width: '400px',
              height:  error ? activeStep === 0 ? '600px' : '400px' : activeStep === 0 ? '550px' : '350px',
              position: 'absolute',
              top: '50%',
              transform: 'translate(0, -50%)',
              margin: 'auto',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '10px',
              transition: '0.5s',
            }}
          >
            <Alert severity="error" style={{display: error ? '' : 'none'}}>{error}</Alert>
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
                  height: '65%',
                  overflow: 'scroll',
                }}
                className={'scroll'}
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
                          <div style={{ textAlign: 'right' }}>
                            ₱ {item.dish.quantity && item.dish.price && (item.dish.price * item.dish.quantity) }
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                }
              </div>
            }
            {
              activeStep === 1 &&
              <div
                style={{
                  marginTop: '30px',
                  textAlign: 'center',
                }}
              >
                {
                  isLoading ?
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '100px',
                      }}
                    >
                      <SyncTwoToneIcon color={'primary'} sx={{ fontSize: 50 }} className={'spin'}/>
                    </div> :
                    <div style={{ textAlign: 'left'}}>
                      <Card>
                        <CardContent>
                          Combo: {pendingPayment.combo}
                        </CardContent>
                      </Card>
                      <Card style={{marginTop: '5px'}}>
                        <CardContent>
                          Total Payment: ₱{pendingPayment.price}
                        </CardContent>
                      </Card>
                      <div style={{ marginTop: '25px' }}>
                        Enter Your Payment:
                        <input
                          type={'number'}
                          style={{
                            height: '20px',
                            marginLeft: '10px',
                            borderRadius: '5px',
                            border: '1px solid',
                            borderColor: !isValid && 'red',
                          }}
                          onChange={(data) => setUserPayment(data.target.value)}
                          value={userPayment}
                        />
                      </div>
                    </div>
                }
              </div>
            }
            {
              activeStep === 2 &&
              <div
                style={{
                  height: '250px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                { isLoading ?
                  <SyncTwoToneIcon color={'primary'} sx={{ fontSize: 50 }} className={'spin'}/> :
                  error ? <ErrorTwoToneIcon color={'error'} sx={{ fontSize: 100 }}/> : <CheckCircleTwoToneIcon color={'success'} sx={{ fontSize: 100 }}/>
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
                activeStep === 1 &&
                <LoadingButton loading={isLoading} color={'error'} onClick={handleCancel}>
                  Cancel Order
                </LoadingButton>
              }
              {
                activeStep !== 0 &&
                <Button onClick={() => setActiveStep(activeStep - 1)}>
                  Back
                </Button>
              }
              {
                activeStep !== 2 &&
                <Button onClick={() => {handleClick()}}>
                  Next
                </Button>
              }
              {
                activeStep === 2 &&
                <Button onClick={handleClose}>
                  Finish
                </Button>
              }
            </div>
          </div>
        </Modal>
          :
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <div
            style={{
              width: '400px',
              height: '100px',
              position: 'absolute',
              top: '50%',
              transform: 'translate(0, -50%)',
              margin: 'auto',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '10px',
              transition: '0.5s',
              display: 'flex',
              justifyContent: 'center',
              lineHeight: '100px',
            }}
          >
            Please Login First!
          </div>
        </Modal>
      }

    </>
  )
}
