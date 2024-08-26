import React,{useState} from 'react'
import weatherContext from './Context';

function WeatherState(props) {
   //declaring unit selected for temperature.
    const [unit, setUnit] = useState('Centigrade');
    
    //function to convert kelvin to celsius
    function toCelsius(kelvin) {
        let celsius = Math.floor(kelvin - 273.15);
        return celsius; 
}

//function to convert kelvin to Fahrenheit
function toFahrenheit(kelvin){
    let celsius=toCelsius(kelvin);
    let fahrenheit = Math.floor(celsius * (9 / 5) + 32);
    return fahrenheit;
}

//to convert degree of wind direction to direction indication
function getWindDirection(angle) {
    const directions = ['↓ N', '↙ NE', '← E', '↖ SE', '↑ S', '↗ SW', '→ W', '↘ NW'];
    return directions[Math.round(angle / 45) % 8];
}

//declaring alert variable and setAlert for any alert message that has to be display on encounter of some error.
const [alert, setAlert] = useState(null);
//defining function that will display entered message as argument in function for 1.5 second.
   const showAlert = (message) => {
    setAlert({
      message:message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
   }
    
  return (
    <weatherContext.Provider value={{ unit, setUnit, toCelsius, toFahrenheit, alert, showAlert, getWindDirection}}>
        {props.children }
    </weatherContext.Provider>
  )
}

export default WeatherState