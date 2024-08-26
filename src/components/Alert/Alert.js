import React, {useContext} from 'react'
import './Alert.css'
import context from '../../context/Context'
export default function Alert(props) {
    //using contexts getting function that is defined in weatherState file.
    const contexts=useContext(context);
    const {alert}=contexts;
  return (
      <div className='container' style={{height:"30px", margin:"1px 0px 1px 0px"}}>
        {/* if there is message in alert then display it */}
        {alert && <div className="texts"  >
            <p>{alert.message} </p>
          </div>}
      </div>
  )
}