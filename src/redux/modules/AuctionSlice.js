import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

const initialState = {
  auction: [],
};

export const auctionDetail = createAsyncThunk(
  "getAuctionDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/${payload}`);
      // return thunkAPI.fulfillWithValue(response.data.data);
      return console.log("드가자자아아아!!!", response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  extraReducers: {
    [auctionDetail.fulfilled]: (state, action) => {
      state.auction = action.payload;
    },
    [auctionDetail.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default auctionSlice.reducer;
