// Redux import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

// Shared import
import api from "../../shared/Api";
import { getCookie, setCookie } from "../../shared/Cookie";

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
      if (res.data.success === false) {
        console.log(res);
        return (
          window.alert(`${res.data.data.msg}`),
          window.location.replace("/login")
        );
      } else {
        // const token = getCookie("accessToken");
        // setCookie("accessToken", res.headers.authorization, +res.headers.expires);
        cookies.set(
          "accessToken",
          res.headers.authorization,
          +res.headers.expires
        );
        cookies.set("memberId", res.data.data.memberId);

        // const cookie = getCookie("accessToken");
        console.log(cookies);

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
          // localStorage.setItem("memberId", res.data.data.email);
          // localStorage.setItem("accessToken", res.headers.authorization);

          console.log(res.data.data);
          cookies.set(
            "accessToken",
            res.headers.authorization,
            +res.headers.expires
          );
          cookies.set("memberId", res.data.data.memberId);
          // setCookie(
          //   "accessToken",
          //   res.headers["authorization"],
          //   +res.headers.expires
          // );

          // cookies.set(
          //   "accessToken",
          //   res.headers["authorization"],
          //   +res.headers.expires
          // );

          const cookie = getCookie("accessToken");
          console.log(cookie);
          window.location.replace("/");
          return res;
        }
      })
      .catch((err) => console.log(err));

    // window.localStorage.setItem(
    //   "authorization",
    //   resData.headers["authorization"].split(" ")[1]
    // );
    // window.localStorage.setItem(
    //   "refresh-token",
    //   resData.headers["refresh-token"]
    // );

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
