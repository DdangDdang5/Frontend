// Redux import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

export const auctionSearchThunk = createAsyncThunk(
  "auction/auctionSearch",
  async (payload, thunkAPI) => {
    const resData = await api.get(`/auction/search/${payload}`);
    // .then((res) => console.log(res.data));
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

const initialState = {
  data: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(auctionSearchThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(action);
    });
  },
});

export const { searchAction } = searchSlice.actions;
export default searchSlice.reducer;