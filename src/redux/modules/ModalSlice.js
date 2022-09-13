// Package import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

const initialState = {
  show: false,
  division: "",
  categoryName: "전체품목",
  regionName: "전체지역",
  categoryList: [],
  regionList: [],
  mode: "",
};

export const _categoryList = createAsyncThunk(
  "getCategoryList",
  async (payload, thunkAPI) => {
    try {
      // auctionList는 스토어에 있는 리덕스
      const response = await api.get(`/auction/category/show`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const _regionList = createAsyncThunk(
  "getRegionList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/region/show`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      state.division = "";

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
  extraReducers: {
    [_categoryList.fulfilled]: (state, action) => {
      state.categoryList = action.payload;
    },
    [_categoryList.rejected]: (state, action) => {
      console.log(action);
    },
    [_regionList.fulfilled]: (state, action) => {
      state.regionList = action.payload;
    },
    [_regionList.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { showModal, hideModal, changeMode } = modalSlice.actions;
export default modalSlice.reducer;
