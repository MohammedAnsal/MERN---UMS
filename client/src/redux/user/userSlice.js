import { createSlice } from '@reduxjs/toolkit';

//  Initial State (user) :-

const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {

    currentUser : null,
    loading: false,
    error: false

};

//  Reducer (user)

const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        
        signInStart: (state) => {
            
            state.loading = true

        },

        signInSuccess: (state, action) => {
            
            state.currentUser = action.payload
            state.loading = false
            state.error = false
            localStorage.setItem('user', JSON.stringify(state))

        },

        signInFailure: (state) => {
            
            state.loading = false
            state.error = true

        }

    }

});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;