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

	// ????????? ????????????, ????????? ?????? API ??????
  const onCheckCategoryRegion = (categoryName, regionName) => {
    const categoryNameCheck = categoryName.split(/\s|\//g).join(""); // ??????, / ??????
    const regionNameCheck = regionName.split(" ").join(""); // ?????? ??????

    if (categoryNameCheck === "????????????" && regionNameCheck === "????????????") {
      dispatch(auctionItemList());
    } else if (
      categoryNameCheck !== "????????????" &&
      regionNameCheck !== "????????????"
    ) {
      dispatch(
        auctionCategoryRegionList({
          categoryName: categoryNameCheck,
          regionName: regionNameCheck,
        }),
      );
    } else if (categoryNameCheck !== "????????????") {
      dispatch(auctionCategoryList(categoryNameCheck));
    } else if (regionNameCheck !== "????????????") {
      dispatch(auctionRegionList(regionName));
    }
  };

	// ????????????, ?????? ??????
  const onClickModalItem = (division, divisionName) => {
    if (division === "regionList") {
      dispatch(
        hideModal({ categoryName: "?????? ??????", regionName: divisionName }),
      );
      onCheckCategoryRegion("?????? ??????", divisionName);
    } else if (division === "categoryList") {
      dispatch(
        hideModal({ categoryName: divisionName, regionName: "?????? ??????" }),
      );
      onCheckCategoryRegion(divisionName, "?????? ??????");
    }
  };

	// ????????????, ?????? ?????? ??? ?????? ???????????? ??????
  const onClickAuctionDivision = () => {
    onClickModalItem(division, divisionName);
    navigate("/auctionList");
  };

  return (
    <CategoryItem division={division} onClick={onClickAuctionDivision}>
      {
        {
          "?????? ??????": <CategoryImg src={All} alt="category" alt="category"/>,

          ??????: <CategoryImg src={HomeElectronics} alt="category"/>,
          "??????/????????????": <CategoryImg src={Interior} alt="category"/>,
          "?????? ??????": <CategoryImg src={ManFashion} alt="category"/>,
          ?????????: <CategoryImg src={Digital} alt="category"/>,
          "?????? ??????": <CategoryImg src={WomanFashion} alt="category"/>,
          ????????????: <CategoryImg src={Accessory} alt="category"/>,
          "?????????/??????": <CategoryImg src={Sport} alt="category"/>,
          "??????/??????/??????": <CategoryImg src={Hobby} alt="category"/>,
          "??????/??????": <CategoryImg src={Beauty} alt="category"/>,

          "?????? ??????": <CategoryImg division="region" src={Seoul} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Dobong} alt="region"/>,
          ????????????: <CategoryImg division="region" src={Dongdaemun} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Dongjak} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Eunpyeong} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Gangbuk} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Gangdong} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Gangnam} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Gangseo} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Geumcheon} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Guro} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Gwanak} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Gwangjin} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Jongno} alt="region"/>,
          ??????: <CategoryImg division="region" src={Jung} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Jungnang} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Mapo} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Nowon} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Seocho} alt="region"/>,
          ????????????: <CategoryImg division="region" src={Seodaemun} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Seongbuk} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Seongdong} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Songpa} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Yangcheon} alt="region"/>,
          ????????????: <CategoryImg division="region" src={Yeoungdeongpo} alt="region"/>,
          ?????????: <CategoryImg division="region" src={Yongsan} alt="region"/>,
        }[divisionName]
      }

      <CategoryName division={division}>{divisionName}</CategoryName>
    </CategoryItem>
  );
};

export default AuctionCategory;
