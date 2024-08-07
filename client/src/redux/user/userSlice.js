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

        },

        updateUserStart: (state) => {
            
            state.loading = true

        },

        updateUserSuccess: (state, action) => {
            
            state.currentUser = action.payload
            state.loading = false
            state.error = false
            localStorage.setItem('user', JSON.stringify(state));

        },

        updateUserFailure: (state, action) => {
            
            state.loading = false
            state.error = action.payload

        },

        deleteUserAccount: (state) => {
            
            state.currentUser = null
            localStorage.removeItem('user');

        },

        signOut: (state) => {
            
            state.currentUser = null
            localStorage.removeItem('user')
            state.loading = false
            state.error = false

        },

    }

});

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserAccount, signOut } = userSlice.actions;

export default userSlice.reducer;