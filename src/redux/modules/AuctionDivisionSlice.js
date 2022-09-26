// Package import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

const initialState = {
  categoryList: [],
  regionList: [],
};

export const categoryHitList = createAsyncThunk(
  "getCategoryHitList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/category/hit");
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const regionHitList = createAsyncThunk(
  "getRegionHitList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/region/hit");
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const actionDivisionSlice = createSlice({
  name: "actionDivision",
  initialState,
  reducers: {
    getCategoryList(state, action) {},

    getRegionList(state, action) {},
  },

  extraReducers: {
    [categoryHitList.fulfilled]: (state, action) => {
      state.categoryList = action.payload?.map((item) => {
        switch (item.categoryName) {
					case "전체품목":
						return {...item, categoryName: "전체 품목"};
          case "가구인테리어":
            return { ...item, categoryName: "가구/인테리어" };
          case "남성패션":
            return { ...item, categoryName: "남성 패션" };
          case "여성패션":
            return { ...item, categoryName: "여성 패션" };
          case "스포츠레저":
            return { ...item, categoryName: "스포츠/레저" };
          case "취미게임악기":
            return { ...item, categoryName: "취미/게임/악기" };
          case "뷰티미용":
            return { ...item, categoryName: "뷰티/미용" };
          default:
            return item;
        }
      });
    },
    [categoryHitList.rejected]: (state, action) => {
			console.log(action);
    },

    [regionHitList.fulfilled]: (state, action) => {
      state.regionList = action.payload?.map((item) => {
        switch (item.regionName) {
					case "서울전체":
						return {...item, regionName: "서울 전체"};
          default:
            return item;
        }
      });
    },
    [regionHitList.rejected]: (state, action) => {
			console.log(action);
    },
  },
});

export const { getCategoryList, getRegionList } = actionDivisionSlice.actions;
export default actionDivisionSlice.reducer;
