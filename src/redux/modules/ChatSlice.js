// Package import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chatList: [],
  chatRoomList: [],
};

export const makeChatRoom = createAsyncThunk(
  "makeChatRoom",
  async (payload, thunkAPI) => {
		try {
	    const response = await axios.post(process.env.REACT_APP_URL + "/chat/room?name=채팅방777");
	    // const response = await axios.post("http://localhost:8080/chat/room?name=채팅방999");
	    return thunkAPI.fulfillWithValue(response.data);
		} catch(err) {
			console.log(err);
			// return thunkAPI.rejectWithValue(err);
		}
  },
);

const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  extraReducers: {
    [makeChatRoom.fulfilled]: (state, action) => {
			// action.payload -> chatroom list
      state.chatRoomList.push(action.payload);
    },
  },
});

export default chatListSlice.reducer;
