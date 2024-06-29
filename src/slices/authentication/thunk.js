// src/slices/authenticationThunk.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticateUser } from "../../helpers/fakebackend_helper";

export const authenticate = createAsyncThunk(
    "auth/authenticate",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authenticateUser(credentials);
            if (response.token && response.subscriberID) {
                return response;
            } else {
                return rejectWithValue({ error: "Invalid credentials" });
            }
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);
