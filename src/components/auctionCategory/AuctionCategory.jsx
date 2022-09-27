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
import { ReactComponent as LogoClassic } from "../../shared/images/logo/LogoClassic.svg";

// import { Accessory, Beauty, Digital, Dobong, Dongdaemun, Dongjak, Eunpyeong, Gangbuk, Gangdong, Gangnam, Gangseo, Geumcheon, Guro, Gwanak, Gwangjin, Hobby, HomeElectronics, Interior, Jongno, Jung, Jungnang, LogoClassic, ManFashion, Mapo, Nowon, Seocho, Seodaemun, Seongbuk, Seongdong, Seoul, Songpa, Sport, WomanFashion, Yangcheon, Yeoungdeongpo, Yongsan } from "../../shared/images";

// import { ReactComponent as Accessory } from "../../shared/images/category/Accessory.svg";
// import { ReactComponent as Beauty } from "../../shared/images/category/Beauty.svg";
// import { ReactComponent as Digital } from "../../shared/images/category/Digital.svg";
// import { ReactComponent as Hobby } from "../../shared/images/category/Hobby.svg";
// import { ReactComponent as HomeElectronics } from "../../shared/images/category/HomeElectronics.svg";
// import { ReactComponent as Interior } from "../../shared/images/category/Interior.svg";
// import { ReactComponent as ManFashion } from "../../shared/images/category/ManFashion.svg";
// import { ReactComponent as Sport } from "../../shared/images/category/Sport.svg";
// import { ReactComponent as WomanFashion } from "../../shared/images/category/WomanFashion.svg";

// import { ReactComponent as Dobong } from "../../shared/images/region/Dobong.svg";
// import { ReactComponent as Dongdaemun } from "../../shared/images/region/Dongdaemun.svg";
// import { ReactComponent as Dongjak } from "../../shared/images/region/Dongjak.svg";
// import { ReactComponent as Eunpyeong } from "../../shared/images/region/Eunpyeong.svg";
// import { ReactComponent as Gangbuk } from "../../shared/images/region/Gangbuk.svg";
// import { ReactComponent as Gangdong } from "../../shared/images/region/Gangdong.svg";
// import { ReactComponent as Gangnam } from "../../shared/images/region/Gangnam.svg";
// import { ReactComponent as Gangseo } from "../../shared/images/region/Gangseo.svg";
// import { ReactComponent as Geumcheon } from "../../shared/images/region/Geumcheon.svg";
// import { ReactComponent as Guro } from "../../shared/images/region/Guro.svg";
// import { ReactComponent as Gwanak } from "../../shared/images/region/Gwanak.svg";
// import { ReactComponent as Gwangjin } from "../../shared/images/region/Gwangjin.svg";
// import { ReactComponent as Jongno } from "../../shared/images/region/Jongno.svg";
// import { ReactComponent as Jung } from "../../shared/images/region/Jung.svg";
// import { ReactComponent as Jungnang } from "../../shared/images/region/Jungnang.svg";
// import { ReactComponent as Mapo } from "../../shared/images/region/Mapo.svg";
// import { ReactComponent as Nowon } from "../../shared/images/region/Nowon.svg";
// import { ReactComponent as Seocho } from "../../shared/images/region/Seocho.svg";
// import { ReactComponent as Seodaemun } from "../../shared/images/region/Seodaemun.svg";
// import { ReactComponent as Seongbuk } from "../../shared/images/region/Seongbuk.svg";
// import { ReactComponent as Seongdong } from "../../shared/images/region/Seongdong.svg";
// import { ReactComponent as Seoul } from "../../shared/images/region/Seoul.svg";
// import { ReactComponent as Songpa } from "../../shared/images/region/Songpa.svg";
// import { ReactComponent as Yangcheon } from "../../shared/images/region/Yangcheon.svg";
// import { ReactComponent as Yeoungdeongpo } from "../../shared/images/region/Yeoungdeongpo.svg";
// import { ReactComponent as Yongsan } from "../../shared/images/region/Yongsan.svg";

import Accessory from "../../shared/images/category/Accessory.svg";
import Beauty from "../../shared/images/category/Beauty.svg";
import Digital from "../../shared/images/category/Digital.svg";
import Hobby from "../../shared/images/category/Hobby.svg";
import HomeElectronics from "../../shared/images/category/HomeElectronics.svg";
import Interior from "../../shared/images/category/Interior.svg";
import ManFashion from "../../shared/images/category/ManFashion.svg";
import Sport from "../../shared/images/category/Sport.svg";
import WomanFashion from "../../shared/images/category/WomanFashion.svg";

