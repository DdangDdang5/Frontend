// Redux import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

// Shared import
import api from "../../shared/Api";
import { getCookie, setCookie } from "../../shared/Cookie";
import { KAKAO_OAUTH_URL } from "../../shared/SocialAuth";

const cookies = new Cookies();

export const emailCheckThunk = createAsyncThunk(
  "member/emailCheck",
  async (payload, thunkAPI) => {
    const resData = await api.post(`/member/emailcheck`, payload);
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

export const nickNameCheckThunk = createAsyncThunk(
  "member/nickNameCheck",
  async (payload, thunkAPI) => {
    const resData = await api.post(`/member/nicknamecheck`, payload);
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

export const signUpMemberThunk = createAsyncThunk(
  "member/signUpMember",
  async (payload, thunkAPI) => {
    const resData = await api.post(`/member/signup`, payload).then((res) => {
      if (res.data.success === false) {
        return window.alert(res.data.err.message);
      } else {
        return (
          window.alert(`${res.data.data.nickName}님 회원가입을 축하드립니다!`),
          window.location.replace("/login")
        );
      }
    });
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

export const loginMemberThunk = createAsyncThunk(
  "member/loginMember",
  async (payload, thunkAPI) => {
    const resData = await api.post(`/member/login`, payload).then((res) => {
      console.log(res);
      if (res.data.statusCode === 200) {
        // const tokeretn = getCookie("accessToken");
        // setCookie("accessToken", res.headers.authorization, +res.headers.expires);
        cookies.set(
          "accessToken",
          res.headers.authorization,
          +res.headers.expires
        );
        cookies.set("memberId", res.data.data.memberId);
        console.log(cookies);

        sessionStorage.setItem("accessToken", res.headers.authorization);
        sessionStorage.setItem("memberId", res.data.data.memberId);
        sessionStorage.setItem("memberNickname", res.data.data.nickName);
        return res;
      } else {
        return res;
      }
    });
    console.log(resData);
    return thunkAPI.fulfillWithValue(resData.data);
  }
);

export const kakaoOauthThunk = createAsyncThunk(
  "member/kakaoLogin",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    console.log(KAKAO_OAUTH_URL);

    const resData = await api
      .get(process.env.REACT_APP_URL + "/member/kakao/callback", {
        params: {
          code: payload,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          cookies.set(
            "accessToken",
            res.headers.authorization,
            +res.headers.expires
          );
          cookies.set("memberId", res.data.data.memberId);
          console.log(cookies);

          sessionStorage.setItem("accessToken", res.headers.authorization);
          sessionStorage.setItem("memberId", res.data.data.memberId);
          sessionStorage.setItem("memberNickname", res.data.data.nickName);
          window.location.replace("/");
          return res;
        } else {
          return res;
        }
      });
    console.log(resData);
    return thunkAPI.fulfillWithValue(resData.data);
  }
);

// export const loginCheckDB = () => {
//   return function (dispatch, getState, {history}) {
//     const token = getCookie("accessToken");

//     if (!token) {
//       return;
//     }
//     api.get("")
//   }
// }

const initialState = {
  member: "",
  isLogin: false,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.email = action.payload.email;
      state.isLogin = action.payload.isLogin;
    },
    headerAction: (state, action) => {
      state.email = action.payload.email;
      state.isLogin = action.payload.isLogin;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginMemberThunk.fulfilled, (state, action) => {
      state.member = action.payload;
      state.isLogin = true;
    });
    builder.addCase(kakaoOauthThunk.fulfilled, (state, action) => {
      state.member = action.payload;
      console.log(state, action);
    });
  },
});

export const { headerAction, loginAction } = memberSlice.actions;
export default memberSlice.reducer;
