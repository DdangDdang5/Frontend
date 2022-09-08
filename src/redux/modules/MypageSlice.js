import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

const initialState = {
  myPage: [],
};

export const myPageData = createAsyncThunk(
  "getMyPageData",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/member/${payload}/mypage`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const myPageSlice = createSlice({
  name: "myPage",
  initialState,
  extraReducers: {
    [myPageData.fulfilled]: (state, action) => {
      state.myPage = action.payload;
    },
    [myPageData.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default myPageSlice.reducer;
