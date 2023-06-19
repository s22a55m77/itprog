import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Menu,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  addOrder,
  addPayment,
  cancelOrder, getDish,
  getOrder,
  getOrderDetail,
  me,
} from '../../../services/api';
import SyncTwoToneIcon from '@mui/icons-material/SyncTwoTone';
import './Style.css';
import Alert from '@mui/material/Alert';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { LoadingButton } from '@mui/lab';
import Modal from '@mui/material/Modal';
import OrderCard from './OrderCard';
import { getCookie } from '../../../utils';

export default function Order() {
  const [isOpen, setIsOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [order, setOrder] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState();
  const [isValid, setIsValid] = useState(true);
  const [userPayment, setUserPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (getCookie('jwtToken') === '') setIsLogin(false);
    else {
      me()
        .then((res) => {
          if (res.error === null) {
            setIsLogin(true);
          }
        })
        .catch(() => {
          setIsLogin(false);
        });
    }
  }, []);

  const handleEnter = (e) => {
    setIsLoading(true);
    setIsOpen(e.currentTarget);
    getOrder()
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        alert('Network Error!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = (event, reason) => {
    if (activeStep === 2 && isLoading) {
      setModalOpen(true);
    } else {
      setActiveStep(0)
      setModalOpen(false);
    }
  };

  const handleClick = () => {
    // checkPaymentEnough
    if (activeStep === 1) {
      if (userPayment < orderDetail.price) {
        setIsValid(false);
        setActiveStep(1);
      } else {
        setActiveStep(2);
        setIsLoading(true);
        addPayment(orderDetail.orderNumber, { amount: parseInt(userPayment) })
          .then((res) => {
            setIsLoading(false);
            if (res.error !== null) throw new error();
          })
          .catch((err) => {
            setIsLoading(false);
            setError('Error Occured');
          });
      }
    } else if (activeStep === 0) setActiveStep(1);
  };

  const handleCancel = () => {
    setIsLoading(true);
    cancelOrder(orderDetail.orderNumber)
      .then((res) => {
        if (error == null) alert('Canceled!');
      })
      .catch((err) => {
        alert('Error!');
      })
      .finally(() => {
        setIsLoading(false);
        setModalOpen(false);
      });
  };

  const handleOrderClick = (orderNumber, status) => {
    if (status === 'COMPLETED' || status === 'CANCELLED') {
      return;
    }
    else if (activeStep === 0) {
      setModalOpen(true);
      setIsOpen(false);
      setIsLoading(true);
      setTimeout(() => {
        getOrderDetail(orderNumber)
          .then((res) => {
            if (!res.error) {
              setOrderDetail(res.data);
              let sum = totalPayment;
              res.data.details.map((item, index) => {
                getDish(item.dishId, false).then((dishRes) => {
                  if (!res.error) {
                    sum += res.data.details[index].quantity * dishRes.data.price
                  }
                  setTotalPayment(totalPayment + sum);
                })
              })
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 10);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ padding: '3px 16px 3px 16px', marginLeft:'20px', }}
        onMouseEnter={handleEnter}
      >
        <HistoryTwoToneIcon style={{ marginRight: '5px' }} /> Orders
      </Button>
      <Menu
        id={'Order Menu'}
        open={Boolean(isOpen)}
        anchorEl={isOpen}
        disableScrollLock={true}
        PaperProps={{
          style: {
            transform: 'translateY(2px)',
          },
        }}
        onClose={() => setIsOpen(false)}
      >
        {isLoading && !order ? (
          <SyncTwoToneIcon color={'primary'} sx={{ fontSize: 50 }} className={'spin'} />
        ) : isLogin ? (
          order &&
          order.map((item) => {
            return (
              <div key={item.orderNumber} onClick={() => handleOrderClick(item.orderNumber, item.status)}>
                <MenuItem>
                  <div>
                    {item.orderNumber}
                    <div>
                      status:{' '}
                      <span
                        style={{
                          color:
                            item.status === 'PENDING_PAYMENT'
                              ? 'orange'
                              : item.status === 'CANCELLED'
                              ? 'red'
                              : 'green',
                        }}
                      >
                        {' '}
                        {item.status}
                      </span>
                    </div>
                  </div>
                </MenuItem>
                <Divider style={{ width: '100%' }} />
              </div>
            );
          })
        ) : (
          <div
            style={{
              padding: 5,
            }}
          >
            Please login first
          </div>
        )}
      </Menu>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        disableRestoreFocus={true}
      >
        <div
          style={{
            width: '400px',
            height: error
              ? activeStep === 0
                ? '600px'
                : '400px'
              : activeStep === 0
              ? '500px'
              : '400px',
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
          <Alert severity="error" style={{ display: error ? '' : 'none' }}>
            {error}
          </Alert>
          <Stepper activeStep={activeStep} alternativeLabel style={{ marginTop: '20px' }}>
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
          {activeStep === 0 && (
            <div>
              {isLoading ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '100px',
                  }}
                >
                  <SyncTwoToneIcon color={'primary'} sx={{ fontSize: 50 }} className={'spin'} />
                </div>
              ) : (
                <div>
                  {orderDetail &&
                    orderDetail.details.map((dishItem, index) => {
                      return (
                        <OrderCard
                          key={index.toString()}
                          id={dishItem.dishId}
                          quantity={dishItem.quantity}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          )}
          {activeStep === 1 && (
            <div
              style={{
                marginTop: '30px',
                textAlign: 'center',
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '100px',
                  }}
                >
                  <SyncTwoToneIcon color={'primary'} sx={{ fontSize: 50 }} className={'spin'} />
                </div>
              ) : (
                <div style={{ textAlign: 'left' }}>
                  <Card>
                    <CardContent>Combo: {orderDetail?.combo ?? 'None'}</CardContent>
                  </Card>
                  <Card>
                    <CardContent>Total Payment: { totalPayment }</CardContent>
                  </Card>
                  <Card style={{ marginTop: '5px' }}>
                    <CardContent>Total Payment After discount: ₱{orderDetail?.price}</CardContent>
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
              )}
            </div>
          )}
          {activeStep === 2 && (
            <div
              style={{
                height: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isLoading ? (
                <SyncTwoToneIcon color={'primary'} sx={{ fontSize: 50 }} className={'spin'} />
              ) : error ? (
                <ErrorTwoToneIcon color={'error'} sx={{ fontSize: 100 }} />
              ) : (
                <div>
                  <div>
                    Your change: {userPayment - orderDetail.price}
                  </div>
                  <CheckCircleTwoToneIcon color={'success'} sx={{ fontSize: 100 }} />
                </div>
                )}
            </div>
          )}

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
            }}
          >
            {activeStep === 1 && (
              <LoadingButton loading={isLoading} color={'error'} onClick={handleCancel}>
                Cancel Order
              </LoadingButton>
            )}
            {activeStep !== 0 && (
              <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
            )}
            {activeStep !== 2 && (
              <Button
                onClick={() => {
                  handleClick();
                }}
              >
                Next
              </Button>
            )}
            {activeStep === 2 && <Button onClick={handleClose}>Finish</Button>}
          </div>
        </div>
      </Modal>
    </>
  );
}
