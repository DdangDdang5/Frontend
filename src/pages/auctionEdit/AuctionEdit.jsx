import React from "react";
import { styled } from "styled-components";
import Header from "../../components/header/Header";

const AuctionEdit = () => {
  return (
    <AuctionWriteLayout>
      <Header back={true} pageName="경매 글쓰기" save={{ type: "완료" }} />
      <AuctionWriteWrap>
        <WriteImgContainer>
          <ImgBoxWrap>
            <ImgBox>사진올라가는곳 </ImgBox>
          </ImgBoxWrap>
        </WriteImgContainer>
      </AuctionWriteWrap>
    </AuctionWriteLayout>
  );
};
const AuctionWriteLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const AuctionWriteWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 70px;
  padding: 0px 20px;

  height: calc(100vh - 140px);
  overflow: scroll;
  .form {
    display: flex;
    flex-direction: column;
  }
`;
const WriteImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 93px; */
  min-height: 93px;
  gap: 12px;
`;

const ImgBoxWrap = styled.div`
  display: flex;
  min-height: 93px;
  gap: 12px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImgBox = styled.div`
  display: flex;
  height: 100%;
  min-width: 93px;
  width: 93px;
  gap: 16px;
  position: relative;
  background-color: yellow;

  img {
    display: flex;
    object-fit: cover;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .deleteBox {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background-color: #3a3a3a;
    div {
      position: relative;
      top: -3px;
      right: -3px;
      color: white;
      display: flex;
    }
  }
`;
export default AuctionEdit;
