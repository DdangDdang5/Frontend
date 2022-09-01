// React import
import React from "react";

// Style import
import {
  CategoryHeader,
  CategoryMore,
  CategoryNum,
  CategoryTitle,
} from "./AuctionCategoryList.styled";

const AuctionCategoryList = ({ isCategory }) => {
  const categoryList = [
    "취미",
    "스포츠/레저",
    "남성 패션",
    "여성 잡화",
    "여성 의류",
    "취미/게임/음반",
  ];

  const placeList = [
    "서울 전체",
    "마포구",
    "중구",
    "종로구",
    "강동구",
    "용산구",
  ];

	const list6 = isCategory ? categoryList : placeList;

  return (
    <div>
      <CategoryHeader>
        <CategoryTitle>
          <span>인기 카테고리 </span>
          <CategoryNum>TOP 6</CategoryNum>
        </CategoryTitle>
        <CategoryMore>
          <span>전체보기</span>
          <img src="maskable.png" alt="search" />
        </CategoryMore>
      </CategoryHeader>
			{list6.map((item, idx) => (
				<div>
          <img src="maskable.png" alt="search" />
				</div>
			))}
    </div>
  );
};

export default AuctionCategoryList;
