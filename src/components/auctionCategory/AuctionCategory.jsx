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

  const onClickAuctionDivision = () => {
    onClickModalItem(division, divisionName);

    navigate("/auctionList");
  };

  return (
    <CategoryItem division={division} onClick={onClickAuctionDivision}>
      {
        {
          "전체 품목": <CategoryImg src={All} />,

          가전: <CategoryImg src={HomeElectronics} />,
          "가구/인테리어": <CategoryImg src={Interior} />,
          "남성 패션": <CategoryImg src={ManFashion} />,
          디지털: <CategoryImg src={Digital} />,
          "여성 패션": <CategoryImg src={WomanFashion} />,
          악세서리: <CategoryImg src={Accessory} />,
          "스포츠/레저": <CategoryImg src={Sport} />,
          "취미/게임/악기": <CategoryImg src={Hobby} />,
          "뷰티/미용": <CategoryImg src={Beauty} />,

          "서울 전체": <CategoryImg division="region" src={Seoul} />,
          도봉구: <CategoryImg division="region" src={Dobong} />,
          동대문구: <CategoryImg division="region" src={Dongdaemun} />,
          동작구: <CategoryImg division="region" src={Dongjak} />,
          은평구: <CategoryImg division="region" src={Eunpyeong} />,
          강북구: <CategoryImg division="region" src={Gangbuk} />,
          강동구: <CategoryImg division="region" src={Gangdong} />,
          강남구: <CategoryImg division="region" src={Gangnam} />,
          강서구: <CategoryImg division="region" src={Gangseo} />,
          금천구: <CategoryImg division="region" src={Geumcheon} />,
          구로구: <CategoryImg division="region" src={Guro} />,
          관악구: <CategoryImg division="region" src={Gwanak} />,
          광진구: <CategoryImg division="region" src={Gwangjin} />,
          종로구: <CategoryImg division="region" src={Jongno} />,
          중구: <CategoryImg division="region" src={Jung} />,
          중랑구: <CategoryImg division="region" src={Jungnang} />,
          마포구: <CategoryImg division="region" src={Mapo} />,
          노원구: <CategoryImg division="region" src={Nowon} />,
          서초구: <CategoryImg division="region" src={Seocho} />,
          서대문구: <CategoryImg division="region" src={Seodaemun} />,
          성북구: <CategoryImg division="region" src={Seongbuk} />,
          성동구: <CategoryImg division="region" src={Seongdong} />,
          송파구: <CategoryImg division="region" src={Songpa} />,
          양천구: <CategoryImg division="region" src={Yangcheon} />,
          영등포구: <CategoryImg division="region" src={Yeoungdeongpo} />,
          용산구: <CategoryImg division="region" src={Yongsan} />,
        }[divisionName]
      }

      <CategoryName division={division}>{divisionName}</CategoryName>
    </CategoryItem>
  );
};

export default AuctionCategory;
