import { getCookie } from '../utils';

const URL = 'https://itprog-back.azurewebsites.net/';


export const getCategory = async () => {
  const res = await fetch(URL + 'category')

  return res.json()
}

export const getDish = async (id) => {
  const res = await fetch(URL + 'dish/' + id)
  return res.json()
}

export const login = async (param) => {
  const res = await fetch(URL + 'auth/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param)
  })

  return res.json()
}

export const me = async () => {
  const res = await fetch(URL + 'auth/me', {
    headers: {
      Authorization: `Bearer ${getCookie('jwtToken')}`,
    },
    method: 'GET',
  })

  return res.json();

}
