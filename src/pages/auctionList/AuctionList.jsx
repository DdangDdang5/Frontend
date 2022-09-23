// React import
import React, { useEffect } from "react";

// Redux import
import {
  showModal,
  _categoryList,
  _regionList,
} from "../../redux/modules/ModalSlice";
import { auctionItemList } from "../../redux/modules/AuctionListSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Component import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PlusButton from "../../elements/button/PlusButton";
import AuctionColumn from "../../components/auction/AuctionColumn";

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

  useEffect(() => {
    dispatch(_categoryList());

    dispatch(_regionList());

    if (categoryName === "전체 품목" && regionName === "서울 전체") {
      dispatch(auctionItemList());
    }
  }, [categoryName, regionName]);

  const handleScroll = (e) => {
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
  };

  if (!AuctionListData) {
    return <></>;
  }
  return (
    <AuctionListLayout>
      <Header back={true} pageName="경매 목록" search={true} alarm={true} />
      <ListCategoryWrap>
        <CategoryWrap>
          <CategoryBtn
            onClick={() =>
              dispatch(showModal("categoryList"), _categoryList())
            }>
            <CategoryBtnText>{categoryName}</CategoryBtnText>
            <Open />
          </CategoryBtn>
        </CategoryWrap>

        <CategoryWrap>
          <CategoryBtn>
            <CategoryBtnText
              onClick={() => dispatch(showModal("regionList"), _regionList())}>
              {regionName}
            </CategoryBtnText>
            <Open />
          </CategoryBtn>
        </CategoryWrap>
        <CategoryWrap>
          <CategoryBtn>
            <CategoryBtnTimeText>마감임박</CategoryBtnTimeText>
          </CategoryBtn>
        </CategoryWrap>
      </ListCategoryWrap>
      <ListContents onScroll={handleScroll}>
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
    </AuctionListLayout>
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
  margin-top: 70px;
  padding: 0px 20px;
  gap: 8px;

  color: ${(props) => props.theme.colors.Black};
`;

const CategoryWrap = styled.div`
  width: fit-content;
  border: 1px solid #dedede;
  border-radius: 100px;
`;

const CategoryBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;

  svg {
    width: 12px;
    height: 7px;
    padding-right: 12px;

    path {
      fill: ${(props) => props.theme.colors.Gray3};
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
  font-size: 16px;
  padding: 4px 12px;
`;

const ListContents = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  height: calc(100vh - 200px);
  overflow: auto;
  padding: 0px 10px;
  /* border-bottom: ${({ category }) => (category ? "solid 2px blue;" : "")}; */
`;

export default AuctionList;
