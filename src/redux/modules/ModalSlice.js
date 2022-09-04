import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  mode: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.show = true;
    },
    hideModal: (state) => {
      state.show = false;
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { showModal, hideModal, changeMode } = modalSlice.actions;
export default modalSlice.reducer;
