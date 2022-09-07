import React from "react";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const AuctionWrite = () => {
  return (
    <AuctionWriteLayout>
      <Header />

      <AuctionWriteWrap>
        <WriteImgContainer>
          <ImgBoxBtn>
            <div>+</div>
            <div>1/10</div>
          </ImgBoxBtn>

          <ImgBox>
            <img src="" alt="" />
            <div className="deleteBox">
              <div>x</div>
            </div>
          </ImgBox>
          <ImgBox>
            <img src="" alt="" />
            <div className="deleteBox">
              <div>x</div>
            </div>
          </ImgBox>
          <ImgBox>
            <img src="" alt="" />
            <div className="deleteBox">
              <div>x</div>
            </div>
          </ImgBox>
          <ImgBox>
            <img src="" alt="" />
            <div className="deleteBox">
              <div>x</div>
            </div>
          </ImgBox>
        </WriteImgContainer>
        <WriteTitleContainer>제목</WriteTitleContainer>
        <WriteInputBox placeholder="제목을 입력해주세요." />
        <WriteTitleContainer>상품명</WriteTitleContainer>
        <WriteInputBox placeholder="정확한 상품명을 입력해주세요." />
        <WriteTitleContainer>카테고리 선택</WriteTitleContainer>
        <WriteBtnBox>
          <div>미선택</div>
          <div>V</div>
        </WriteBtnBox>
        <WriteTitleContainer>경매 시작가</WriteTitleContainer>

        {/* placeHoder 위치 조정이 안됨 ㅡㅡ  */}

        <WriteInputBox placeholder="원" />
        {/* <input className="inputTag" type="text" placeholder="원" /> */}

        <WriteTitleContainer>
          배송 방법
          <div>(중복 선택 가능)</div>
        </WriteTitleContainer>

        <WriteDeliveryStateContainer>
          <button>택배</button>
          <button>직거래</button>
        </WriteDeliveryStateContainer>
        <WriteTitleContainer>지역 선택</WriteTitleContainer>
        <WriteBtnBox>
          <div>미선택</div>
          <div>V</div>
        </WriteBtnBox>
        <WriteTitleContainer>상세 설명</WriteTitleContainer>
        <WriteTextArea placeholder="경매 물품에 대한 상세한 설명을 적어주세요." />
        <WriteTitleContainer>해시태그</WriteTitleContainer>
        <WriteInputBox placeholder="최대 6개까지 입력할 수 있습니다." />
      </AuctionWriteWrap>
      <Footer />
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
  /* background-color: yellow; */
`;
const WriteImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 93px; */
  min-height: 93px;
  gap: 12px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ImgBoxBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 93px;
  border: none;
  div {
    font-size: 12px;
    font-weight: 400;
  }
`;
const ImgBox = styled.div`
  display: flex;
  height: 100%;
  min-width: 93px;
  background-color: yellow;
  position: relative;
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
const WriteTitleContainer = styled.div`
  display: flex;
  margin: 32px 0px 16px 0px;
  min-height: 24px;
  font-size: 16px;
  font-weight: 700;
  div {
    font-size: 14px;
    font-weight: 400;
    color: #9b9b9b;
  }
`;
const WriteInputBox = styled.input`
  display: flex;
  width: 100%;
  min-height: 56px;
  /* 인풋태그 디브 박스 안벗어나게 */
  box-sizing: border-box;
  border: 1px solid #dedede;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 9px;
`;
const WriteBtnBox = styled.button`
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;

  background-color: white;
  border: 1px solid #dedede;
  border-radius: 8px;
  box-sizing: border-box;

  font-size: 18px;
  font-weight: 400;
  padding: 0px 10px;
`;
const WriteDeliveryStateContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 48px;
  gap: 20px;

  button {
    display: flex;
    width: 165px;
    height: 100%;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    border-radius: 100px;
    border: 1px solid #9b9b9b;
    background-color: white;
  }
`;
const WriteTextArea = styled.textarea`
  display: flex;
  width: 100%;
  min-height: 192px;
  box-sizing: border-box;
  resize: none;
  border: 1px solid #c5d0e1;
`;

export default AuctionWrite;
