import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/api";

const initialState = {
  mypage: [],
};

const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  extraReducers: {},
});

export default mypageSlice.reducer;
