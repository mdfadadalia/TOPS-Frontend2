import { createContext, useReducer } from "react";

export const MyContext = createContext()

const initilize = []

const reducer = (state, action) => {

    if (action.type == "ADD") {
        state = [...state, action.payload]
    }
    else if (action.type == "DEL") {
        state = state.filter(e => e.username != action.payload.username)
    }
    else if (action.type == "ADDLIKES") {
        state = state.filter(e => {
            if (e.username == action.payload.username) {
                e.likes = e.likes + 1
            }
            return e
        })
    }
    return state
}

const ContextProvider = ({ children }) => {
    const [state, dispatchState] = useReducer(reducer, initilize)

    const addPost = (data) => {
        dispatchState({
            type: "ADD",
            payload: data
        })
    }
    const delPost = (data) => {
        dispatchState({
            type: "DEL",
            payload: data
        })
    }

    const addLikes = (data) => {
        dispatchState({
            type: "ADDLIKES",
            payload: data
        })
    }

    return <MyContext.Provider value={{ state, addPost, delPost, addLikes }}>
        {children}
    </MyContext.Provider>
}
export default ContextProvider






