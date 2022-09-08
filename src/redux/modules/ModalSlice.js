// Package import
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  division: "",
	categoryName: "전체품목",
	regionName: "전체지역",
  mode: ""
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.show = true;
      state.division = action.payload;
    },
    hideModal: (state, action) => {
			// action.paylod -> categoryName, regionName
      state.show = false;

			if (action.payload?.categoryName) {
				state.categoryName = action.payload.categoryName;
			}
			if (action.payload?.regionName) {
				state.regionName = action.payload.regionName;
			}
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { showModal, hideModal, changeMode } = modalSlice.actions;
export default modalSlice.reducer;
