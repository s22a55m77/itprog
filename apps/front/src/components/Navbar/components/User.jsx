import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '../../../utils';
import { Alert, Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { login, me } from '../../../services/api';
import { LoadingButton } from '@mui/lab';


export default function User () {
  const [isLogin, setIsLogin] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isAlert, setIsAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState();

  useEffect(() => {
    if(getCookie('jwtToken') === "")
      setIsLogin(false)
    else {
        me().then((res) => {
          if (res.error === null) {
            setUser(res.data.username)
            setIsLogin(true)
          }
        })
    }

  }, [])

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault()
    setTimeout(() => {
      login({ username: username.toString(), password: password.toString() })
        .then((res) => {
          if (res.error) {
            setIsAlert(res.msg);
          } else {
            console.log(res.data.token.accessToken)
            setCookie('jwtToken', res.data.token.accessToken)
            setIsOpen(false)
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 10);
  }

  return (
    <>
      {
        isLogin ?
          <div>{user && user}</div> :
          <div>
            <Button style={{whiteSpace: 'nowrap'}} onClick={() => setIsOpen(true)}>
              Sign In
            </Button>
          </div>
      }
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
            height: isAlert ? '350px' : '300px',
            position: 'absolute',
            top: '50%',
            transform: 'translate(0, -50%)',
            margin: 'auto',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '10px',
            transition: '1s',
          }}
        >
          <h3
            style={{
              paddingLeft: '30px'
            }}
          >
            Login
          </h3>
          { isAlert &&
            <Alert
              severity="error"
              style={{
                width: '80%',
                margin: 'auto',
                marginBottom: '20px'
              }}
            >
              Login Failed. {isAlert}.
            </Alert>
          }
            <form
              id={'login form'}
              style={{
                width: '50%',
                marginTop: '35px',
                margin: 'auto'
              }}
              onSubmit={handleSubmit}
              method={'POST'}
            >
              <TextField
                required
                label={"Username"}
                name={'username'}
                id={'username'}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                required
                label={"Password"}
                name={'password'}
                id={'password'}
                type={'password'}
                style={{ marginTop: '20px' }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                }}
              >
                <Button
                  variant={'contained'}
                  style={{ backgroundColor: 'red', marginRight: '10px' }}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type={"submit"}
                  loading={isLoading}
                  // onClick={() => setIsLoading(true)}
                >
                  Submit
                </LoadingButton>
              </div>
            </form>
        </div>
      </Modal>
    </>
  )
}
