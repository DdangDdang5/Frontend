import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../../shared/api';

const initialState = {
  auctionList: [],
};

const auctionListSlice = createSlice({
  name: 'auctionList',
  initialState,
  extraReducers: {},
});

export default auctionListSlice.reducer;
