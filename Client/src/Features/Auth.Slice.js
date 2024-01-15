import {createSlice} from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('userToken')) || [];

const AuthSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        setToken: (state, action) => {
            const tokenId = action.payload.id;
            const isTokenAvailable = state.some(token => token.userId === tokenId);

            if(!isTokenAvailable) {
                const updateState = [...state, action.payload];
                localStorage.setItem('userToken', JSON.stringify(updateState));
                return updateState;
            }
            return state;
        },
        removeToken: (state, action) => {
            const removeTokenId = action.payload.id;
            const updateState = state.filter((state) => state.userId !== removeTokenId);
            localStorage.setItem('userToken', JSON.stringify(updateState));
            return updateState;
        }
    }
})

export const {setToken, removeToken} = AuthSlice.actions;
export default AuthSlice.reducer    ;