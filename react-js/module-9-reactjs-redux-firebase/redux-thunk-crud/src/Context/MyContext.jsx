import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export const MyContext = createContext()

const MyContextProvider = ({ children }) => {
    const dispatch = useDispatch()
    const crud = useSelector((state) => state.crud)
    const [edit,setEdit] = useState()
    const editHandler = (id)=>{
        const res = crud.data.find(ele=>ele.id==id)
        setEdit(res)
    }
    return <MyContext.Provider value={{ crud, dispatch, edit,editHandler,setEdit }}>
        {children}
    </MyContext.Provider>
}
export default MyContextProvider

export const useMyContext = () => {
    return useContext(MyContext)
}