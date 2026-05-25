import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from './UserContext'
export default function Home() {
const { userData, setUserData } =    useContext(MyUserContext) 
return (<>
      <h2>About PAge : userContext</h2>
       <div className='container p-5'>
            <div className="card p-5 gap-5">
                <p>Note : App Page Data Disply in Home page without props drilling</p>
                 <p>Name : {userData.name}</p>   
                 <p>Mo.No. : {userData.phone}</p>   
                 <p>City : {userData.city}</p>   
            </div>
    </div>
    </>    
  )
}
