// React import
import React, { useEffect } from "react";

// Reducer import
import { showModal } from "../../redux/modules/ModalSlice";
import { auctionItemList } from "../../redux/modules/AuctionListSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Component import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PlusButton from "../../components/button/PlusButton";
import AuctionColumn from "../../components/auction/AuctionColumn";
import Auction from "../../components/auction/AuctionColumn";

const AuctionList = () => {
  const dispatch = useDispatch();

  const AuctionListData = useSelector((state) => state.auctionList.auctionList);
  const categoryName = useSelector((state) => state.modal.categoryName);
  const regionName = useSelector((state) => state.modal.regionName);

  useEffect(() => {
    // console.log(AuctionListData);

    if (categoryName === "전체품목" && regionName === "서울전체") {
      dispatch(auctionItemList());
    }
  }, [JSON.stringify(AuctionListData), categoryName, regionName]);

  if (!AuctionListData) {
    return <></>;
  }
  return (
    <AuctionListLayout>
      <Header />
      <ListCategoryWrap>
        <CategoryBtn onClick={() => dispatch(showModal("categoryList"))}>
          <CategoryBtnText>{categoryName}</CategoryBtnText>
          <CategoryBtnIcon>v</CategoryBtnIcon>
        </CategoryBtn>
        <CategoryBtn>
          <CategoryBtnText onClick={() => dispatch(showModal("regionList"))}>
            {regionName}
          </CategoryBtnText>
          <CategoryBtnIcon>v</CategoryBtnIcon>
        </CategoryBtn>
        <CategoryBtn>
          <CategoryBtnTimeText>마감임박</CategoryBtnTimeText>
        </CategoryBtn>
      </ListCategoryWrap>
      <ListContents>
        {AuctionListData?.map((item) => {
          return <Auction key={item.auctionId} data={item} />;
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
`;

const CategoryBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dedede;
  border-radius: 100px;
  margin-right: 8px;
  height: 30px;
`;
const CategoryBtnIcon = styled.div`
  margin: 11.53px 11.53px 11.53px 4px;
  font-size: 12px;
`;

const CategoryBtnText = styled.div`
  font-size: 16px;
  margin: 4px 4px 4px 12px;
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
