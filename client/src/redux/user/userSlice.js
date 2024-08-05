import { createSlice } from '@reduxjs/toolkit';

//  Initial State (user) :-

const initialState = {

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

        },

        signInFailure: (state) => {
            
            state.loading = false
            state.error = true

        }

    }

});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;