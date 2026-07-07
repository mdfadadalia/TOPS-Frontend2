import React from 'react'
import { useSelector } from 'react-redux';

const Container = ({children}) => {
  const crud = useSelector((state)=>state.crud)       
    if (crud.error) return <h3 align='center'>Error : {crud.error}</h3>; 
  return <>
     <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-bold">Student CRUD System</span>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
            {children}
        </div>
      </div>

  </>
}

export default Container
