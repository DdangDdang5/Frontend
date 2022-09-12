import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../shared/Api";

const initialState = {
  chatList: [],
  chatRoomList: [],
};

export const makeChatRoom = createAsyncThunk(
  "makeChatRoom",
  async (payload, thunkAPI) => {
		try {
	    console.log("make chat room actions!!!!");

	    const response = await axios.post(process.env.REACT_APP_URL2 + "/chat/room?name=채팅방999");
	    // const response = await axios.post("http://localhost:8080/chat/room?name=채팅방999");
	    console.log(response);
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
      console.log("reducer", action);
      state.chatRoomList.push(action.payload);
    },
  },
});

export default chatListSlice.reducer;
