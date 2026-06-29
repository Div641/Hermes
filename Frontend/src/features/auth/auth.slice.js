import { createSlice } from "@reduxjs/toolkit";

//jitte change honge unko handle krne k liye
const authSlice = createSlice({
    name: "auth",
    //through this reload pr page re-initialize ho jata hai
    initialState: {
        user: null,
        loading: true,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setUser, setLoading, setError } = authSlice.actions
export default authSlice.reducer