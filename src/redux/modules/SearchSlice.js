// Redux import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

// 검색 API
export const auctionSearchThunk = createAsyncThunk(
  "auction/auctionSearch",
  async (payload, thunkAPI) => {
    const resData = await api.get(`/auction/search/${payload}`);
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

// 최근 검색어 API
export const recentSearchThunk = createAsyncThunk(
  "auction/recentSearch",
  async (payload, thunkAPI) => {
    const resData = await api.get(`/auction/recent-search`, payload);
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

// 인기 검색어 API
export const popularSearchThunk = createAsyncThunk(
  "auction/popularSearch",
  async (payload, thunkAPI) => {
    const resData = await api.get(`/auction/popular-search`, payload);
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

const initialState = {
  data: "",
  recentSearch: [],
  popularSearch: [],
  search: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    recentAction: (state, action) => {
      state.recentSearch = action.payload.recentSearch;
      state.isLogin = action.payload.isLogin;
    },
    popularAction: (state, action) => {
      state.popularSearch = action.payload.popularSearch;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auctionSearchThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(recentSearchThunk.fulfilled, (state, action) => {
      if (action.payload !== "회원에게만 제공되는 서비스입니다.") {
        state.recentSearch = action.payload;
        state.isLogin = true;
      }
    });
    builder.addCase(popularSearchThunk.fulfilled, (state, action) => {
      state.popularSearch = action.payload;
    });
  },
});

export const { searchAction, recentAction, popularAction } =
  searchSlice.actions;
export default searchSlice.reducer;
