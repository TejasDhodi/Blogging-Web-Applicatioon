import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Features/Auth.Slice";
import VerifiedUserSlice from "../Features/VerifiedUser.Slice";

const Store = configureStore({
    reducer: {
        Authentication: AuthSlice,
        VerifiedUser : VerifiedUserSlice
    }
})

export default Store;