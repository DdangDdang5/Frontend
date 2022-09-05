import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../shared/Api";

const initialState = {
  categoryList: [
    // "남성 패션",
    // "남성 잡화",
    // "남성 의류",
    // "여성 패션",
    // "여성 잡화",
    // "여성 의류",
    // "취미/게임/음반",
    // "스포츠/레저",
  ],
  regionList: [
    // "서울 전체",
    // "강남구",
    // "강동구",
    // "강북구",
    // "강서구",
    // "관악구",
    // "광진구",
    // "구로구",
    // "금천구",
    // "노원구",
    // "도봉구",
    // "동대문구",
    // "동작구",
    // "마포구",
    // "서대문구",
    // "서초구",
    // "성동구",
    // "성북구",
    // "송파구",
    // "양천구",
    // "영등포구",
    // "용산구",
    // "은평구",
    // "종로구",
    // "중구",
    // "중랑구",
  ],
};

export const categoryHitList = createAsyncThunk(
  "getCategoryHitList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/category/hit");
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const regionHitList = createAsyncThunk(
  "getRegionHitList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/region/hit");
      return response.data.data;
    } catch (err) {
      console.log(err);
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
      state.categoryList = action.payload;
    },

    [regionHitList.fulfilled]: (state, action) => {
      state.regionList = action.payload;
    },
  },
});

export const { getCategoryList, getRegionList } = actionDivisionSlice.actions;
export default actionDivisionSlice.reducer;
