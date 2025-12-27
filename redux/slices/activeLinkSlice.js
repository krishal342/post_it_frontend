import { createSlice } from "@reduxjs/toolkit";

const activeLinkSlice = createSlice({
    name: "activeLink",
    initialState: {
        value: "",
    },
    reducers: {
        setActiveLink: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setActiveLink } = activeLinkSlice.actions;
export default activeLinkSlice.reducer;