// Package import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

const initialState = {
  auctionList: [],
  auctionHitList: [],
  auctionNewList: [],
  auctionDeadlineList: [],
  loading: false,
  followingItem: true,
  paging: 1,
};

export const auctionItemListNotPage = createAsyncThunk(
  "getAuctionItemList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/auction");
      console.log(response);

      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const auctionItemList = createAsyncThunk(
  "getAuctionItemList",
  async (payload, thunkAPI) => {
    try {
      // auctionList는 스토어에 있는 리덕스
      const { paging } = thunkAPI.getState().auctionList;
      const response = await api.get(
        `/pagination/auction?page=${paging}&size=6&sortBy=id&isAsc=false`,
      );
      if (response?.data?.data && response?.data?.data <= 0) {
        thunkAPI.dispatch(noFollowingItem());
      }
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addAuctionItem = createAsyncThunk(
  "sendAddAuctionItem",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/auction", payload, {
        "Content-Type": "multipart/form-data",
      });
			console.log(response);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
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
        },
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
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
  },
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
  },
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
  },
);

export const auctionCategoryRegionList = createAsyncThunk(
  "auctionCategoryRegionList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(
        `/auction/category/${payload.categoryName}/region/${payload.regionName}`,
      );
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAuctionHitList = createAsyncThunk(
  "getAuctionHitList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/auction/hit");
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAuctionNewList = createAsyncThunk(
  "getAuctionNewList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/auction/new-release");
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAuctionDeadlineList = createAsyncThunk(
  "getAuctionDeadlineList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/auction/deadline");
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
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
    [auctionItemListNotPage.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.auctionList = action.payload;
    },

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
			console.log(action);
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
        (post) => post.auctionId !== action.payload,
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

		// 인기 경매 4개 조회
    [getAuctionHitList.fulfilled]: (state, action) => {
			// action.payload  -> top 4 hit auction list
      state.auctionHitList = action.payload;
    },
		[getAuctionHitList.rejected]: (state, action) => {
			console.log(action);
		},

		// 새로운 경매 3개 조회
    [getAuctionNewList.fulfilled]: (state, action) => {
      // action.payload -> 3 new release auction list 
      state.auctionNewList = action.payload;
    },
		[getAuctionNewList.rejected]: (state, action) => {
			console.log(action);
		},

		// 마감임박 경매 4개 조회
    [getAuctionDeadlineList.fulfilled]: (state, action) => {
      // action.payload -> 4 deadline auction list
      state.auctionDeadlineList = action.payload;
    },
		[getAuctionDeadlineList.rejected]: (state, action) => {
			console.log(action);
		}
  },
});

const { noFollowingItem } = auctionListSlice.actions;

export default auctionListSlice.reducer;
