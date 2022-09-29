// Redux import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Package import
import { Cookies } from "react-cookie";

// Shared import
import api from "../../shared/Api";
import { getCookie, setCookie } from "../../shared/Cookie";

const cookies = new Cookies();

// 이메일 중복 체크
export const emailCheckThunk = createAsyncThunk(
  "member/emailCheck",
  async (payload, thunkAPI) => {
    const resData = await api.post(`/member/emailcheck`, payload);
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

// 닉네임 중복 체크
export const nickNameCheckThunk = createAsyncThunk(
  "member/nickNameCheck",
  async (payload, thunkAPI) => {
    const resData = await api.post(`/member/nicknamecheck`, payload);
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

// 회원가입
export const signUpMemberThunk = createAsyncThunk(
  "member/signUpMember",
  async (payload, thunkAPI) => {
    const resData = await api.post(`/member/signup`, payload).then((res) => {
      if (res.data.success === false) {
        return window.alert(res.data.err.message);
      } else {
        return (
          window.alert(`${res.data.data.nickName}님 회원가입을 축하드립니다!`),
          // window.location.replace("/login")
          window.history.back()
        );
      }
    });
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

// 일반 로그인
export const loginMemberThunk = createAsyncThunk(
  "member/loginMember",
  async (payload, thunkAPI) => {
    const resData = await api.post(`/member/login`, payload).then((res) => {
      if (res.data.statusCode === 200) {
        // 쿠키로 토큰 저장
        // const tokeretn = getCookie("accessToken");
        // setCookie("accessToken", res.headers.authorization, +res.headers.expires);

        // cookies.set(
        //   "accessToken",
        //   res.headers.authorization,
        //   +res.headers.expires
        // );
        // cookies.set("memberId", res.data.data.memberId);

        sessionStorage.setItem("accessToken", res.headers.authorization);
        sessionStorage.setItem("memberId", res.data.data.memberId);
        sessionStorage.setItem("memberNickname", res.data.data.nickName);

        return res;
      } else {
        return res;
      }
    });
    return thunkAPI.fulfillWithValue(resData.data);
  }
);

// 카카오 소셜 로그인
export const kakaoOauthThunk = createAsyncThunk(
  "member/kakaoLogin",
  async (payload, thunkAPI) => {
    const resData = await api
      .get(process.env.REACT_APP_URL + "/member/kakao/callback", {
        params: {
          code: payload,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // 쿠키로 토큰 저장
          // cookies.set(
          //   "accessToken",
          //   res.headers.authorization,
          //   +res.headers.expires
          // );
          // cookies.set("memberId", res.data.data.memberId);

          sessionStorage.setItem("accessToken", res.headers.authorization);
          sessionStorage.setItem("memberId", res.data.data.memberId);
          sessionStorage.setItem("memberNickname", res.data.data.nickname);
          window.history.go(-3);

          return res;
        } else {
          return res;
        }
      });
    return thunkAPI.fulfillWithValue(resData.data);
  }
);

export const getMember = createAsyncThunk(
  "getMember",
  async (payload, thunkAPI) => {
    const response = await api.get(`/member/${payload}/lookup`);
    return thunkAPI.fulfillWithValue(response.data.data);
  }
);

export const getMemberTrustPoint = createAsyncThunk(
  "getMemberTrustPoint",
  async (payload, thunkAPI) => {
    const response = await api.get(`/member/${payload}/trust-point`);
    return response.data.data;
  }
);

const initialState = {
  member: "",
  trustPoint: {},
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
    });
    builder.addCase(getMember.fulfilled, (state, action) => {
      state.member = action.payload;
    });
    builder.addCase(getMemberTrustPoint.fulfilled, (state, action) => {
      state.trustPoint = action.payload;
    });
  },
});

export const { headerAction, loginAction } = memberSlice.actions;
export default memberSlice.reducer;
