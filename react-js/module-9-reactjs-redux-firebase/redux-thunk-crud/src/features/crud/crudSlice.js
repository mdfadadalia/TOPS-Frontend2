import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = "https://6a1d22abbcc4f20d5ca3ee68.mockapi.io/Student";

export const FetchStudents = createAsyncThunk("Students/Fetch", async () => {
    const resp = await axios.get(API_URL)    
    return resp.data    
})

export const addStudents = createAsyncThunk("Students/Add", async (data) => {
    const resp = await axios.post(API_URL, data)
    return resp.data
})

export const delStudents = createAsyncThunk("Students/Del", async (id) => {
    const resp = await axios.delete(`${API_URL}/${id}`)
    return resp.data
})

export const updateStudents = createAsyncThunk("Students/Update", async ({ id, data }) => {
    const resp = await axios.put(`${API_URL}/${id}`, data)
    return resp.data
})

const paddingHandler = (state) => {
    state.loading = true
    state.error = ""
}
const crudSlice = createSlice({
    name: 'crud',
    initialState: {
        data: [],
        loading: false,
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //===================FetchStudent============================
            .addCase(FetchStudents.pending, paddingHandler)

            .addCase(FetchStudents.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })

            .addCase(FetchStudents.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            //===================AddStudent============================
            .addCase(addStudents.pending, paddingHandler)

            .addCase(addStudents.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...state.data, action.payload]
            })

            .addCase(addStudents.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            //===================DelStudent============================
            .addCase(delStudents.pending, paddingHandler)

            .addCase(delStudents.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.filter(ele => ele.id != action.payload.id)
            })

            .addCase(delStudents.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            //===================UpdateStudent============================
            .addCase(updateStudents.pending, (state) => {
                state.loading = true
            })

            .addCase(updateStudents.fulfilled, (state, action) => {
                state.loading = false
                const index = state.data.findIndex(ele => ele.id == action.payload.id)
                if (index >= 0) {
                    state.data[index] = action.payload
                }
            })

            .addCase(updateStudents.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

    }
})

export const { } = crudSlice.actions
export default crudSlice.reducer