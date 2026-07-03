import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = []

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        create:(state,action)=>{
            state = state.push(action.payload)                
        },
        remove:(state,action)=>{
            state = state.filter(ele=>ele.task!= action.payload.task)            
            return state
        },        
        update:(state,action)=>{            
            const newArray = state.filter(ele=>ele.task!= action.payload.task)                        
            state = [...newArray,action.payload]            
             return state            
        }
    }
})

export const {create,remove,update} = todoSlice.actions

export default todoSlice.reducer