import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  msg: "Feature Coming Soon",
};

export const comingSoonSlice = createSlice({
  name: "comingSoon",
  initialState,
  reducers: {
    setOpen: (state, { payload }) => {
      state.open = true;
      state.msg = payload || "Feature Coming Soon";
    },
    setClose: (state) => {
      state.open = false;
      state.msg = "Feature Coming Soon";
    },
  },
});

export const { setClose, setOpen } = comingSoonSlice.actions;
export default comingSoonSlice.reducer;
