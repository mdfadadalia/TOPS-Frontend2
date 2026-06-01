import { createContext, useEffect, useReducer } from "react";



const reducer = (state, action) => {

    if(action.type=="LOAD")
    {
        state = [...action.payload]
    }    
    if(action.type=="ADD")
    {
        
    }
    return state
}


export const MyContext = createContext()
export const MyContextProvider = ({ children }) => {
    const [state, DispatchSate] = useReducer(reducer, [])
    const dataReferesh=()=>{
    useEffect(() => {
        fetch("https://6a1d22abbcc4f20d5ca3ee68.mockapi.io/products").then((res)=>res.json()).then((data)=>{
            DispatchSate({type:"LOAD",payload:data})
        })
    }, []);    
}
    dataReferesh()
    return <>
        <MyContext.Provider value={{ state, DispatchSate }}>
            {children}
        </MyContext.Provider>
    </>
}