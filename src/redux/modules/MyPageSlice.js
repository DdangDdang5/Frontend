import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

const initialState = {
  myPage: [],
  myPageList: [],
  loading: false,
  followingItem: true,
  paging: 1,
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
      const { paging } = thunkAPI.getState().myPage;
      const response = await api.get(
        `/pagination/member/mypage/myauction?page=${paging}&size=6&sortBy=id&isAsc=false`
      );
      // console.log(paging);

      if (response?.data?.data && response?.data?.data <= 0) {
        thunkAPI.dispatch(noFollowingItem());
      }
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
      const { paging } = thunkAPI.getState().myPage;
      const response = await api.get(
        `/pagination/member/favorite?page=${paging}&size=6&sortBy=id&isAsc=false`
      );
      // console.log(paging);

      if (response?.data?.data && response?.data?.data <= 0) {
        thunkAPI.dispatch(noFollowingItem());
      }
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
      const { paging } = thunkAPI.getState().myPage;
      const response = await api.get(
        `/pagination/member/mypage/participant?page=${paging}&size=6&sortBy=id&isAsc=false`
      );
      // console.log("슬라이스", response);
      if (response?.data?.data && response?.data?.data <= 0) {
        thunkAPI.dispatch(noFollowingItem());
      }
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editMyPage = createAsyncThunk(
  "editAuctionItem",
  async (payload, thunkAPI) => {
    try {
      const response = await api.patch(
        `/member/${payload.memberId}/mypage`,
        payload.formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const myPageSlice = createSlice({
  name: "myPage",
  initialState,
  reducers: {
    noFollowingItem: (state, action) => {
      state.followingItem = false;
    },
    resetPaging: (state, action) => {
      state.paging = 1;
    },
    resetList: (state, action) => {
      state.myPageList = [];
    },
  },
  extraReducers: {
    [_MyPageData.fulfilled]: (state, action) => {
      state.myPage = action.payload;
    },
    [_MyPageData.rejected]: (state, action) => {
      console.log(action);
    },
    [_MyPageInAuction.fulfilled]: (state, action) => {
      state.myPageList = [...state.myPageList, ...action.payload];
      state.loading = false;
      state.paging = state.paging + 1;
    },
    [_MyPageInAuction.rejected]: (state, action) => {
      console.log(action);
    },
    [_MyPageInterestAuction.fulfilled]: (state, action) => {
      state.myPageList = [...state.myPageList, ...action.payload];
      state.loading = false;
      state.paging = state.paging + 1;
    },
    [_MyPageInterestAuction.rejected]: (state, action) => {
      console.log(action);
    },

    [_MyPageParticipationAuction.fulfilled]: (state, action) => {
      state.myPageList = [...state.myPageList, ...action.payload];
      state.loading = false;
      state.paging = state.paging + 1;
    },
    [_MyPageParticipationAuction.rejected]: (state, action) => {
      console.log(action);
    },
    [editMyPage.fulfilled]: (state, action) => {
      state.myPage = action.payload;
    },
    [editMyPage.rejected]: (state, action) => {
      console.log(action);
    },
  },
});
export const { noFollowingItem, resetPaging, resetList } = myPageSlice.actions;

export default myPageSlice.reducer;
