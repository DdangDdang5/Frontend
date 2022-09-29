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

// Package import
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { isIOS } from "react-device-detect";

// Component & Page import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PlusButton from "../../elements/button/PlusButton";
import AuctionColumn from "../../components/auctionBody/AuctionColumn";
import Loading from "../loading/Loading";

// Shared import
import { Open } from "../../shared/images";

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
                  }
                >
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
                  }
                >
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

const AuctionListLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListCategoryWrap = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  margin: 70px 0px 12px 0px;
  padding: 0px 20px;
  gap: 8px;
  color: ${(props) => props.theme.colors.Black};
`;

const CategoryWrap = styled.div`
  width: fit-content;
  border: 1px solid
    ${(props) =>
      props.idx
        ? props.state === "서울 전체"
          ? props.theme.colors.Gray1
          : props.theme.colors.Blue1
        : props.state === "전체 품목"
        ? props.theme.colors.Gray1
        : props.theme.colors.Blue1};
  border-radius: 100px;
`;

const CategoryBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;

  border-radius: 100px;
  ${(props) =>
    props.idx
      ? props.state === "서울 전체"
        ? css`
            color: ${(props) => props.theme.colors.Black};
            background-color: ${(props) => props.theme.colors.White};
          `
        : css`
            color: ${(props) => props.theme.colors.Blue1};
            background-color: ${(props) => props.theme.colors.SkyBlue};
          `
      : props.state === "전체 품목"
      ? css`
          color: ${(props) => props.theme.colors.Black};
          background-color: ${(props) => props.theme.colors.White};
        `
      : css`
          color: ${(props) => props.theme.colors.Blue1};
          background-color: ${(props) => props.theme.colors.SkyBlue};
        `}

  svg {
    width: 12px;
    height: 7px;
    padding-right: 12px;

    path {
      fill: ${(props) =>
        props.idx
          ? props.state === "서울 전체"
            ? props.theme.colors.Black
            : props.theme.colors.Blue1
          : props.state === "전체 품목"
          ? props.theme.colors.Black
          : props.theme.colors.Blue1};
    }
  }
`;

const CategoryBtnText = styled.div`
  margin: 4px 4px 4px 12px;

  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 24px;
`;

const CategoryBtnTimeText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.ms};
  padding: 4px 12px;
`;

const ListContents = styled.div`
	width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  height: ${(props) =>
    props.isIOS ? `calc(100vh - 200px)` : `calc(100vh - 190px)`};
  overflow: auto;
  padding: 0px 20px;
	margin: auto;
`;

export default AuctionList;
