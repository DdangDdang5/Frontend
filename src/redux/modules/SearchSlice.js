import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

export const auctionSearchThunk = createAsyncThunk(
  "auction/auctionSearch",
  async (payload, thunkAPI) => {
    const resData = await api
      .get(`/auction/search/${payload}`, payload)
      .then((res) => console.log(res));
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);
const initialState = {
  data: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchAction: (state, action) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {},
});

export const { searchAction } = searchSlice.actions;
export default searchSlice.reducer;
