import React, {useContext} from 'react'
import './Toggle.css'
import context from '../../context/Context'

function Toggle(props) {
    //getting unit and setUnit function that is defined in weatherState file.
    const contexts= useContext(context);
    const {unit, setUnit}= contexts;

    //functionality when user click on button which is there to change unit
    const handleOnClick = async(e) =>{
        e.preventDefault();
        //if previous value of button is centigrade then convert value to Fahrenheit and vice-versa
        if(e.target.value==='Centigrade'){
            setUnit('Fahrenheit');
        }
        else{
            setUnit('Centigrade');
        }
    }
  return (
    <>
        <button type="button" value={unit} onClick={handleOnClick} className='unit-button'>{unit==='Centigrade'?' Fahrenheit':'Centigrade'}</button>
    </>
  )
}

export default Toggle