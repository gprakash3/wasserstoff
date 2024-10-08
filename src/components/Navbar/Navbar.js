import React,{useState, useContext} from 'react'
import Toggle from './Toggle';
import './Navbar.css'
import context from '../../context/Context'
function Navbar(props) {  
    //declaring useState variable and function to capture city name entered by user
    const [enteredCityName,setEnteredCityName] = useState("");
    //importing showAlert function from weatherState file using useContext hook
    const contexts= useContext(context);
    const {showAlert} = contexts;

    //Action performed when user click on submit button
    const handleOnClick = async(e) =>{
        try{
            e.preventDefault();
            //if city name is blank then show Alert and do not change city name
            if(enteredCityName===''){
                showAlert('City name can not be blank');
            }
            //city name will be stored in variable which is used to make API call
            props.setCityName(enteredCityName);
            //clearing the input box after user click submit button
            document.getElementById('cityname').value="";

        }
        catch(err){
            console.log(err);
        }
    }

    //action performed when user is entering city name in box
    const onChangeCity = async(e) =>{
        e.preventDefault();
        //city name will be stored in variable
        setEnteredCityName(e.target.value);
    }

    

  return (
    <>
    <div className="navbar-container">
    <div className="container_inputBox">
    <input type="search" name="cityname" id="cityname" onChange={onChangeCity}/>
    <input type="button" value="submit" className='search-button' onClick={handleOnClick}/>
    </div>
    <div className="toggle-unit">
    <span class="text-line">click on button to change unit to</span>
    {/* this is button which will show unit opposite of selected unit so that user know which unit will be selected next */}
    <Toggle/>
    </div>
    </div>
    </>
  )
}

export default Navbar;