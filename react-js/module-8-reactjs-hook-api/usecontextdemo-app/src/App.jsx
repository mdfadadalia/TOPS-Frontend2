import { Outlet } from "react-router-dom"
import Nav from "./componants/Nav"
import { MyUserContext } from "./componants/UserContext"
import { useState } from "react"
const App = () =>{
  const [userData,setUserData]= useState({
    name:"MD",
    phone:"9999999999",
    city:"Rajkot"
  });
  return <>
  <h1>Hooks Demo: useState, useRef, useEffect, useReducer, useContext and Routing</h1>
  <hr/>
  <Nav/>
  <hr/>
    <MyUserContext.Provider value={{userData , setUserData}}>
      <Outlet/>
    </MyUserContext.Provider>
  </>
}
export default App