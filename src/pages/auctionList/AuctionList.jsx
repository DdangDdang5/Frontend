import React, { useEffect } from "react";

//components
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Auction from "../../components/auction/Auction";
import PlusButton from "../../components/button/PlusButton";

//reducer
import { useDispatch, useSelector } from "react-redux";
import { auctionItemList } from "../../redux/modules/AuctionListSlice";
import { showModal } from "../../redux/modules/ModalSlice";

//styled
import styled from "styled-components";

const AuctionList = () => {
  const dispatch = useDispatch();
  const AuctionListData = useSelector((state) => state.auctionList.auctionList);

  console.log(AuctionListData);
  useEffect(() => {
    dispatch(auctionItemList());
  }, [dispatch]);

  if (!AuctionListData) {
    return <></>;
  }
  return (
    <AuctionListLayout>
      <Header />
      <ListCategoryWrap>
        <CategoryBtn onClick={() => dispatch(showModal("categoryList"))}>
          <CategoryBtnText>전체품목</CategoryBtnText>
          <CategoryBtnIcon>v</CategoryBtnIcon>
        </CategoryBtn>
        <CategoryBtn>
          <CategoryBtnText onClick={() => dispatch(showModal("regionList"))}>
            전체지역
          </CategoryBtnText>
          <CategoryBtnIcon>v</CategoryBtnIcon>
        </CategoryBtn>
        <CategoryBtn>
          <CategoryBtnTimeText>마감임박</CategoryBtnTimeText>
        </CategoryBtn>
      </ListCategoryWrap>

      <ListContents>
        {AuctionListData.map((index, item) => {
          return <Auction key={index.auctionId} data={index} />;
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
