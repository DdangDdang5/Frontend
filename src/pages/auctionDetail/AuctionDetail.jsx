import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//components
import Header from "../../components/header/Header";

//reducer
import { useSelector, useDispatch } from "react-redux";
import { auctionDetailData } from "../../redux/modules/AuctionSlice";

//styled
import styled from "styled-components";

const AuctionDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.auction.auction);

  console.log("배돌이", data);

  useEffect(() => {
    if (!params?.auctionId) {
      return <></>;
    } else {
      dispatch(auctionDetailData(params?.auctionId));
    }
  }, [params?.auctionId]);

  if (!data) {
    return <></>;
  }

  return (
    <AuctionDetailLayout>
      <Header />

      <DetailBodyWrap>
        <ItemImg>
          <img src={data.multiImages[0].imgUrl} alt="" />
          {/* {data.multiImages[0].imgUrl} */}
        </ItemImg>

        <DetailBodyContainer>
          <DetailBodyProfile>
            <DetailBodyProfileImg>
              <img src={data.profileImgUrl} alt="" />
            </DetailBodyProfileImg>
            <DetailBodyProfileContent>
              <div className="nickName">{data.member.nickName}</div>
              <div className="trustCount">신뢰도</div>
            </DetailBodyProfileContent>
          </DetailBodyProfile>

          <DetailBodyTitle>{data.title}</DetailBodyTitle>

          <DetailBodyTag>
            {data.direct ? <div>택배</div> : ""}
            {data.delivery ? <div>직거래</div> : ""}
          </DetailBodyTag>

          <DetailBodyContent>{data.content}</DetailBodyContent>
        </DetailBodyContainer>
      </DetailBodyWrap>

      <DetailFooter>
        <FooterLeftWrap>
          <div className="presentPrice">최근 입찰가</div>
          <div className="price">{data.nowPrice}원</div>
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
  align-items: flex-start;
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
