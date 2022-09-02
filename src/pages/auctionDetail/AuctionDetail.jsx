import React from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";

const AuctionDetail = () => {
  const Img = (
    <img src="https://t1.daumcdn.net/cfile/blog/231A3A3A557C6B3D0A" alt="" />
  );

  return (
    <AuctionDetailLayout>
      <Header />

      <DetailBodyWrap>
        <ItemImg>{Img}</ItemImg>

        <DetailBodyContainer>
          <DetailBodyProfile>
            <DetailBodyProfileImg>{Img}</DetailBodyProfileImg>
            <DetailBodyProfileContent>
              <div className="nickName">아이유</div>
              <div className="trustCount">신뢰도</div>
            </DetailBodyProfileContent>
          </DetailBodyProfile>

          <DetailBodyTitle>
            게시글 제목이 들어가야 될 것 같습니다.
          </DetailBodyTitle>

          <DetailBodyTag>
            <div>택배</div>
            <div>서대문구</div>
          </DetailBodyTag>

          <DetailBodyContent>
            경매 내용입니다. 글자수 제한이 필요할까요?또 모르지 내 마음이 저
            날씨처럼 바뀔지 날 나조차 다 알 수 없으니 그게 뭐가 중요하니 지금
            네게 완전히 푹 빠졌단 게 중요한 거지 아마 꿈만 같겠지만 분명 꿈이
            아니야 달리 설명할 수 없는 이건 사랑일 거야 방금 내가 말한 감정 감히
            의심하지 마 그냥 좋다는 게 아냐 What's after 'LIKE'? 경매
            내용입니다. 글자수 제한이 필요할까요?또 모르지 내 마음이 저 날씨처럼
            바뀔지 날 나조차 다 알 수 없으니 그게 뭐가 중요하니 지금 네게 완전히
            푹 빠졌단 게 중요한 거지 아마 꿈만 같겠지만 분명 꿈이 아니야 달리
            설명할 수 없는 이건 사랑일 거야 방금 내가 말한 감정 감히 의심하지 마
            그냥 좋다는 게 아냐 What's after 'LIKE'?
          </DetailBodyContent>
        </DetailBodyContainer>
      </DetailBodyWrap>

      <DetailFooter>
        <FooterLeftWrap>
          <div className="presentPrice">최근 입찰가</div>
          <div className="price">1000원</div>
        </FooterLeftWrap>
        <FooterRightWrap>
          <button>입찰하기</button>
        </FooterRightWrap>
      </DetailFooter>
    </AuctionDetailLayout>
  );
};

const AuctionDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const DetailBodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: calc(100vh - 160px);
  overflow: scroll;
`;
const ItemImg = styled.div`
  display: flex;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 390px;
  }
`;
const DetailBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;
const DetailBodyProfile = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
`;
const DetailBodyProfileImg = styled.div`
  display: flex;
  img {
    height: 48px;
    width: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    margin-right: 11px;
  }
`;
const DetailBodyProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .nickName {
    font-size: 16px;
    font-weight: 700;
  }
  .trustCount {
    font-size: 16px;
    font-weight: 400;
  }
`;

const DetailBodyTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  word-break: break-all;
  margin-bottom: 16px;
`;
const DetailBodyTag = styled.div`
  display: flex;
  margin-bottom: 16px;
  div {
    display: flex;
    border-radius: 20px;
    background-color: #dedede;
    padding: 1px 6px;
    margin-right: 6px;
  }
`;
const DetailBodyContent = styled.div`
  display: flex;
  word-break: break-all;
  font-size: 20px;
  height: 100%;
  background-color: beige;
`;

const DetailFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 74px;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  background-color: skyblue;
`;

const FooterLeftWrap = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 9px 0px 11px 20px;
  .presentPrice {
    display: flex;
    font-size: 14px;
    color: #bcbcbc;
  }
  .price {
    display: flex;
    font-size: 24px;
    font-weight: 700;
  }
`;
const FooterRightWrap = styled.div`
  display: flex;
  margin: 13px 20px 14px 0px;
  button {
    display: flex;
    width: 165px;
    height: 47px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
  }
`;

export default AuctionDetail;
