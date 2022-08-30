import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/api";

const initialState = {
	member: []
}

const memberSlice = createSlice({
	name: "member",
	initialState,
	extraReducers: {

	}
})

export default memberSlice.reducer;