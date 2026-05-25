import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { MyUserContext } from './UserContext'
export default function About() {
   const { userData, setUserData } =    useContext(MyUserContext) 
    var name = useRef()
    var phone = useRef()
    var city = useRef()

    useEffect( () =>{
        name.current.value = userData.name
        phone.current.value = userData.phone
        city.current.value = userData.city
        console.log(userData);
        
    },[]);

    const btn_click_handler = () => {
        setUserData({
            name : name.current.value,
            phone : phone.current.value,
            city : city.current.value
        })
        alert("Data Updated, Now update data show in Home PAge")
        
    }
  return (<>
      <h2>About PAge : userContext</h2>
       <div className='container p-5'>       
            <div className="card p-5 gap-5">                
                <p>Note : App Page Data Disply in about page without props drilling and you change data and change effect shown in Home page</p>
                <input type='text' ref={name}/>
                <input type='text' ref={phone}/>
                <input type='text' ref={city}/>                 
                <button className='btn btn-primary' onClick={btn_click_handler}>Update</button>
            </div>
    </div>
    </>    
  )
}
