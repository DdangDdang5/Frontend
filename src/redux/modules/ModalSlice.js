// Package import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Shared import
import api from "../../shared/Api";

const initialState = {
  show: false,
  division: "",
  categoryName: "전체 품목",
  regionName: "서울 전체",
  categoryList: [],
  regionList: [],
  mode: "",
};

export const _categoryList = createAsyncThunk(
  "getCategoryList",
  async (payload, thunkAPI) => {
    try {
      // auctionList는 스토어에 있는 리덕스
      const response = await api.get(`/auction/category/show`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const _regionList = createAsyncThunk(
  "getRegionList",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auction/region/show`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.show = true;
      state.division = action.payload;
    },
    hideModal: (state, action) => {
      // action.paylod -> categoryName, regionName
      state.show = false;
      state.division = "";

      if (action.payload?.categoryName) {
        state.categoryName = action.payload.categoryName;
      }
      if (action.payload?.regionName) {
        state.regionName = action.payload.regionName;
      }
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
		clearMode: (state, action) => {
			state.categoryName = "전체 품목";
			state.regionName = "서울 전체";
		}
  },
  extraReducers: {
    [_categoryList.fulfilled]: (state, action) => {
      const setCategoryList = new Set(
        action.payload.map((item) => {
          switch (item.categoryName) {
            case "전체품목":
              return { ...item, categoryName: "전체 품목" };
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
        }),
      );
      state.categoryList = [...setCategoryList]
        .filter((item) => item.categoryName === "전체 품목")
        .concat(
          [...setCategoryList].filter(
            (item) => item.categoryName !== "전체 품목",
          ),
        );
    },
    [_categoryList.rejected]: (state, action) => {
      console.log(action);
    },

    [_regionList.fulfilled]: (state, action) => {
      const setRegionList = new Set(
        action.payload.map((item) => {
          switch (item.region) {
            case "서울전체":
              return { ...item, region: "서울 전체" };
            default:
              return item;
          }
        }),
      );
      state.regionList = [...setRegionList]
        .filter((item) => item.region === "서울 전체")
        .concat(
          [...setRegionList].filter(
            (item) => item.region !== "서울 전체",
          ),
        );
    },
    [_regionList.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { showModal, hideModal, changeMode, clearMode } = modalSlice.actions;
export default modalSlice.reducer;
