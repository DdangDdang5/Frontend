import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

const initialState = {
  auction: {
    member: {},
    multiImages: [{}],
  },
};

export const auctionDetailData = createAsyncThunk(
  "auctionDetailData",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.data);
      // return console.log("드가자자아아아!!!", response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const auctionSlice = createSlice({
  name: "auction_",
  initialState,
  extraReducers: {
    [auctionDetailData.fulfilled]: (state, action) => {
      state.auction = action.payload;
    },
    [auctionDetailData.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default auctionSlice.reducer;
