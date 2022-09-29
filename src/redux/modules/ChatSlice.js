// Package import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

const initialState = {
  chatMessageList: [],
  chatRoomList: [],
};

export const makeChatRoom = createAsyncThunk(
  "makeChatRoom",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/chat/room?name=채팅방777");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      // return thunkAPI.rejectWithValue(err);
    }
  },
);

export const getChatRoomList = createAsyncThunk(
  "getChatRoomList",
  async (payload, thunkAPI) => {
    const response = await api.get("/chat/rooms/all");
    return thunkAPI.fulfillWithValue(response.data.data);
  },
);

export const getChatRoomListByMember = createAsyncThunk(
  "getChatRoomListByMember",
  async (payload, thunkAPI) => {
    const response = await api.get(`/ono/${payload}`);
    // console.log(response);
    return thunkAPI.fulfillWithValue(response.data.data);
  },
);

export const getChatMessageList = createAsyncThunk(
  "getChatMessageList",
  async (payload, thunkAPI) => {
    const response = await api.get(`/chat/message/${payload}`);
    return thunkAPI.fulfillWithValue({
      roomId: payload,
      data: response.data.data,
    });
  },
);

const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    clearChatMessageList: (state, action) => {
      state.chatMessageList = [];
    },
  },
  extraReducers: {
    [makeChatRoom.fulfilled]: (state, action) => {
      // action.payload -> chatroom
      state.chatRoomList.push(action.payload);
    },

    [getChatRoomList.fulfilled]: (state, action) => {
      // action.paylaod -> chatroom list
      state.chatRoomList = action.payload;
    },

    [getChatRoomListByMember.fulfilled]: (state, action) => {
      // action.payload -> 1:1 chatroom list by member
      state.chatRoomList = action.payload;
    },

    [getChatMessageList.fulfilled]: (state, action) => {
      // action.payload -> chatroom message list
      if (
        state.chatMessageList.filter(
          (item) => item.roomId === action.payload.roomId,
        ).length === 0
      ) {
        state.chatMessageList.push(action.payload);
      } else {
        state.chatMessageList = state.chatMessageList.map((item) =>
          item.roomId === action.payload.roomId ? action.payload : item,
        );
      }
    },
  },
});

export const { clearChatMessageList } = chatListSlice.actions;

export default chatListSlice.reducer;
