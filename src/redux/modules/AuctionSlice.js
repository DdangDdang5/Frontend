// Package import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

const initialState = {
  auction: {
    member: {},
    multiImages: [{}],
  },
	bid: {},
};

export const auctionDetailData = createAsyncThunk(
  "auctionDetailData",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const winAuctionItem = createAsyncThunk(
  "winAuctionItem",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/${payload}/bidder`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
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

    // 경매 낙찰자 조회
    [winAuctionItem.fulfilled]: (state, action) => {
			// action.payload -> auction bid info
      state.bid = action.payload;
    },
    [winAuctionItem.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default auctionSlice.reducer;
