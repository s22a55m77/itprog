import logo from './logo.svg';
import './App.css';
import SwiperCard from './components/Swiper/Swiper'

function App() {
  return (
    <div className="App">
      <div
      key={"Navbar"}
      style={{
        width: "100vm",
        height: "60px",
        backgroundColor: "black",
      }}>
      </div>
      <SwiperCard />
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }}>

        {/*<SwiperCard />*/}
      </div>
    </div>
  );
}

export default App;
