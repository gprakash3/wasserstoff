import React, {useState,useEffect} from 'react'
import ForecastTiles from './ForecastTiles'

import axios from 'axios';
import './Forecast.css'
function Forecast(props) {
    //declaring variable and function to set data in form of array for weekly forecast.    
    const [weeklyForecastData, setWeeklyForecastData]= useState([]);
    //select city name which is passed through app.js
    let city=props.city;
    //if city is not yet selected then use Delhi as default city
    if(city===''){
        city='delhi';
    }
    

    useEffect(() => {
        async function getdata(){
            try{
                //making API call using axios to get weekly forecast data
                const response =await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
                //assigning response data to data variable.
                const data=response.data;
                //declaring empty array that will store weekly forecast data.
                let forecastData =[];
                //since there is many data at interval of 3 hours, we take forecast of one time for one day
                for(let i=1;i<data.cnt;i+=8){
                    //storing required data in obj
                    let obj={date:data.list[i].dt_txt, minTemp:data.list[i].main.temp_min, maxTemp:data.list[i].main.temp_max, 
                    windSpeed:data.list[i].wind.speed,
                    windDir:data.list[i].wind.deg,
                    description:data.list[i].weather[0].description,
                    icon:data.list[i].weather[0].icon
                    };
                    //storing object data to array.
                    forecastData.push(obj);
                    //clearing object data.
                    obj={};
                }
                //assigning weekly data array to variable that is defined using useState.
                setWeeklyForecastData(forecastData);
                
            }
            catch(err){
                console.log(err);
            }
        }
        getdata();
    }, [city]);
    
    

  return (
    <div className='forecast'>
    {/* for each object in weekly forecast array data, we are making seperate tiles which will have required weather data */}
    {weeklyForecastData.map((ele,idx)=>{
        // converting date into appropriate formate for display on screen
        let dateTxt= ele.date.split(' ')[0].split('-').reverse().join('-');
        //To calculate average temperature, taking avarage of min and max temp.
        let avgTemp= Math.floor((ele.minTemp+ele.maxTemp)/2);

        return <div key={idx+1}>
            <ForecastTiles date={dateTxt} avgTemp={avgTemp} windSpeed={ele.windSpeed} windDirection={ele.windDir} description={ele.description} icon={ele.icon}/>

        </div>
    })}
    </div>
  )
}

export default Forecast