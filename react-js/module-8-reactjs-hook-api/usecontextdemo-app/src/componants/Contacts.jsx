import React from 'react'
import { useReducer } from 'react'
const reducer=(count,action) =>{
    switch(action.type)
    {
        case "incre":
            count = count + 1
            break
        case "decre":
            count = count - 1
            break
        case "reset":
            count = 0
            break        
    }
    return count;
} 
export default function Contacts() {
    const [count,dispatch] = useReducer(reducer,0)
  return (
    <div>
      <h2>Contact Page : Reducer Demo </h2>
       <div className='container p-5'>
            <div className="card p-5 gap-5">
                <label className='form-control'>{count}</label>
                <button className='form-control btn btn-primary' onClick={()=>dispatch({"type":"incre"})}>+</button>                
                <button className='form-control btn btn-info'onClick={()=>dispatch({"type":"decre"})}>-</button>                                
                <button className='form-control btn btn-warning'onClick={()=>dispatch({"type":"reset"})}>Resst</button>    
            </div>
        </div>       
    </div>
  )
}
