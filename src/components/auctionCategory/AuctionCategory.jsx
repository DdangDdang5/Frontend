// React import
import React from "react";

// Redux import
import { hideModal } from "../../redux/modules/ModalSlice";
import {
  auctionCategoryList,
  auctionCategoryRegionList,
  auctionItemList,
  auctionRegionList,
} from "../../redux/modules/AuctionListSlice";

// Package import
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Shared import
import All from "../../shared/images/category/All.png";
import Accessory from "../../shared/images/category/Accessory.png";
import Beauty from "../../shared/images/category/Beauty.png";
import Digital from "../../shared/images/category/Digital.png";
import Hobby from "../../shared/images/category/Hobby.png";
import HomeElectronics from "../../shared/images/category/HomeElectronics.png";
import Interior from "../../shared/images/category/Interior.png";
import ManFashion from "../../shared/images/category/ManFashion.png";
import Sport from "../../shared/images/category/Sport.png";
import WomanFashion from "../../shared/images/category/WomanFashion.png";

import Dobong from "../../shared/images/region/Dobong.png";
import Dongdaemun from "../../shared/images/region/Dongdaemun.png";
import Dongjak from "../../shared/images/region/Dongjak.png";
import Eunpyeong from "../../shared/images/region/Eunpyeong.png";
import Gangbuk from "../../shared/images/region/Gangbuk.png";
import Gangdong from "../../shared/images/region/Gangdong.png";
import Gangnam from "../../shared/images/region/Gangnam.png";
import Gangseo from "../../shared/images/region/Gangseo.png";
import Geumcheon from "../../shared/images/region/Geumcheon.png";
import Guro from "../../shared/images/region/Guro.png";
import Gwanak from "../../shared/images/region/Gwanak.png";
import Gwangjin from "../../shared/images/region/Gwangjin.png";
import Jongno from "../../shared/images/region/Jongno.png";
import Jung from "../../shared/images/region/Jung.png";
import Jungnang from "../../shared/images/region/Jungnang.png";
import Mapo from "../../shared/images/region/Mapo.png";
import Nowon from "../../shared/images/region/Nowon.png";
import Seocho from "../../shared/images/region/Seocho.png";
import Seodaemun from "../../shared/images/region/Seodaemun.png";
import Seongbuk from "../../shared/images/region/Seongbuk.png";
import Seongdong from "../../shared/images/region/Seongdong.png";
import Seoul from "../../shared/images/region/Seoul.png";
import Songpa from "../../shared/images/region/Songpa.png";
import Yangcheon from "../../shared/images/region/Yangcheon.png";
import Yeoungdeongpo from "../../shared/images/region/Yeoungdeongpo.png";
import Yongsan from "../../shared/images/region/Yongsan.png";

// Style import
import { CategoryImg, CategoryItem, CategoryName } from "./AuctionCategory.styled";

const AuctionCategory = ({ division, divisionName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

	// 선택된 카테고리, 지역에 맞는 API 호출
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

	// 카테고리, 지역 선택
  const onClickModalItem = (division, divisionName) => {
    if (division === "regionList") {
      dispatch(
        hideModal({ categoryName: "전체 품목", regionName: divisionName }),
      );
      onCheckCategoryRegion("전체 품목", divisionName);
    } else if (division === "categoryList") {
      dispatch(
        hideModal({ categoryName: divisionName, regionName: "서울 전체" }),
      );
      onCheckCategoryRegion(divisionName, "서울 전체");
    }
  };

	// 카테고리, 지역 선택 후 경매 목록으로 이동
  const onClickAuctionDivision = () => {
    onClickModalItem(division, divisionName);
    navigate("/auctionList");
  };

  return (
    <CategoryItem division={division} onClick={onClickAuctionDivision}>
      {
        {
          "전체 품목": <CategoryImg src={All} alt="category" alt="category"/>,

          가전: <CategoryImg src={HomeElectronics} alt="category"/>,
          "가구/인테리어": <CategoryImg src={Interior} alt="category"/>,
          "남성 패션": <CategoryImg src={ManFashion} alt="category"/>,
          디지털: <CategoryImg src={Digital} alt="category"/>,
          "여성 패션": <CategoryImg src={WomanFashion} alt="category"/>,
          악세서리: <CategoryImg src={Accessory} alt="category"/>,
          "스포츠/레저": <CategoryImg src={Sport} alt="category"/>,
          "취미/게임/악기": <CategoryImg src={Hobby} alt="category"/>,
          "뷰티/미용": <CategoryImg src={Beauty} alt="category"/>,

          "서울 전체": <CategoryImg division="region" src={Seoul} alt="region"/>,
          도봉구: <CategoryImg division="region" src={Dobong} alt="region"/>,
          동대문구: <CategoryImg division="region" src={Dongdaemun} alt="region"/>,
          동작구: <CategoryImg division="region" src={Dongjak} alt="region"/>,
          은평구: <CategoryImg division="region" src={Eunpyeong} alt="region"/>,
          강북구: <CategoryImg division="region" src={Gangbuk} alt="region"/>,
          강동구: <CategoryImg division="region" src={Gangdong} alt="region"/>,
          강남구: <CategoryImg division="region" src={Gangnam} alt="region"/>,
          강서구: <CategoryImg division="region" src={Gangseo} alt="region"/>,
          금천구: <CategoryImg division="region" src={Geumcheon} alt="region"/>,
          구로구: <CategoryImg division="region" src={Guro} alt="region"/>,
          관악구: <CategoryImg division="region" src={Gwanak} alt="region"/>,
          광진구: <CategoryImg division="region" src={Gwangjin} alt="region"/>,
          종로구: <CategoryImg division="region" src={Jongno} alt="region"/>,
          중구: <CategoryImg division="region" src={Jung} alt="region"/>,
          중랑구: <CategoryImg division="region" src={Jungnang} alt="region"/>,
          마포구: <CategoryImg division="region" src={Mapo} alt="region"/>,
          노원구: <CategoryImg division="region" src={Nowon} alt="region"/>,
          서초구: <CategoryImg division="region" src={Seocho} alt="region"/>,
          서대문구: <CategoryImg division="region" src={Seodaemun} alt="region"/>,
          성북구: <CategoryImg division="region" src={Seongbuk} alt="region"/>,
          성동구: <CategoryImg division="region" src={Seongdong} alt="region"/>,
          송파구: <CategoryImg division="region" src={Songpa} alt="region"/>,
          양천구: <CategoryImg division="region" src={Yangcheon} alt="region"/>,
          영등포구: <CategoryImg division="region" src={Yeoungdeongpo} alt="region"/>,
          용산구: <CategoryImg division="region" src={Yongsan} alt="region"/>,
        }[divisionName]
      }

      <CategoryName division={division}>{divisionName}</CategoryName>
    </CategoryItem>
  );
};

export default AuctionCategory;
