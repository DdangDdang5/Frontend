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

// Component & Page import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PlusButton from "../../elements/button/PlusButton";
import AuctionColumn from "../../components/auctionElement/AuctionColumn";
import Loading from "../etcPage/Loading";

// Shared import
import { Open } from "../../shared/images";

// Style import
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
  // console.log("AuctionListData", AuctionListData);

  const categoryName = useSelector((state) => state.modal.categoryName);
  const regionName = useSelector((state) => state.modal.regionName);
  const modal = useSelector((state) => state.modal.show);

  const [loadingState, setLoadingState] = useState(true);

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
    // console.log(clientHeightHandler);
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
            {/* <Header back={true} pageName="경매 목록" search={true} alarm={true} /> */}
            <Header back={true} pageName="경매 목록" search={true} />
            <ListCategoryWrap>
              <CategoryWrap idx={0} state={categoryName}>
                <CategoryBtn
                  idx={0}
                  state={categoryName}
                  onClick={() =>
                    dispatch(showModal("categoryList"), _categoryList())
                  }>
                  <CategoryBtnText>{categoryName}</CategoryBtnText>
                  <Open />
                </CategoryBtn>
              </CategoryWrap>

              <CategoryWrap idx={1} state={regionName}>
                <CategoryBtn
                  idx={1}
                  state={regionName}
                  onClick={() =>
                    dispatch(showModal("regionList"), _regionList())
                  }>
                  <CategoryBtnText>{regionName}</CategoryBtnText>
                  <Open />
                </CategoryBtn>
              </CategoryWrap>
              {/* <CategoryWrap>
                <CategoryBtn>
                <CategoryBtnTimeText>마감임박</CategoryBtnTimeText>
              </CategoryBtn>
              </CategoryWrap> */}
            </ListCategoryWrap>
            <ListContents onScroll={handleScroll} isIOS={isIOS}>
              {AuctionListData?.map((item, index) => {
                return (
                  <AuctionColumn
                    key={`${item.auctionId}-${index}-${item.title}`}
                    data={item}
                  />
                );
              })}
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
