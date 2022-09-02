// Redux import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//package import
import api from "../../shared/Api";

export const loginMemberThunk = createAsyncThunk(
  "member/loginMember",
  async (payload, thunkAPI) => {
    const resData = await api
      .post(`${URL}/member/login`, payload)
      .then((res) => res)
      .catch((err) => console.err(err));
    window.localStorage.setItem(
      "authorization",
      resData.headers["authorization"]
    );

    return thunkAPI.fulfillWithValue(resData.data.success);
  }
);

export const signUpMemberThunk = createAsyncThunk(
  "member/signUpMember",
  async (payload, thunkAPI) => {
    const resData = await api
      .post(`${URL}/member/signUp`, payload)
      .then((res) => res);

    return thunkAPI.fulfillWithValue(resData);
  }
);

export const kakaoAuthThunk = createAsyncThunk(
  "member/kakaoLogin",
  async (payload, thunkAPI) => {
    const resData = await api
      .get(`/oauth/kakao/callback?code=${payload.code}`)
      .then((res) => res);
    window.localStorage.setItem(
      "authorization",
      resData.headers["authorization"].split(" ")[1]
    );

    return thunkAPI.fulfillWithValue(resData.data.success);
  }
);

const URL = process.env.REACT_APP_URL;

const initialState = {
  member: [],
  loginStatus: false,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  extraReducers: {
    loginAction: (state, action) => {
      state.email = action.payload.email;
      state.loginStatus = action.payload.loginStatus;
    },
  },
});

export const { loginAction } = memberSlice.actions;
export default memberSlice.reducer;
