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
  favorite: {},
  review: "",
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
  }
);

export const auctionFavorite = createAsyncThunk(
  "auctionFavorite",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/${payload}/favorite`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
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
  }
);

export const doneAuction = createAsyncThunk(
  "doneAuction",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/${payload}/done`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const reviewAuction = createAsyncThunk(
  "reviewAuction",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post(
        `/auction/${payload.auctionId}/review`,
        payload.data
      );
			console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const auctionSlice = createSlice({
  name: "auction_",
  initialState,
  extraReducers: {
    //경매 상세 조회
    [auctionDetailData.fulfilled]: (state, action) => {
      // console.log(action.payload.favoriteStatus);
      state.auction = action.payload;
    },
    [auctionDetailData.rejected]: (state, action) => {
      console.log(action);
    },

    //옥션 좋아요 조회
    [auctionFavorite.fulfilled]: (state, action) => {
      state.favorite = action.payload;
    },
    [auctionFavorite.rejected]: (state, action) => {
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

    // 경매 거래 종료
    [doneAuction.fulfilled]: (state, action) => {
      // action.payload -> auction (auctionStatus === false)
      state.auction = action.payload;
    },
    [doneAuction.rejected]: (state, action) => {
      console.log(action);
    },

    // 경매 평가(리뷰)
    [reviewAuction.fulfilled]: (state, action) => {
      // auction.paylod -> auction review result data("판매자가 낙찰자 평가하기 완료")
      state.review = action.payload.data;
    },
    [reviewAuction.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default auctionSlice.reducer;
