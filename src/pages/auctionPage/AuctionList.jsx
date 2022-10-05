// React import
import React, { useEffect, useState } from "react";

// Redux import
import {
  showModal,
  _categoryList,
  _regionList,
} from "../../redux/modules/ModalSlice";
import {
  auctionItemList,
  clearAuctionList,
  initialPaging,
} from "../../redux/modules/AuctionListSlice";
import { resetList, resetPaging } from "../../redux/modules/MyPageSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { isIOS } from "react-device-detect";

// Component import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PlusButton from "../../elements/button/PlusButton";
import AuctionColumn from "../../components/auctionElement/AuctionColumn";

// Page & Shared import
import Loading from "../etcPage/Loading";
import { Open } from "../../shared/images";

// Styled import
import {
  AuctionListLayout,
  CategoryBtn,
  CategoryBtnText,
  CategoryWrap,
  ListCategoryWrap,
  ListContents,
} from "./AuctionList.styled";

const AuctionList = () => {
  const dispatch = useDispatch();

  const {
    auctionList: AuctionListData,
    loading,
    paging,
    followingItem,
  } = useSelector((state) => state.auctionList);

  const categoryName = useSelector((state) => state.modal.categoryName);
  const regionName = useSelector((state) => state.modal.regionName);

  const [loadingState, setLoadingState] = useState(true);

  // 경매 목록 초기화
  const initializeAuctionList = async () => {
    await setLoadingState(true);
    await dispatch(_categoryList());
    await dispatch(_regionList());

    if (categoryName === "전체 품목" && regionName === "서울 전체") {
      await dispatch(initialPaging());
      await dispatch(clearAuctionList());
      await dispatch(auctionItemList());
    }

    await setLoadingState(false);
  };

  useEffect(() => {
    initializeAuctionList();
  }, [categoryName, regionName]);

  // 페이지 네이션
  function handleScroll(e) {
    let scrollTopHandler = e.target.scrollTop;
    let clientHeightHandler = e.target.clientHeight;
    let scrollHeightHandler = e.target.scrollHeight;
    if (scrollHeightHandler - clientHeightHandler - scrollTopHandler - 30 < 0) {
      if (!loading) {
        if (followingItem) {
          dispatch(auctionItemList());
        }
      }
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetPaging());
      dispatch(resetList());
    };
  }, []);

  if (!AuctionListData) {
    return <></>;
  }

  return (
    <>
      <AuctionListLayout>
        {loadingState ? (
          <Loading />
        ) : (
          <>
            <Header back={true} pageName="경매 목록" search={true} />
            {/* 상단 탭 */}
            <ListCategoryWrap>
              {/* 카테고리 선택 */}
              <CategoryWrap idx={0} state={categoryName}>
                <CategoryBtn
                  idx={0}
                  state={categoryName}
                  onClick={() =>
                    dispatch(showModal("categoryList"), _categoryList())
                  }
                >
                  <CategoryBtnText>{categoryName}</CategoryBtnText>
                  <Open />
                </CategoryBtn>
              </CategoryWrap>

              {/* 지역 선택 */}
              <CategoryWrap idx={1} state={regionName}>
                <CategoryBtn
                  idx={1}
                  state={regionName}
                  onClick={() =>
                    dispatch(showModal("regionList"), _regionList())
                  }
                >
                  <CategoryBtnText>{regionName}</CategoryBtnText>
                  <Open />
                </CategoryBtn>
              </CategoryWrap>
            </ListCategoryWrap>

            {/* 경매 목록 */}
            <ListContents onScroll={handleScroll} isIOS={isIOS}>
              {AuctionListData?.map((item, index) => (
                <AuctionColumn
                  key={`${item.auctionId}-${index}-${item.title}`}
                  data={item}
                />
              ))}
            </ListContents>
            <PlusButton />
            <Footer />
          </>
        )}
      </AuctionListLayout>
    </>
  );
};

export default AuctionList;
