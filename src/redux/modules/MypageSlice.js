import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

const initialState = {
  myPage: [],
  myPageIn: [],
  myPageInterest: [],
  myPageParticipati: [],
};

export const _MyPageData = createAsyncThunk(
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

export const _MyPageInAuction = createAsyncThunk(
  "GetMyPageInAuction",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/member/mypage/myauction`);
      console.log("in", response);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _MyPageInterestAuction = createAsyncThunk(
  "GetMyPageInterestAuction",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/member/favorite`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _MyPageParticipationAuction = createAsyncThunk(
  "GetMyPageParticipationAuction",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/member/mypage/participant`);
      console.log("------", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editMyPage = createAsyncThunk(
  "editAuctionItem",
  async (payload, thunkAPI) => {
    const { memberId } = thunkAPI.getState().myPage.myPage;
    console.log("-------", memberId);
    console.log("1234", payload);
    try {
      const response = await api.patch(`/member/${memberId}/mypage`, payload, {
        "Content-Type": "multipart/form-data",
      });
      // return thunkAPI.fulfillWithValue(response.data);
      return console.log("마이페이지 수정", response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const myPageSlice = createSlice({
  name: "myPage",
  initialState,
  extraReducers: {
    [_MyPageData.fulfilled]: (state, action) => {
      state.myPage = action.payload;
    },
    [_MyPageData.rejected]: (state, action) => {
      console.log(action);
    },
    [_MyPageInAuction.fulfilled]: (state, action) => {
      state.myPageIn = action.payload;
      console.log(state.myPageIn);
    },
    [_MyPageInAuction.rejected]: (state, action) => {
      console.log(action);
    },
    [_MyPageInterestAuction.fulfilled]: (state, action) => {
      state.myPageInterest = action.payload;
    },
    [_MyPageInterestAuction.rejected]: (state, action) => {
      console.log(action);
    },

    [_MyPageParticipationAuction.fulfilled]: (state, action) => {
      state.myPageParticipati = action.payload;
    },
    [_MyPageParticipationAuction.rejected]: (state, action) => {
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
