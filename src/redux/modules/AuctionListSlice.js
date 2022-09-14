// Package import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

const initialState = {
  auctionList: [],
  loading: false,
  followingItem: true,
  paging: 1,
};

export const auctionItemList = createAsyncThunk(
  "getAuctionItemList",
  async (payload, thunkAPI) => {
    try {
      // auctionList는 스토어에 있는 리덕스
      const { paging } = thunkAPI.getState().auctionList;
      const response = await api.get(
        `/pagination/auction?page=${paging}&size=6&sortBy=id&isAsc=false`
      );
      console.log("auctionItemListSlice", response);
      if (response?.data?.data && response?.data?.data <= 0) {
        thunkAPI.dispatch(noFollowingItem());
      }
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addAuctionItem = createAsyncThunk(
  "sendAddAuctionItem",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/auction", payload, {
        "Content-Type": "multipart/form-data",
      });
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editAuctionItem = createAsyncThunk(
  "editAuctionItem",
  async (payload, thunkAPI) => {
    try {
      const response = await api.put(
        `auction/${payload.actionId}`,
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

export const deleteAuctionItem = createAsyncThunk(
  "deleteAuctionItem",
  async (payload, thunkAPI) => {
    try {
      const response = await api.delete(`auction/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const auctionCategoryList = createAsyncThunk(
  "auctionCategoryList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/category/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const auctionRegionList = createAsyncThunk(
  "auctionRegionList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/region/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const auctionCategoryRegionList = createAsyncThunk(
  "auctionCategoryRegionList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(
        `/auction/category/${payload.categoryName}/region/${payload.regionName}`
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const auctionListSlice = createSlice({
  name: "auctionList",
  initialState,
  // reducers: {
  //   onModalHandler: (state, action)=>{
  //     state.auctionList.map((post)=>{
  //       if(post)
  //       (post.isModalMode = !post.isModalMode)
  //     })
  //   }
  //   ,
  // },
  reducers: {
    noFollowingItem: (state, action) => {
      state.followingItem = false;
    },
  },
  extraReducers: {
    [auctionItemList.fulfilled]: (state, action) => {
      state.auctionList = [...state.auctionList, ...action.payload];
      state.loading = false;
      state.paging = state.paging + 1;
    },
    [auctionItemList.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
    },
    [auctionItemList.pending]: (state, action) => {
      state.loading = true;
    },
    [addAuctionItem.fulfilled]: (state, action) => {
      state.auctionList = [action.payload, ...state.auctionList];
    },
    [addAuctionItem.rejected]: (state, action) => {
      console.log(action);
    },

    [editAuctionItem.fulfilled]: (state, action) => {
      state.auctionList = state.auctionList.map((item, index) => {
        if (item.auctionId === action.payload.postId) {
          return {
            ...item,
            content: action.payload.content,
            imgUrl: action.payload.imgUrl,
          };
        } else {
          return { ...item };
        }
      });
    },
    [editAuctionItem.rejected]: (state, action) => {
      console.log(action);
    },

    [deleteAuctionItem.fulfilled]: (state, action) => {
      state.auctionList = state.auctionList.filter(
        (post) => post.auctionId !== action.payload
      );
    },
    [deleteAuctionItem.rejected]: (state, action) => {
      console.log(action);
    },

    // 경매 카테고리별 조회
    [auctionCategoryList.fulfilled]: (state, action) => {
      state.auctionList = action.payload;
    },
    [auctionCategoryList.rejected]: (state, action) => {
      console.log(action);
    },

    // 경매 지역별 조회
    [auctionRegionList.fulfilled]: (state, action) => {
      state.auctionList = action.payload;
    },
    [auctionRegionList.rejected]: (state, action) => {
      console.log(action);
    },

    // 경매 카테고리별 & 지역별 조회
    [auctionCategoryRegionList.fulfilled]: (state, action) => {
      state.auctionList = action.payload;
    },
    [auctionCategoryRegionList.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

const { noFollowingItem } = auctionListSlice.actions;

export default auctionListSlice.reducer;
