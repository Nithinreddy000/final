// src/slices/reducer.js

import { createSlice } from "@reduxjs/toolkit";
import { authenticate } from "./thunk";

export const initialState = {
    token: null,
    subscriberID: null,
    error: null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle pending state
        builder.addCase(authenticate.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // Handle fulfilled state
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.subscriberID = action.payload.subscriberID;
        });
        // Handle rejected state
        builder.addCase(authenticate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    },
});

export default authSlice.reducer;
