import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
    data:[],
    editData:null
}

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        create:(state,action)=>{
            state = state.data.push(action.payload)                
        },
        remove:(state,action)=>{
            state.data = state.data.filter(ele=>ele.task!= action.payload.task)            
            return state
        },
        editdata:(state,action)=>{
            state.editData = state.data.find(ele=>ele.task==action.payload.task)
            return state
        },
        update:(state,action)=>{
             const newArray = state.data.filter(ele=>ele.task!= action.payload.task)            
             state = [...state.data,newArray]
             state = state.editData = null
             return state            
        }
    }
})

export const {create,remove,editdata,update} = todoSlice.actions

export default todoSlice.reducer