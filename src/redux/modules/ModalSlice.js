import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  category: "",
  mode: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.show = true;
      state.division = action.payload;
    },
    hideModal: (state) => {
      state.show = false;
      state.division = "";
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { showModal, hideModal, changeMode } = modalSlice.actions;
export default modalSlice.reducer;
