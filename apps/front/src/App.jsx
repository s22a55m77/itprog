import './App.css';
import Children from './components';
import { createContext, useState } from 'react';
import Navbar from './components/Navbar/Navbar';

export const CarContext = createContext(null);

function App() {
  const [car, setCar] = useState([]);

  const changeCar = (value) => {
    setCar(car.push(value))
  }

  return (
    <div className="App">
      <CarContext.Provider value={{ car, changeCar }}>
        <Navbar />
        <Children />
      </CarContext.Provider>
    </div>
  );
}

export default App;