import Dobong from "../../shared/images/region/Dobong.svg";
import Dongdaemun from "../../shared/images/region/Dongdaemun.svg";
import Dongjak from "../../shared/images/region/Dongjak.svg";
import Eunpyeong from "../../shared/images/region/Eunpyeong.svg";
import Gangbuk from "../../shared/images/region/Gangbuk.svg";
import Gangdong from "../../shared/images/region/Gangdong.svg";
import Gangnam from "../../shared/images/region/Gangnam.svg";
import Gangseo from "../../shared/images/region/Gangseo.svg";
import Geumcheon from "../../shared/images/region/Geumcheon.svg";
import Guro from "../../shared/images/region/Guro.svg";
import Gwanak from "../../shared/images/region/Gwanak.svg";
import Gwangjin from "../../shared/images/region/Gwangjin.svg";
import Jongno from "../../shared/images/region/Jongno.svg";
import Jung from "../../shared/images/region/Jung.svg";
import Jungnang from "../../shared/images/region/Jungnang.svg";
import Mapo from "../../shared/images/region/Mapo.svg";
import Nowon from "../../shared/images/region/Nowon.svg";
import Seocho from "../../shared/images/region/Seocho.svg";
import Seodaemun from "../../shared/images/region/Seodaemun.svg";
import Seongbuk from "../../shared/images/region/Seongbuk.svg";
import Seongdong from "../../shared/images/region/Seongdong.svg";
import Seoul from "../../shared/images/region/Seoul.svg";
import Songpa from "../../shared/images/region/Songpa.svg";
import Yangcheon from "../../shared/images/region/Yangcheon.svg";
import Yeoungdeongpo from "../../shared/images/region/Yeoungdeongpo.svg";
import Yongsan from "../../shared/images/region/Yongsan.svg";


// Style import
import { CategoryItem, CategoryName } from "./AuctionCategory.styled";

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
      {{
				"전체 품목": <LogoClassic />,
				"가전": <img src={HomeElectronics} />,
				"가구/인테리어": <img src={Interior} />,
				"남성 패션": <img src={ManFashion} />,
				"디지털": <img src={Digital} />,
				"여성 패션": <img src={WomanFashion} />,
				"악세서리": <img src={Accessory} />,
				"스포츠/레저": <img src={Sport} />,
				"취미/게임/악기": <img src={Hobby} />,
				"뷰티/미용": <img src={Beauty} />,
				
				"서울 전체": <img src={Seoul} />,
				"도봉구": <img src={Dobong} />,
				"동대문구": <img src={Dongdaemun} />,
				"동작구": <img src={Dongjak} />,
				"은평구": <img src={Eunpyeong} />,
				"강북구": <img src={Gangbuk} />,
				"강동구": <img src={Gangdong} />,
				"강남구": <img src={Gangnam} />,
				"강서구": <img src={Gangseo} />,
				"금천구": <img src={Geumcheon} />,
				"구로구": <img src={Guro} />,
				"관악구": <img src={Gwanak} />,
				"광진구": <img src={Gwangjin} />,
				"종로구": <img src={Jongno} />,
				"중구": <img src={Jung} />,
				"중랑구": <img src={Jungnang} />,
				"마포구": <img src={Mapo} />,
				"노원구": <img src={Nowon} />,
				"서초구": <img src={Seocho} />,
				"서대문구": <img src={Seodaemun} />,
				"성북구": <img src={Seongbuk} />,
				"성동구": <img src={Seongdong} />,
				"송파구": <img src={Songpa} />,
				"양천구": <img src={Yangcheon} />,
				"영등포구": <img src={Yeoungdeongpo} />,
				"용산구": <img src={Yongsan} />,

				// "가전": <HomeElectronics />,
				// "가구/인테리어": <Interior />,
				// "남성 패션": <ManFashion />,
				// "디지털": <Digital />,
				// "여성 패션": <WomanFashion />,
				// "악세서리": <Accessory />,
				// "스포츠/레저": <Sport />,
				// "취미/게임/악기": <Hobby />,
				// "뷰티/미용": <Beauty />,
				
				// "서울 전체": <Seoul />,
				// "도봉구": <Dobong />,
				// "동대문구": <Dongdaemun />,
				// "동작구": <Dongjak />,
				// "은평구": <Eunpyeong />,
				// "강북구": <Gangbuk />,
				// "강동구": <Gangdong />,
				// "강남구": <Gangnam />,
				// "강서구": <Gangseo />,
				// "금천구": <Geumcheon />,
				// "구로구": <Guro />,
				// "관악구": <Gwanak />,
				// "광진구": <Gwangjin />,
				// "종로구": <Jongno />,
				// "중구": <Jung />,
				// "중랑구": <Jungnang />,
				// "마포구": <Mapo />,
				// "노원구": <Nowon />,
				// "서초구": <Seocho />,
				// "서대문구": <Seodaemun />,
				// "성북구": <Seongbuk />,
				// "성동구": <Seongdong />,
				// "송파구": <Songpa />,
				// "양천구": <Yangcheon />,
				// "영등포구": <Yeoungdeongpo />,
				// "용산구": <Yongsan />,
			}[divisionName]}

      <CategoryName division={division}>{divisionName}</CategoryName>
    </CategoryItem>
  );
};

export default AuctionCategory;
