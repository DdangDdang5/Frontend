// React import
import React from "react";

// Package import
import { useSelector } from "react-redux";

// Component import
import AuctionCategory from "../auctionCategory/AuctionCategory";

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

	// 카테고리 목록, 지역 목록
  const { categoryList, placeList } = useSelector(
    (state) => state.auctionDivision,
  );

	// isCategory === true -> category / false -> place
  const list6 = isCategory ? categoryList.slice(0, 6) : placeList.slice(0, 6);
  const title = isCategory ? "카테고리" : "직거래 지역";

  return (
    <CategoryListContainer>
      <CategoryHeader>
        <CategoryTitle>
          <span>인기 {title} </span>
          <CategoryNum>TOP 6</CategoryNum>
        </CategoryTitle>
        <CategoryMore>
          <span>전체보기</span>
          <img src="maskable.png" alt="all" />
        </CategoryMore>
      </CategoryHeader>
      <CategoryList>
        {list6.map((item, idx) => (
          <AuctionCategory auction={item} key={idx} />
        ))}
      </CategoryList>
    </CategoryListContainer>
  );
};

export default AuctionCategoryList;
