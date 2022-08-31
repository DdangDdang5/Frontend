// Redux import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//package import
// import { apis } from "../../shared/api";

export const signMemberThunk = createAsyncThunk(
  "member/signMember",
  async (payload, thunkAPI) => {
    const resData = await axios
      .post(`${URL}/member/login`, payload)
      .then((res) => res)
      .catch((err) => console.err(err));
    return thunkAPI.fulfillWithValue(resData.data.success);
  }
);

const URL = process.env.REACT_APP_URL;

const initialState = {
  member: [],
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  extraReducers: {
    loginAction: (state, action) => {
      state.member = action.payload.data;
    },
  },
});

console.log("bumsu", memberSlice);

export default memberSlice.reducer;
