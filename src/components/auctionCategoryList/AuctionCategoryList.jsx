// React import
import React, { useEffect } from "react";

// Redux import
import {
  categoryHitList,
  regionHitList,
} from "../../redux/modules/AuctionDivisionSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Component & Shared import
import AuctionCategory from "../auctionCategory/AuctionCategory";
import {
  Accessory,
  Beauty,
  Digital,
  Hobby,
  HomeElectronics,
  Interior,
  LogoNormal,
  ManFashion,
  Next,
  Sport,
  WomanFashion,
} from "../../shared/images";

// Style import
import {
  CategoryHeader,
  CategoryList,
  CategoryListContainer,
  CategoryMore,
  CategoryNum,
  CategoryTitle,
} from "./AuctionCategoryList.styled";

const AuctionCategoryList = ({ isCategory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 카테고리 목록, 지역 목록
  const { categoryList, regionList } = useSelector(
    (state) => state.auctionDivision,
  );

  // isCategory === true -> category / false -> place
  const list6 = isCategory
    ? categoryList?.slice(0, 6)
    : regionList?.slice(0, 6);
  const title = isCategory ? "카테고리" : "직거래 지역";

  useEffect(() => {
    dispatch(categoryHitList());
    dispatch(regionHitList());
  }, [dispatch]);

  return (
    <CategoryListContainer>
      <CategoryHeader>
        <CategoryTitle>
          <span>인기 {title} </span>
          <CategoryNum>TOP {list6?.length}</CategoryNum>
        </CategoryTitle>
        <CategoryMore onClick={() => navigate("/auctionList")}>
          <span>전체 보기</span>
          <Next />
        </CategoryMore>
      </CategoryHeader>
      <CategoryList>
        {list6?.map((item, idx) =>
          isCategory ? (
            <AuctionCategory
              division="categoryList"
              divisionName={item.categoryName}
              key={idx}
            />
          ) : (
            <AuctionCategory
              division="regionList"
              divisionName={item.regionName}
              key={idx}
            />
          ),
        )}
      </CategoryList>
    </CategoryListContainer>
  );
};

export default AuctionCategoryList;
