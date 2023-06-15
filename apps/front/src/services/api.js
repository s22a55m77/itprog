import { getCookie } from '../utils';

const URL = 'https://itprog-back.azurewebsites.net/';


export const getCategory = async () => {
  const res = await fetch(URL + 'category')

  return res.json()
}

export const getDishes = async (id) => {
  const res = await fetch(URL + `category/${id}/dishes`)
  return res.json()
}
export const getDish = async (id, isImage) => {
  const res = await fetch(URL + `dish/${id}${isImage ? '?image=true' : ''}`, {cache: 'force-cache'})
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

export const register = async (param) => {
  const res = await fetch(URL + 'auth/register', {
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

export const getOrderDetail = async (orderNumber) => {
  const res = await fetch(URL + 'order/' + orderNumber, {
    headers: {
      Authorization: `Bearer ${getCookie('jwtToken')}`,
    },
    method: 'GET',
  })

  return res.json();
}

export const addOrder = async (param) => {
  const res = await fetch(URL + 'order', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('jwtToken')}`,
    },
    method: 'POST',
    body: JSON.stringify(param)
  })

  return res.json()
}

export const cancelOrder = async (param) => {
  const res = await fetch(URL + `order/${param}/cancel`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('jwtToken')}`,
    },
    method: 'POST',
  })

  return res.json()
}

export const getOrder = async () => {
  const res = await fetch(URL + 'order', {
    headers: {
      Authorization: `Bearer ${getCookie('jwtToken')}`,
    },
    method: 'GET',
  })

  return res.json();
}

  export const addPayment = async (order, param) => {
  const res = await fetch(URL + `order/${order}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('jwtToken')}`,
    },
    method: 'POST',
    body: JSON.stringify(param)
  })

  return res.json()
}

