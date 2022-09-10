import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

const initialState = {
  myPage: [],
};

export const myPageData = createAsyncThunk(
  "getMyPageData",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/member/${payload}/mypage`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const MyPageInterestAuction = createAsyncThunk(
  "GetMyPageInterestAuction",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/member/mypage/myauction`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editMyPage = createAsyncThunk(
  "editAuctionItem",
  async (payload, id, thunkAPI) => {
    try {
      const response = await api.patch(`/member/${payload}/mypage`);
      // return thunkAPI.fulfillWithValue(response.data);
      return console.log("마이페이지 수정", response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const myPageSlice = createSlice({
  name: "myPage",
  initialState,
  extraReducers: {
    [myPageData.fulfilled]: (state, action) => {
      state.myPage = action.payload;
    },
    [myPageData.rejected]: (state, action) => {
      console.log(action);
    },
    [MyPageInterestAuction.fulfilled]: (state, action) => {
      state.myPage = action.payload;
    },
    [MyPageInterestAuction.rejected]: (state, action) => {
      console.log(action);
    },
    [editMyPage.fulfilled]: (state, action) => {
      state.myPage = state.myPage.map((item, index) => {
        if (item.auctionId === action.payload.postId) {
          return {
            ...item,
            nickname: action.payload.nickname,
            imgUrl: action.payload.profileImgUrl,
          };
        } else {
          return { ...item };
        }
      });
    },
    [editMyPage.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default myPageSlice.reducer;
