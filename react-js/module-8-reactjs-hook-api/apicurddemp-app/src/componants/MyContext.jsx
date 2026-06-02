import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
const api_url = "https://6a1d22abbcc4f20d5ca3ee68.mockapi.io/products"

const reducer = (state, action) => {
    if (action.type == "LOAD") {        
        if(action.payload!=undefined)
            state = [...action.payload]
    }
    return state
}

export const MyContext = createContext()
export const MyContextProvider = ({ children }) => {
    const [state, DispatchSate] = useReducer(reducer, [])

    useEffect(() => {
        Load_Data()
    }, []);

    const Load_Data = () => {
        fetch(api_url).then((res) => res.json()).then((data) => {
            DispatchSate({ type: "LOAD", payload: data })
        }).catch(err=>console.log(err.message))
    }

    const Add_data = (data, type) => {
        if (type != "UPDATE") {
            fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((data) => {
                    Load_Data()
                });
        }
        else
        {   
            fetch(`${api_url}/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name : data.name,
                    price : data.price,
                    qty : data.qty
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    Load_Data()
                });
        }
    }
    const Delete_data = (id) => {
        fetch(`${api_url}/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                Load_Data()
            });
    }
    const [editState, setEditState] = useState([])
    const navigate = useNavigate();
    const Edit_data = (data) => {
        setEditState(data)
        navigate("/create")
    }
    const Search_data = (value) =>{
        fetch(`${api_url}?name=${value}`,{method:"GET"})
        .then((res) => res.json())
        .then((data) => {            
            DispatchSate({ type: "LOAD", payload: data })                        
        }).catch((err)=>console.log(err.message))
    }
    return <>
        <MyContext.Provider value={{ state, Add_data, Delete_data, editState, Edit_data, Search_data }}>
            {children}
        </MyContext.Provider>
    </>
}