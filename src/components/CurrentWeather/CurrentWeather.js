import React, { useContext, useEffect, useState } from 'react'
import context from '../../context/Context'
import axios from 'axios';
import './Style.css';


function CurrentWeather(props) {
    //assining city value to city that has passed throught app.js
    let city = props.city;
    //In case city empty (city is not entered in search box), take Delhi as default city.
    if (city === '') {
        city = 'delhi';
    }
    //using context, storing functions that are defined in weatherState file.
    const contexts = useContext(context);
    const { unit, toCelsius, toFahrenheit, showAlert, getWindDirection } = contexts;
    //declaring useState variable and function.
    const [dailyWeatherData, setDailyWeatherData] = useState({ currentTemp: '', maxTemp: '', minTemp: '', humidity: '', windSpeed: '', windDir: '', weatherDescr: '', imgId: '' });

    //whenEver city changes API call will be made regarding weather data about city.
    useEffect(() => {
        async function getdata() {
            try {
                //making API call using axios to get current weather data.
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);

                //storing requird data using useState function.
                setDailyWeatherData({ currentTemp: response.data.main.temp, maxTemp: response.data.main.temp_max, minTemp: response.data.main.temp_min, humidity: response.data.main.humidity, windSpeed: response.data.wind.speed, windDir: response.data.wind.deg, weatherDescr: response.data.weather[0].description, imgId: response.data.weather[0].icon });
            }
            catch (err) {
                //if city is not found then we will show Error message on screen
                if (err.status === 404) {
                    showAlert('Please Enter Valid City Name');
                }
                console.log(err);

            }
        }
        getdata();
    }, [city]);

    //converting current temperature according to unit selected by user
    let currentTempUnit = unit === 'Centigrade' ? toCelsius(dailyWeatherData.currentTemp) : toFahrenheit(dailyWeatherData.currentTemp);
    //converting Maximum temperature according to unit selected by user
    let maxTempUnit = unit === 'Centigrade' ? toCelsius(dailyWeatherData.maxTemp) : toFahrenheit(dailyWeatherData.maxTemp);
    //converting Minimum temperature according to unit selected by user
    let minTempUnit = unit === 'Centigrade' ? toCelsius(dailyWeatherData.minTemp) : toFahrenheit(dailyWeatherData.minTemp);
    //assigning unit to be displayed on screen according to value selected
    let unitShort = unit === 'Centigrade' ? '°C' : 'F';
    //assigning wind Direction value to variable after converting it from degree
    let windDirection = getWindDirection(dailyWeatherData.windDir);

    return (
        <div>
            <div className="weather-tile">
                <div className="icon">
                    {/* image link is provided by openweather */}
                    <img src={`https://openweathermap.org/img/wn/${dailyWeatherData.imgId}@2x.png`} alt="weatherIcon" />
                </div>
                <div className="information">
                    <h1 className='description'>{dailyWeatherData.weatherDescr}</h1>
                    <p className='current-temp'>Current Temp - {currentTempUnit} {unitShort}</p>
                    <div className="min-max">
                        <p className='max-temp'>Max temp - {maxTempUnit} {unitShort}</p>
                        <p className='min-temp'>Min temp - {minTempUnit} {unitShort}</p>
                    </div>
                    <div className="detail">
                        <p className='humidity'>Humidity - {dailyWeatherData.humidity}</p>
                        <p className='wind-speed'>Wind Speed - {dailyWeatherData.windSpeed} KM/H</p>
                        <p className='wind-direction'>Wind Direction - {windDirection}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather