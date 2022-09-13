// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Style import
import { CategoryItem } from "./AuctionCategory.styled";
import { hideModal } from "../../redux/modules/ModalSlice";
import { auctionCategoryList, auctionCategoryRegionList, auctionItemList, auctionRegionList } from "../../redux/modules/AuctionListSlice";

const AuctionCategory = ({ division, divisionName }) => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const onCheckCategoryRegion = (categoryName, regionName) => {
    const categoryNameCheck = categoryName.split(/\s|\//g).join(""); // 공백, / 제거
    const regionNameCheck = regionName.split(" ").join(""); // 공백 제거

    if (categoryNameCheck === "전체품목" && regionNameCheck === "서울전체") {
      dispatch(auctionItemList());
    } else if (
      categoryNameCheck !== "전체품목" &&
      regionNameCheck !== "서울전체"
    ) {
      dispatch(
        auctionCategoryRegionList({
          categoryName: categoryNameCheck,
          regionName: regionNameCheck,
        }),
      );
    } else if (categoryNameCheck !== "전체품목") {
      dispatch(auctionCategoryList(categoryNameCheck));
    } else if (regionNameCheck !== "서울전체") {
      dispatch(auctionRegionList(regionName));
    }
  };

  const onClickModalItem = (division, divisionName) => {
    if (division === "regionList") {
      dispatch(hideModal({ categoryName: "전체 품목", regionName: divisionName }));
      onCheckCategoryRegion("전체 품목", divisionName);
    } else if (division === "categoryList") {
      dispatch(hideModal({ categoryName: divisionName, regionName: "서울 전체" }));
      onCheckCategoryRegion(divisionName, "서울 전체");
    }
  };

  const onClickAuctionDivision = () => {
		onClickModalItem(division, divisionName);
		
    navigate("/auctionList");
  };

  return (
    <CategoryItem onClick={onClickAuctionDivision}>
      <img src="maskable.png" alt="auction-division" />
      <span>{divisionName}</span>
    </CategoryItem>
  );
};

export default AuctionCategory;
