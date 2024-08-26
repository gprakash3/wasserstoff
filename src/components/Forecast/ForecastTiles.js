import React, { useContext } from 'react'
import './ForecastTiles.css'
import context from '../../context/Context'

function ForecastTiles(props) {

    const contexts = useContext(context);
    const { unit, toCelsius, toFahrenheit, getWindDirection} = contexts;
    //converting average temperature according to unit selected by user
    let avgTempUnit = unit === 'Centigrade' ? toCelsius(props.avgTemp) : toFahrenheit(props.avgTemp);
    //assigning unit to be displayed on screen according to value selected
    let unitShort = unit === 'Centigrade' ? '°C' : 'F';
    //assigning wind Direction value to variable after converting it from degree
    let windDirection = getWindDirection(props.windDirection);

    return (
        <div className='forecast-tile'>
            <div className="description">
                <img src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="" />
                <p>{props.description}</p>
            </div>
            <div className="day-tiles">
                <p>Date</p>
                <p style={{ width: "auto" }}>{props.date} </p>
            </div>
            <div className="day-tiles">
                <p>Avg Temp</p>
                <p>{avgTempUnit} {unitShort}</p>
            </div>
            <div className="day-tiles">
                <p>Wind Speed</p>
                <p>{props.windSpeed} KM/H</p>
            </div>
            <div className="day-tiles">
                <p>Wind Direction</p>
                <p>{windDirection}</p>
            </div>
            <div className="day-tiles">

            </div>
           
        </div>
    )
}

export default ForecastTiles