import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/api";

const initialState = {
	chatList: []
}

const chatListSlice = createSlice({
	name: "chatList",
	initialState,
	extraReducers: {

	}
})

export default chatListSlice.reducer;