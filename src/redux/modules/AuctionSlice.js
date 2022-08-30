import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/api";

const initialState = {
	auction: []
}

const auctionSlice = createSlice({
	name: "auction",
	initialState,
	extraReducers: {

	}
})

export default auctionSlice.reducer;