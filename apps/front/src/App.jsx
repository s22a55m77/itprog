import './App.css';
import Children from './components';
import { createContext, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';

export const CartContext = createContext([]);

function App() {
  const [cart, setCart] = useState([]);

  const addCart = (obj) => {
    const arr = cart
    arr.push(obj)

    const uniqueArr = arr.filter((arrItem, index, self) => {
      // Check if the current menu item's categoryId is unique
      return (
        index ===
        self.findIndex((item) => item.categoryId === arrItem.categoryId)
      );
    });


    setCart(uniqueArr);
  }


  return (
    <>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Josefin Sans"/>
      </head>
      <div className="App">
        <CartContext.Provider value={{ cart, addCart }}>
          <Navbar />
          <Children />
        </CartContext.Provider>
      </div>
    </>
  );
}

export default App;
