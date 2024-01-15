import {createSlice} from '@reduxjs/toolkit'

const initialState = null

const verifiedUserSlice = createSlice({
    name: 'VerifiedUser',
    initialState,
    reducers: {
        setProfile: (state, action) => action.payload
        ,
        clearProfile: (state, action) => null
    }

});

export const {setProfile, clearProfile} = verifiedUserSlice.actions;
export default verifiedUserSlice.reducer;