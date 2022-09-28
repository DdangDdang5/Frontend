import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

const initialState = {
  notifList: [],
  notifToastList: [
    // {
    //   id: 0,
    //   read: false,
    //   content: "toast notification 1",
    // },
  ],
};

export const getAllNotificationList = createAsyncThunk(
  "getAllNotificationList",
  async (payload, thunkAPI) => {
    const response = await api.get(`/notification/${payload}`);
    return response.data.data;
  },
);

export const readNotification = createAsyncThunk(
  "readNotification",
  async (payload, thunkAPI) => {
    const response = await api.patch(`/notification/read/${payload}`);
    console.log(response);
    return response.data.data;
  },
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    add: (state, action) => {
      state.notifList = [...state.notifList, ...action.payload.newNotifs];
      state.notifToastList = [
        ...state.notifToastList,
        ...action.payload.newNotifs,
      ];

      console.log("eklendi");
    },
    clear: (state, action) => {
      state.notifs = [];
    },
    removeToastList: (state, action) => {
      let updated = state.notifToastList.filter(
        (item) => item.id !== action.payload.notifList.id,
      );
      state.notifToastList = updated;
    },
  },

  extraReducers: {
    [getAllNotificationList.fulfilled]: (state, action) => {
      // action.payload -> notification list by member
      state.notifList = action.payload;
    },
    [readNotification.fulfilled]: (state, action) => {
      console.log("readNotification", action);
      state.notifList = state.notifList.map((item) => {
        if (item.notifId === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
  },
});

export const { add, clear, removeToastList } = notificationSlice.actions;
export default notificationSlice.reducer;
