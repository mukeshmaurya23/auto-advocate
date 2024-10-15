import { createSlice } from "@reduxjs/toolkit";
interface AuthState {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
    error: string | null;
    loading: boolean;
}
type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
};

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    user: null,
    error: null,
    loading: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        clearAuth: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});
export const { setToken, setError, setLoading, setRefreshToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;