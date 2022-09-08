//Redux import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";
import { getCookie, setCookie } from "../../shared/Cookie";

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
      if (res.data.success === false) {
        return window.alert(res.data.err.message);
      } else {
        localStorage.setItem("memberId", res.data.data.memberId);
        localStorage.setItem("accessToken", res.headers.authorization);
        return (
          window.alert(`${res.data.data.nickName}님 안녕하세요!`),
          window.location.replace("/")
        );
      }
    });
    return thunkAPI.fulfillWithValue(resData.data.data);
  }
);

export const kakaoOauthThunk = createAsyncThunk(
  "member/kakaoLogin",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    const resData = await api
      .get("/member/kakao/callback", {
        params: {
          code: payload,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode) {
          localStorage.setItem("memberId", res.data.data.email);
          console.log(res.data.data.tokenDto.accessTokenExpiresIn);
          localStorage.setItem("accessToken", res.headers.authorization);
          setCookie(
            "accessToken",
            res.headers["authorization"],
            res.data.data.tokenDto.accessTokenExpiresIn
          );
          const cookie = getCookie("accessToken");
          // console.log(cookie);
          window.location.replace("/");
          return res;
        }
      })
      .catch((err) => console.log(err));

    return thunkAPI.fulfillWithValue(resData.data.data);
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
      console.log(state, action);
    });
  },
});

export const { headerAction, loginAction } = memberSlice.actions;
export default memberSlice.reducer;
