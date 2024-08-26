import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar.js'
import CurrentWeather from './components/CurrentWeather/CurrentWeather.js';
import Forecast from './components/Forecast/Forecast.js';
import WeatherState from './context/WeatherState.js';
import Alert from './components/Alert/Alert.js';
function App() {
  //declaring city name using useState, since city is to be used at 2 components only which can be passed using props to components.
  const [cityName, setCityName] = useState('');


  return (
    <>
      <WeatherState>
        <div className="body-container">
          {/* passing setCityName function to Navbar so that city name can be assigned after submit button clicked */}
          <Navbar setCityName={setCityName} />
          <Alert />
          <div className="container">
            {/* container to display current temperature data of location */}
            <div className="current">
              <CurrentWeather city={cityName} />
            </div>
            {/* container to display weekly forecast of location */}
            <Forecast className="forecast" city={cityName} />
          </div>
        </div>
      </WeatherState>
    </>
  );
}

export default App;
