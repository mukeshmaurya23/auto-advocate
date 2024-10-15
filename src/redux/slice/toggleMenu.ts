import { createSlice } from "@reduxjs/toolkit";

const toggleMenuSlice = createSlice({
    name: "toggleMenuApp",
    initialState: {
        isMenuOpen: false,
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
    },
});

export const { toggleMenu } = toggleMenuSlice.actions;
export default toggleMenuSlice.reducer;
