import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { clearAuction } from "../../redux/modules/AuctionSlice";

const Auction = ({ data }) => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const nowPrice = data?.nowPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const startPrice = data?.startPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!data || !data?.auctionId) {
    return <></>;
  }
  return (
    <AuctionItemWrap>
      <AuctionItemContainer
        onClick={() => {
					console.log('list to detail');
					dispatch(clearAuction());
          navigate(`/auctionDetail/${data?.auctionId}`);
        }}>
        {data?.multiImages[0]?.imgUrl && (
          <ItemPicture>
            <img src={data.multiImages[0].imgUrl} alt="" />
          </ItemPicture>
        )}
        <ItemContentWrap>
          <ItemContentHeader>
            {data?.direct ? <div>택배</div> : ""}
            {data?.delivery ? <div>직거래</div> : ""}
            <div className="region">{data.region}</div>
          </ItemContentHeader>

          {/* 줄에 표시되는 글자수 제한 */}
          <ItemContentBody>{data?.title}</ItemContentBody>
          <ItemContentFooter>
            {startPrice === nowPrice ? (
              <>
                <StartPrice>경매시작가</StartPrice>
                <PresentPrice>{startPrice}원</PresentPrice>
              </>
            ) : (
              <>
                <StartPrice>현재입찰가</StartPrice>
                <PresentPrice>{nowPrice}원</PresentPrice>
              </>
            )}
          </ItemContentFooter>
        </ItemContentWrap>
      </AuctionItemContainer>
    </AuctionItemWrap>
  );
};

const AuctionItemWrap = styled.div`
  display: flex;
  width: 48%;
  height: 277px;
  min-height: 277px;

  margin-bottom: 16px;
`;
const AuctionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ItemPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  img {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 160px;
    width: 100%;
    border-radius: 8px;
  }
`;
const ItemContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 165px;
  height: 117px;
  border-radius: 10px;
`;
const ItemContentHeader = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  margin-bottom: 8px;
  gap: 4px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 4px;

    border-radius: 100px;

    background-color: ${(props) => props.theme.colors.Blue1};

    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    color: ${(props) => props.theme.colors.White};
    line-height: 21px;
  }
  .region {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 6px;

    border-radius: 100px;
    border: 1px solid #4d71ff;

    background-color: ${(props) => props.theme.colors.White};

    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    color: ${(props) => props.theme.colors.Blue1};
    line-height: 21px;
  }
`;
const ItemContentBody = styled.div`
  width: 100%;
  max-height: 50px;
  height: 50px;
  margin-bottom: 2px;

  display: block;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;

  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 25.2px;
`;
const ItemContentFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StartPrice = styled.div`
  display: flex;
  margin-right: 4px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.Gray3};
`;
const PresentPrice = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.md};
`;

export default Auction;
